import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termsAndConditions',
  templateUrl: './termsAndConditions.component.html',
  styleUrls: ['./termsAndConditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Hides the modal by removing is-active from class
  hideModal(){
    document.getElementById('termsModal').className="modal";
  }

}
