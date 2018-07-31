import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  url: string;
  constructor(private http: Http) { 
    this.url = 'https://api.datamuse.com.words?ml=';
  }

  search_word(term){
    return this.http.get(this.url + term)
      .pipe(
        map(res => {
            return res.json().map(item => {
                return item.word
            })
        })
      );
  }
}
