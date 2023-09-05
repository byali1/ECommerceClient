import { Component } from '@angular/core';
import { CustomToastrService, MessageTypeToastr, ToastrOptions } from './services/ui/custom-toastr.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceClient';

  
  constructor(private toastrService: CustomToastrService) {
    this.toastrService.message("Merhaba","TITLE",MessageTypeToastr.Success,new ToastrOptions());
  }
}
