import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { CustomerEditComponent } from '../customer/customer-edit/customer-edit.component';

// Guard that prevents leaving page if there are unsaved changes
@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<CustomerEditComponent>{
  // Required method, implemented for customer edit component
  canDeactivate(component: CustomerEditComponent){
    // If form is dirty (unsaved), give a confirmation to leave
    if(component.editForm.dirty){
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
    }
    return true;
  }
}
