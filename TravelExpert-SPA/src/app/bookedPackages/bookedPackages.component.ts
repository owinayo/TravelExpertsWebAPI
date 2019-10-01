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
  totalCost: number;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPackages();
    this.calculateTotal();
  }

  ngAfterViewInit(){
    this.addColumnFormatting();
  }



  getPackages() {
    this.route.data.subscribe(data=>{
      this.packages = data["BookedPackages"];
    });


    /*
    this.http.get('http://localhost:5000/api/customers/bookedPackages').subscribe(response => {
      this.packages = response;
    }, error => {
      console.log(error);
    });*/
  }

  calculateTotal(){
    this.totalCost = 0;
    this.packages.forEach(pkg => {
      this.totalCost+=pkg.pkgBasePrice;
    });
  }

  addColumnFormatting(){
    var cards = document.getElementsByClassName("column");
    var parent = cards[0].parentElement;
    var columnCounter = 3;
    var columnsElement;

    var i = 0;
    var il = cards.length;

    while(i<il){
      if(columnCounter===3){
        columnCounter = 0;
        columnsElement = document.createElement("div");
        columnsElement.className+="columns";
        parent.appendChild(columnsElement);
      }

      columnsElement.appendChild(cards[0]);
      i++;
      columnCounter++;
    }

    while(columnCounter!=3){
      let emptyColumn = document.createElement("div");
      emptyColumn.className+="column";
      columnsElement.appendChild(emptyColumn);
      columnCounter++;
    }

  }

}
