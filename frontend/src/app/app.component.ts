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

  constructor(private pokerService: PokerServiceService) {

  }

  ngOnInit() {

  }

  deckReset() {
    this.loading = true;
    this.pokerService.deckReset()
      .then(
        (response) => {
        console.log(response.deckHash);
        this.loading = false;
        }, (error) => {
          console.log('error: ' + JSON.stringify(error)); // Gotta be removed
          // Todo: Retry request
        }
      ).catch((error) => {
      // Todo: Retry request
    });
  }

}
