import {Component, Input, OnInit} from '@angular/core';
import {User} from "../models/User";

@Component({
  selector: 'display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent {

  @Input()
  set user(user: User) {
    this.selectedUser = user
  }

  get user(): User {
    return this.selectedUser;
  }

  selectedUser: User;
}
