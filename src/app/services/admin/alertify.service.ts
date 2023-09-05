import { Injectable } from '@angular/core';

declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  message(message: string, options: AlertifyOptions) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const tempMessage = alertify[options.messageType](message);
    if (options.dismissOthers) {
      tempMessage.dismissOthers();
    }
  }

  dismissAll() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType;
  position: Position;
  delay: number;
  dismissOthers: boolean;

  constructor(
    messageType: MessageType,
    position: Position,
    delay: number = 3,
    dismissOthers: boolean = false
  ) {
    this.messageType = messageType;
    this.position = position;
    this.delay = delay;
    this.dismissOthers = dismissOthers;
  }
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
}

export enum Position {
  TopCenter = 'top-center',
  TopRight = 'top-right',
  TopLeft = 'top-left',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left',
}
