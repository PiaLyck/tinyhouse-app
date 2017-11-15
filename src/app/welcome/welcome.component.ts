import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../core/notify.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public notify: NotifyService) {
    this.notify.update('Testingtesting', 'error');
  }

  ngOnInit() {
  }

}
