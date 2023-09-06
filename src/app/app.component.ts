import { Component } from '@angular/core';
// import * as $ from 'jquery';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceClient';

  
  constructor() {
  }
}

// $.get("https://localhost:7226/api/products",data=>{
//   console.log(data);
// });