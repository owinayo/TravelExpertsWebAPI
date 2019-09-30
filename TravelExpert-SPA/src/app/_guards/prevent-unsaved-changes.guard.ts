import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { CustomerEditComponent } from '../customer/customer-edit/customer-edit.component';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<CustomerEditComponent>{
  canDeactivate(component: CustomerEditComponent){
    if(component.editForm.dirty){
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
    }
    return true;
  }
}
