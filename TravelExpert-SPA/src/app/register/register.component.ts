import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      termsAndConditions: new FormControl('', Validators.requiredTrue),
      username: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(200)]),
      password: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(200)]),
      confirmPassword: new FormControl('', Validators.required)

    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(match: FormGroup){
    return match.get('password').value == match.get('confirmPassword').value ? null: {'mismatch': true};
  }


  register(){
    /*
    this.authService.register(this.model).subscribe(()=>{
      this.alertify.success('Registration successful');
    }, error => {
      this.alertify.error(error);
    } );
    */
   console.log(this.registerForm);
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("cancel");
  }


}
