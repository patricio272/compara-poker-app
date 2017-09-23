import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {isNullOrUndefined} from 'util';
import {endpoints} from '../config/endpoints';


@Injectable()
export class PokerServiceService {

  constructor(private http: Http) { }

  test() {
    return this.http.post(endpoints.test, '', '').toPromise().then((response: Response) => {
      return Promise.resolve(response.json());
    }, (error: Response) => {
      return Promise.reject(error.json());
    });
  }

}
