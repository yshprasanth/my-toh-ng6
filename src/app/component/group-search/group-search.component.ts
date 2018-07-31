import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
    debounceTime, distinctUntilChanged, switchMap
  } from 'rxjs/operators';
import { Group } from '../../domain/group';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.css']
})
export class GroupSearchComponent implements OnInit {

  groups$: Observable<Group[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private groupService: GroupService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.groups$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.groupService.searchGroups(term)),
    );
  }

}
