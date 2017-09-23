import { Component, OnInit } from '@angular/core';
import { PokerServiceService } from './poker-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private pokerService: PokerServiceService) {

  }

  ngOnInit() {

  }

}
