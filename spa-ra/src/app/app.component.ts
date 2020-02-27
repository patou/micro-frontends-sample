import {Component, Input} from '@angular/core';
import {User} from "./models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userSelected(event: CustomEvent) {
    this.user = event.detail;
  }

  user: User;
  app = "RA";
}

