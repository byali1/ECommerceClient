import { Injectable } from '@angular/core';
import { ProgressAnimationType, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) {}

  message(
    message: string,
    title: string,
    messageType: MessageTypeToastr,
    options: ToastrOptions
  ) {
    this.toastr[messageType](message, title, {
      timeOut: options.timeOut,
      closeButton: options.closeButton,
      progressBar: options.progressBar,
      progressAnimation: options.progressAnimation,
    });
  }
}

export enum MessageTypeToastr {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

export class ToastrOptions {
  timeOut: number = 3000;
  closeButton: boolean = true;
  progressBar: boolean = true;
  progressAnimation: ProgressAnimationType = 'decreasing';
}
