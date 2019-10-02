import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Customer } from 'src/app/_models/Customer';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/_services/customer.service';
import { AuthService } from 'src/app/_services/auth.service';
import { pairwise } from 'rxjs/operators';

// Component that creates form to edit a customer
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  editForm: FormGroup; // the form to create
  oldCustomer: Customer; // reference to old customer
  customer: Customer; // reference to customer linked to form
  selectedCountry; // selected country on form
  selectedProvince; // selected province on form
  canadianRegex = new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/); // regex for canadian postal code
  usaRegex = new RegExp(/^\d{5}$/); // regex for usa zip code

  countries = ['Canada', 'USA']; // countries availabe to select
  provinces = [ // province/states available to select
    {country: 'Canada', value: 'AB'},
                      {country: 'Canada', value: 'BC'},
                        {country: 'Canada', value: 'MB'},
                    {country: 'Canada', value: 'NB'},
                   {country: 'Canada', value: 'NL'},
                       {country: 'Canada', value: 'NS'},
                    {country: 'Canada', value: 'NT'},
                       {country: 'Canada', value: 'NU'},
                 {country: 'Canada', value: 'ON'},
 {country: 'Canada', value: 'PE'},
 {country: 'Canada', value: 'QC'},
 {country: 'Canada', value: 'SK'},
 {country: 'Canada', value: 'YT'},
 {
  country: 'USA',
  value: 'AL'
},
{
  country: 'USA',
  value: 'AK'
},
{
  country: 'USA',
  value: 'AZ'
},
{
  country: 'USA',
  value: 'AR'
},
{
  country: 'USA',
  value: 'CA'
},
{
  country: 'USA',
  value: 'CO'
},
{
  country: 'USA',
  value: 'CT'
},
{
  country: 'USA',
  value: 'DE'
},
{
  country: 'USA',
  value: 'DC'
},
{
  country: 'USA',
  value: 'FL'
},
{
  country: 'USA',
  value: 'GA'
},
{
  country: 'USA',
  value: 'HI'
},
{
  country: 'USA',
  value: 'ID'
},
{
  country: 'USA',
  value: 'IL'
},
{
  country: 'USA',
  value: 'IN'
},
{
  country: 'USA',
  value: 'IA'
},
{
  country: 'USA',
  value: 'KS'
},
{
  country: 'USA',
  value: 'KY'
},
{
  country: 'USA',
  value: 'LA'
},
{
  country: 'USA',
  value: 'ME'
},
{
  country: 'USA',
  value: 'MD'
},
{
  country: 'USA',
  value: 'MA'
},
{
  country: 'USA',
  value: 'MI'
},
{
  country: 'USA',
  value: 'MN'
},
{
  country: 'USA',
  value: 'MS'
},
{
  country: 'USA',
  value: 'MO'
},
{
  country: 'USA',
  value: 'MT'
},
{
  country: 'USA',
  value: 'NE'
},
{
  country: 'USA',
  value: 'NV'
},
{
  country: 'USA',
  value: 'NH'
},
{
  country: 'USA',
  value: 'NJ'
},
{
  country: 'USA',
  value: 'NM'
},
{
  country: 'USA',
  value: 'NY'
},
{
  country: 'USA',
  value: 'NC'
},
{
  country: 'USA',
  value: 'ND'
},
{
  country: 'USA',
  value: 'OH'
},
{
  country: 'USA',
  value: 'OK'
},
{
  country: 'USA',
  value: 'OR'
},
{
  country: 'USA',
  value: 'PA'
},
{
  country: 'USA',
  value: 'RI'
},
{
  country: 'USA',
  value: 'SC'
},
{
  country: 'USA',
  value: 'SD'
},
{
  country: 'USA',
  value: 'TN'
},
{
  country: 'USA',
  value: 'TX'
},
{
  country: 'USA',
  value: 'UT'
},
{
  country: 'USA',
  value: 'VT'
},
{
  country: 'USA',
  value: 'VA'
},
{
  country: 'USA',
  value: 'WA'
},
{
  country: 'USA',
  value: 'WV'
},
{
  country: 'USA',
  value: 'WI'
},
{
  country: 'USA',
  value: 'WY'
}
  ];
  // Listens to unload event and produces a notification if form has unsaved changes
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  // Gets all required services to run component
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private authService: AuthService, private customerService: CustomerService,
              private formBuilder: FormBuilder) { }


  // On initialization
  ngOnInit() {
    this.createEditForm(); // Create form
    this.setConditionalValidators(); // Set conditional validators
    this.initializeDeleteFunctionality(); // Initialize delete functionality
    // Get customer data from customer edit resolver
    this.route.data.subscribe(data => {
      this.customer = data.Customer; // from resolver (data is like a session variable, match key for resolver as specified in routes.ts)
      this.oldCustomer = JSON.parse(JSON.stringify(this.customer)); // Deep copies customer by stringifying and parsing it
      // sets model country and province
      this.selectedCountry = this.customer.custCountry;
      this.selectedProvince = this.customer.custProv;

      // Reference to email and business phone controls for custom validators
      const emailControl = this.editForm.get('custEmail');
      const busPhoneControl = this.editForm.get('custBusPhone');

      // Initialize validators by clearing control and updating validity
      emailControl.clearValidators();
      emailControl.updateValueAndValidity();

      busPhoneControl.clearValidators();
      busPhoneControl.updateValueAndValidity();

      // Toggles validator behaviour to initialize fields to empty string if no email or phone is assinged
      if (this.customer.custEmail == null) {
        this.customer.custEmail = 'rewew';
        this.customer.custEmail = '';
      }
      if (this.customer.custBusPhone == null) {
        this.customer.custBusPhone = 'rewew';
        this.customer.custBusPhone = '';
      }
    });

  }

  // Creates the edit form with the requested validators
  createEditForm() {
    this.editForm = this.formBuilder.group({
      custFirstName: ['', [Validators.required, Validators.minLength(1)]],
      custLastName: ['', [Validators.required, Validators.minLength(1)]],
      custAddress: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      custCity: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      custProv: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      custPostal: ['', [Validators.required, Validators.pattern(this.canadianRegex)]],
      custCountry: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      custHomePhone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      custBusPhone: [null, null],
      custEmail: [null, null]

    });
  }

  // Sets the conditional validators for email, phone, and postal code
  setConditionalValidators() {
    // Reference to controls
    const emailControl = this.editForm.get('custEmail');
    const busPhoneControl = this.editForm.get('custBusPhone');
    const postalControl = this.editForm.get('custPostal');


    // Sets validator for email if something is entered or clears it if field is empty
    this.editForm.get('custEmail').valueChanges
    .pipe(pairwise())
    .subscribe(([prev, next]: [any, any]) => {
      // Only if value has actually changed
        if (prev != next) {
          if (next != '' && next != null) {
            emailControl.setValidators([Validators.minLength(5), Validators.maxLength(200), Validators.email]);
          } else {
            emailControl.clearValidators();
            emailControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
          }
        }
      });

      // Sets validator for business phone if something is entered or clears it if field is empty
    this.editForm.get('custBusPhone').valueChanges
    .pipe(pairwise())
    .subscribe(([prev, next]: [any, any]) => {
      // Only if value has actually changed
      if (prev != next) {
        if (next != '' && next != null) {
          busPhoneControl.setValidators([Validators.pattern(/^\d{10,15}$/)]);
        } else {
          busPhoneControl.clearValidators();
          busPhoneControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
        }
    }
    });

    // Sets validator for postal code when the country changes
    this.editForm.get('custCountry').valueChanges
    .subscribe((value) => {
      if (this.editForm.get('custCountry').value == 'Canada') {
        postalControl.clearValidators();
        postalControl.setValidators([Validators.required, Validators.pattern(this.canadianRegex)]);
        postalControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
      } else if (this.editForm.get('custCountry').value == 'USA') {
        postalControl.clearValidators();
        postalControl.setValidators([Validators.required, Validators.pattern(this.usaRegex)]);
        postalControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
      }

    });


  }

  // Method to update customer on save changes click
  updateCustomer() {
    if (this.showValidation()) { // If validation is successful
      // Update customer model to selected country and province
      this.customer.custCountry = this.selectedCountry;
      this.customer.custProv = this.selectedProvince;
      // If the optional fields are empty, make these null in model
      if (this.customer.custEmail == '') {this.customer.custEmail = null; }
      if (this.customer.custBusPhone == '') {this.customer.custBusPhone = null; }
      // uses service to update customer
      this.customerService.updateCustomer(this.authService.decodedToken.nameid, [ this.oldCustomer, this.customer]).subscribe(next => {
        this.alertify.success('You have updated your information successfully!');
        this.oldCustomer = JSON.parse(JSON.stringify(this.customer)); // Deep copies updated customer by stringifying and parsing it
        this.editForm.reset(this.customer);
      },
      error => {
        this.alertify.error('Error in submitting changes.');
      });
    }

  }

  // Shows alertify notifications for all invalid fields. Returns true if form is valid
  showValidation() {

    const firstNameValid = this.editForm.get('custFirstName').valid;
    const lastNameValid = this.editForm.get('custLastName').valid;
    const addressValid = this.editForm.get('custAddress').valid;
    const cityValid = this.editForm.get('custCity').valid;
    const countryValid = this.editForm.get('custCountry').valid;
    const provinceValid = this.editForm.get('custProv').valid;
    const postalValid = this.editForm.get('custPostal').valid;
    const emailValid = this.editForm.get('custEmail').valid || this.editForm.get('custEmail').value == '';
    const homePhoneValid = this.editForm.get('custHomePhone').valid;
    const busPhoneValid = this.editForm.get('custBusPhone').valid || this.editForm.get('custBusPhone').value == '';


    // Only if form is invalid
    if (this.editForm.invalid) {
      if (!firstNameValid) {
        this.alertify.error('Your first name is required.');
      }
      if (!lastNameValid) {
        this.alertify.error('Your last name is required.');
      }
      if (!addressValid) {
        this.alertify.error('Your address is required.');
      }
      if (!cityValid) {
        this.alertify.error('Your city is required.');

      }
      if (!countryValid) {
        this.alertify.error('Please choose a supported country.');
      }
      if (!provinceValid) {
        this.alertify.error('Province/State must be a 2 letter code');
      }
      if (!postalValid) {
        this.alertify.error('Your postal/zip code is required or in an incorrect format');
      }
      if (!emailValid) {
        this.alertify.error('Your email is invalid.');
      }
      if (!homePhoneValid) {
        this.alertify.error('Your home phone is invalid. Must be 10-15 digits');
      }
      if (!busPhoneValid) {
        this.alertify.error('Your business phone is invalid. Must be 10-15 digits');
      }

      return false;
    }

    return true;

  }

  // Filters provinces to ensure that the country matches the selected country
  filterProvinces() {
    return this.provinces.filter(p => p.country == this.selectedCountry);
  }

  // Sets the province to null once country is changed
  chooseCountry() {
    this.editForm.controls.custProv.setValue('');
    this.customer.custProv = '';
  }

  // Adds event listener to delete any notifications
  initializeDeleteFunctionality(){
    document.addEventListener('DOMContentLoaded', () => {
      (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        let notification = $delete.parentNode;
        $delete.addEventListener('click', () => {
          notification.parentNode.removeChild(notification);
        });
      });
    });

  }




}
