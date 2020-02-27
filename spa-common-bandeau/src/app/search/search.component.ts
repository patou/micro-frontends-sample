import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

export interface User {
  lastname: string;
  firstname: string;
  age: number;
  id: number;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  @Output() selectUser = new EventEmitter<any>();
  @Input() selectedApp : string;

  myControl = new FormControl();
  usersList: User[] = [
    {
      lastname: 'Marquez',
      firstname: 'Marc',
      age: 27,
      id: 1
    }, {
      lastname: 'Rossi',
      firstname: 'Valentino',
      age: 41,
      id: 2
    }, {
      lastname: 'Zarco',
      firstname: 'Johann',
      age: 35,
      id: 3
    }, {
      lastname: 'Quartararo',
      firstname: 'Fabio',
      age: 24,
      id: 4
    }
  ];
  filteredUsers: Observable<User[]>;
  user:string;

  ngOnInit() {
    this.filteredUsers = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(name: string): User[] {
    const filterValue = name;
    return this.usersList.filter(option => option.lastname.toLowerCase().includes(filterValue));
  }

  userSelected(event: MatAutocompleteSelectedEvent) {
    this.user = event.option.viewValue;

    /**
     * Emit Event that will be catched by th SPA
     */
    this.selectUser.emit(event.option.value);
  }

}
