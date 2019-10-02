import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';


// Service that provides dynamic notifications
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // Sets position of notification
  setPosition(location: string){
    alertify.set('notifier','position',location);
  }

  // Pops up a confirmation notification
  confirm(message: string, okCallBack: () => any){
    this.setPosition('top-center');
    // Requires confirm from user
    alertify.confirm(message, (e: any) => {
      if (e){
        okCallBack();
      }
    });
  }

  // Pops up a success-styled notification (green)
  success(message: string){
    this.setPosition('top-center');
    alertify.success(message);
  }

  // Pops up an error-styled notification (red)
  error(message: string){
    this.setPosition('top-center');
    alertify.error(message);
  }

  // Pops up a warning-styled notification
  warning(message: string){
    this.setPosition('top-center');
    alertify.warning(message);
  }

  // Pops up a neutral message notification (white)
  message(message: string){
    this.setPosition('top-center');
    alertify.message(message);
  }

}
