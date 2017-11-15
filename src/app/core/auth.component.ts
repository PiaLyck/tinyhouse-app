import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-auth',
  template: ``,
  styles: []
})

export class AuthComponent implements OnInit {

  constructor(public auth: AuthService) {

  }

  ngOnInit() {
  }
}
