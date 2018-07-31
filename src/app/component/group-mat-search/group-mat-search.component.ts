import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppServiceService } from '../../services/app-service.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Group } from '../../domain/group';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-mat-search',
  templateUrl: './group-mat-search.component.html',
  styleUrls: ['./group-mat-search.component.css'],
  providers: [AppServiceService]
})
export class GroupMatSearchComponent implements OnInit {

  groups$: Observable<Group[]>;
  private searchTerms = new Subject<string>();
  
  // searchTerm : FormControl = new FormControl();
  // searchResult = [];

  
  constructor(private service: AppServiceService,
              private groupService: GroupService) { 
    // this.searchTerm.valueChanges.pipe(
    //     debounceTime(400) 
    //   ).subscribe(data => {
    //           this.service.search_word(data).subscribe(response =>{
    //               this.searchResult = response
    //           })
    //   });
  }

  search(term: string): void {
    console.log(`search, ${term}`);
    this.searchTerms.next(term);
  }

  ngOnInit() {
    console.log(`inside ngoninit`);
    this.groups$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => 
          this.groupService.searchGroups(term)
        ),
    );
  }
}
