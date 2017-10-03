import { Component, OnInit } from '@angular/core';
import { PokerServiceService } from './poker-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PokerServiceService]
})
export class AppComponent implements OnInit {
  loading = false;
  loadingMsg = 'Loading...';
  deckHash = '';

  constructor(private pokerService: PokerServiceService) {

  }

  ngOnInit() {

  }

  deckReset() {
    this.loading = true;
    this.pokerService.deckReset()
      .then(
        (response) => {
        this.deckHash = response.deckHash;
        this.loading = false;
        }, (error) => {
          setTimeout(() => {
            this.deckReset();
          }, 1000);
        }
      ).catch((error) => {
      setTimeout(() => {
        this.deckReset();
      }, 1000);
    });
  }

}
