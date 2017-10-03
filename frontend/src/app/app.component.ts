import { Component, OnInit } from '@angular/core';
import { PokerServiceService } from './poker-service.service';
import { constants } from '../config/constants';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PokerServiceService]
})
export class AppComponent implements OnInit {
  loading = false;
  loadingMsg = 'Loading...';
  deckHash = 'xxx';
  cards = [];
  leftHand = this.createHand('Left Hand');
  rightHand = this.createHand('Right Hand');
  resultMessage = '';
  errorMessage = '';
  errorList = {
    arr: {
      '405': constants.errorMessages.NOT_ENOUGH_CARDS,
      '400': constants.errorMessages.INVALID_DECK,
      '404': constants.errorMessages.INVALID_DECK
    }
  };

  constructor(private pokerService: PokerServiceService) {

  }

  ngOnInit() {

  }

  createHand(name) {
    return {
      name: name,
      cardsArr: [],
      handRanking: {}
    };
  }

  preRequestCleansing() {
    this.loading = true;
    this.errorMessage = '';
  }

  errorHandler(error) {
    if (!isNullOrUndefined(error.code) && error.code !== '') {
      const code = error.code.toString();
      this.errorMessage = this.errorList.arr[code];
    }
    if (this.errorMessage === '') {
      this.errorMessage = constants.errorMessages.UNKNOWN_ERROR;
    }
    this.loading = false;
  }

  isBackendConnectionError(error) {
    return (error.isTrusted === true);
  }

  checkSameSuit(cardsArr) {
    let isSameSuit = true;
    const suit = cardsArr[0].suit;
    for (let i = 1; i < cardsArr.length; i++) {
      if (cardsArr[i].suit !== suit) {
        isSameSuit = false;
        break;
      }
    }
    return isSameSuit;
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
      const x = a[key];
      const y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  valuateUnsortedHand(hand) {
    for ( let i = 0; i < hand.cardsArr.length; i++) {
      for ( let j = 0; j < constants.cardValueArr.length; j++) {
        if (hand.cardsArr[i].number === constants.cardValueArr[j].number) {
          hand.cardsArr[i].value = constants.cardValueArr[j].value;
          break;
        }
      }
    }
  }

  rankHand(hand) {
    this.valuateUnsortedHand(hand);
    this.sortByKey(hand.cardsArr, 'value');
    console.log('leftHand:' + JSON.stringify(hand, null, 2));
  }

  assignHands() {
    const halfLength = Math.ceil(this.cards.length / 2);
    this.leftHand.cardsArr = this.cards.splice(0, halfLength);
    this.rightHand.cardsArr = this.cards;
    this.rankHand(this.leftHand);
    // this.rankHand(this.rightHand);
  }

  deckReset() {
    this.preRequestCleansing();
    this.pokerService.deckReset()
      .then(
        (response) => {
          this.deckHash = response.deckHash;
          this.loading = false;
        }, (error) => {
          if (this.isBackendConnectionError(error)) {
            setTimeout(() => {
              this.deckReset();
            }, 1000);
          } else {
            this.errorHandler(error);
          }
        }
      ).catch((error) => {
      setTimeout(() => {
        this.deckReset();
      }, 1000);
    });
  }

  deckDeal() {
    this.preRequestCleansing();
    this.pokerService.deckDeal(this.deckHash)
      .then(
        (response) => {
          this.cards = response.cards;
          this.loading = false;
          this.assignHands();
        }, (error) => {
          if (this.isBackendConnectionError(error)) {
            setTimeout(() => {
              this.deckDeal();
            }, 1000);
          } else {
            this.errorHandler(error);
          }
        }
      ).catch((error) => {
      setTimeout(() => {
        this.deckReset();
      }, 1000);
    });
  }

}
