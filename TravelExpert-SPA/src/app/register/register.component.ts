import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Customer } from '../_models/Customer';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { pairwise } from 'rxjs/operators';
import { SupportedLocations } from 'src/app/_constants/supportedLocations';

// Component for register form
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(); // Holds events for cancel button
  customer: Customer; // Customer to register
  registerForm: FormGroup; // form that is created
  termsButtonClicked: boolean; // Holds state of terms & conditions being clicked/closed
  canadianRegex = new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/); // canadian postal regex
  usaRegex = new RegExp(/^\d{5}$/); // usa postal regex

  selectedCountry; // selected country
  selectedProvince; // selected province

  // Sets supported countries and provinces
  countries = SupportedLocations.Countries;
  provinces = SupportedLocations.Provinces;

// Gets all required services
  constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router,
              private alertify: AlertifyService, private fb: FormBuilder) {
      }

      // Creates form on init
  ngOnInit() {
    // creates new customer and form
    this.customer = new Customer();
    this.createRegisterForm();
    // choose canada by default
    this.selectedCountry = 'Canada';
    this.termsButtonClicked = false;

    // sets conditional validator behaviour for optional fields
    this.setConditionalValidators();

  }

  // Creates register form with desired validators
  createRegisterForm() {
    this.registerForm = this.fb.group({
      custFirstName: ['', [Validators.required, Validators.minLength(1)]],
      custLastName: ['', [Validators.required, Validators.minLength(1)]],
      custAddress: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      custCity: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      custProv: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      custPostal: ['', [Validators.required, Validators.pattern(this.canadianRegex)]],
      custCountry: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      custHomePhone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      custBusPhone: ['', null],
      custEmail: ['', null],
      termsAndConditions: ['', Validators.requiredTrue],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      confirmPassword: ['', Validators.required]

    }, {validator: this.passwordMatchValidator});
  }

  // Custom validator to ensure password fields match
  passwordMatchValidator(match: FormGroup) {
    return match.get('password').value == match.get('confirmPassword').value ? null : {mismatch: true};
  }

  // Shows the terms and conditions, toggles variable
  showTerms() {
    this.termsButtonClicked = !this.termsButtonClicked;
  }

  // Register method if form is valid
  register() {
    if (this.showValidation()) {
      // Builds customer from form values
      this.customer = Object.assign({}, this.registerForm.value);
      // Set customer variables to null if the optional fields are empty
      if (this.customer.custBusPhone == '') {this.customer.custBusPhone = null; }
      if (this.customer.custEmail == '') {this.customer.custEmail = null; }
      // Run register method in authservice
      this.authService.register(this.customer).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => { // Moves customer to booked packages if registration successful
        this.authService.login(this.customer).subscribe(() => {
          this.router.navigate(['/bookedPackages']);
        });
      });
    }
  }

  // Cancels registration (goes to home page)
  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel');
  }

  // Shows validation notifications
  showValidation() {

    let firstNameValid = this.registerForm.get('custFirstName').valid;
    let lastNameValid = this.registerForm.get('custLastName').valid;
    let addressValid = this.registerForm.get('custAddress').valid;
    let cityValid = this.registerForm.get('custCity').valid;
    let countryValid = this.registerForm.get('custCountry').valid;
    let provinceValid = this.registerForm.get('custProv').valid;
    let postalValid = this.registerForm.get('custPostal').valid;
    let emailValid = this.registerForm.get('custEmail').valid || this.registerForm.get('custEmail').value == '';
    let homePhoneValid = this.registerForm.get('custHomePhone').valid;
    let busPhoneValid = this.registerForm.get('custBusPhone').valid || this.registerForm.get('custBusPhone').value == '';
    let usernameValid = this.registerForm.get('username').valid;
    let passwordValid = this.registerForm.get('password').valid;
    let passwordMatch = !this.registerForm.hasError('mismatch');
    let termsAndConditionsAccepted = this.registerForm.get('termsAndConditions').valid;


    if (this.registerForm.invalid) {
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
        this.alertify.error('Your postal/zip code is required. A Canadian Postal Code should be formatted like T1A 1A1 and a US Zip Code should be 5 digits (12345) ');
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
      if (!usernameValid) {
        this.alertify.error('Your username is invalid. Please enter a username between 4 and 200 characters.\n');
      }
      if (!passwordValid) {
        this.alertify.error('Your password is invalid. Please enter a password between 4 and 200 characters.\n');
      }
      if (!passwordMatch) {
        this.alertify.error('Your passwords do not match.');
      }
      if (!termsAndConditionsAccepted) {
        this.alertify.error('You must accept the terms and conditions.');
      }
      return false;
    }

    return true;

  }

  // Filters available provinces based on selected countries
  filterProvinces() {
    return this.provinces.filter(p => p.country == this.selectedCountry);
  }

  // Resets province value on country selected
  chooseCountry() {
    this.registerForm.controls.custProv.setValue('');
    this.customer.custProv = '';
  }

  // Sets the conditional validators for optional fields and postal code
  setConditionalValidators() {
    // Reference to control
    const emailControl = this.registerForm.get('custEmail');
    const busPhoneControl = this.registerForm.get('custBusPhone');
    const postalControl = this.registerForm.get('custPostal');

    // When email is filled, set validators, otherwise clear
    this.registerForm.get('custEmail').valueChanges
    .pipe(pairwise())
    .subscribe(([prev, next]: [any, any]) => {
        if (prev != next) {
          if (next != '' && next != null) {
            emailControl.setValidators([Validators.minLength(5), Validators.maxLength(200), Validators.email]);
          } else {
            emailControl.clearValidators();
            emailControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
          }
        }
      });

      // When business phone is filled, set validators, otherwise clear
    this.registerForm.get('custBusPhone').valueChanges
    .pipe(pairwise())
    .subscribe(([prev, next]: [any, any]) => {
      if (prev != next) {
        if (next != '' && next != null) {
          busPhoneControl.setValidators([Validators.pattern(/^\d{10,15}$/)]);
        } else {
          busPhoneControl.clearValidators();
          busPhoneControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
        }
    }
    });

    // When country is changed, set postal code validator
    this.registerForm.get('custCountry').valueChanges
    .subscribe((value) => {
      if (this.registerForm.get('custCountry').value == 'Canada') {
        postalControl.clearValidators();
        postalControl.setValidators([Validators.required, Validators.pattern(this.canadianRegex)]);
        postalControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
      } else if (this.registerForm.get('custCountry').value =='USA') {
        postalControl.clearValidators();
        postalControl.setValidators([Validators.required, Validators.pattern(this.usaRegex)]);
        postalControl.updateValueAndValidity({onlySelf: true, emitEvent: false});
      }

    });

    // On first initialization, clear validators for email and business phone and update validity
    // Allows business phone and email to be valid if untouched
    emailControl.clearValidators();
    emailControl.updateValueAndValidity();
    busPhoneControl.clearValidators();
    busPhoneControl.updateValueAndValidity();
  }


}
