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

  deckReset() {
    this.loading = true;
    this.errorMessage = '';
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
    this.loading = true;
    this.errorMessage = '';
    this.pokerService.deckDeal(this.deckHash)
      .then(
        (response) => {
          this.cards = response.cards;
          this.loading = false;
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
