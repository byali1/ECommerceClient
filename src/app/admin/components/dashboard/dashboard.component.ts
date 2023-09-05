import { Component, OnInit } from '@angular/core';
import {
  AlertifyOptions,
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private alertify: AlertifyService) {}

  //Test
  ngOnInit() {
    this.alertify.message('merhaba',new AlertifyOptions(MessageType.Error,Position.TopRight) );
  }

  
 dismissAlertifyNotifications(){
  this.alertify.dismissAll();
 }
}
