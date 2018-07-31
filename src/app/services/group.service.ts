import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from '../domain/group';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupsUrl = 'api/groups';

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
  
  getGroups(): Observable<Group[]> {
    this.log('fetched groups');
    return this.http.get<Group[]>(this.groupsUrl)
            .pipe(
              tap(groups => this.log('fetched groups')),
              catchError(this.handleError('getGroups', []))
            );
  }

  getGroup(id: number): Observable<Group> {
    const url = `${this.groupsUrl}/${id}`;
    return this.http.get<Group>(url)
      .pipe(
        tap(_ => this.log(`fetched group id=${id}`)),
        catchError(this.handleError<Group>(`getGroup id=${id}`))
      );
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.groupsUrl, group, httpOptions)
      .pipe(
        tap(_ => this.log(`updated group id=${group.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.groupsUrl, group, httpOptions)
      .pipe(
        tap((group: Group) => this.log(`added group with id=${group.id}`)),
        catchError(this.handleError<any>('addHero'))
      );
  }

  deleteGroup(group: Group | number): Observable<any> {
    const id = typeof group === 'number' ? group : group.id;
    const url = `${this.groupsUrl}/${id}`;
    return this.http.delete<Group>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted group id=${id}`)),
        catchError(this.handleError('deleteGroup'))
      );
  }

  searchGroups(term: string): Observable<Group[]> {
    console.log(`inside searchGroups, ${term}`);

    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Group[]>(`${this.groupsUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found groups matching "${term}"`)),
        catchError(this.handleError<Group[]>('searchHeroes', []))
      );
  }

  private log(message: string){
    this.messageService.add(`GroupService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  
}
