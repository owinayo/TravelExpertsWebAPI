import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-bookedPackages',
  templateUrl: './bookedPackages.component.html',
  styleUrls: ['./bookedPackages.component.css']
})
export class BookedPackagesComponent implements OnInit {

  packages: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages() {
    this.route.data.subscribe(data=>{
      console.log(data["BookedPackages"]);
      this.packages = data["BookedPackages"];
    });
    /*
    this.http.get('http://localhost:5000/api/customers/bookedPackages').subscribe(response => {
      this.packages = response;
    }, error => {
      console.log(error);
    });*/
  }
}
