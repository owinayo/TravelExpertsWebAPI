import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

// Component to display the booked packages page
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-bookedPackages',
  templateUrl: './bookedPackages.component.html',
  styleUrls: ['./bookedPackages.component.css']
})
export class BookedPackagesComponent implements OnInit {

  packages: any; // List of packages
  totalCost: number; // Total sum of booked packages cost

  // Get reference to http client and routing
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get packages and calculate total on initialization
    this.getPackages();
    this.calculateTotal();
  }

  ngAfterViewInit() {
    // Adds cards to columns after view is initialized
    this.addColumnFormatting();
  }



  // Gets packages from the data (like a session) that the booked package resolvers gets before this component is loaded
  // The BookedPackages property must be named the same as the property under routes.ts where the resolver is specified
  getPackages() {
    this.route.data.subscribe(data => {
      this.packages = data.BookedPackages;
    });

  }

  // Goes through packages and calculates total
  calculateTotal() {
    this.totalCost = 0;
    this.packages.forEach(pkg => {
      this.totalCost += pkg.pkgBasePrice;
    });
  }

  // Goes through all generated cards on page and adds to columns that hold 3 cards each
  addColumnFormatting() {
    // Gets cards
    const cards = document.getElementsByClassName('column');
    if (cards.length === 0) {return; } // End method if no cards generated

    // Get parent element div
    const parent = cards[0].parentElement;
    let columnCounter = 3; // column counter to hold 3 cards each
    let columnsElement; // Stores new div with class columns

    let i = 0; // iterator
    const il = cards.length; // iterator limit (cards.length will change as the below code is running)

    while (i < il) {
      // If 3 cards are in current column, add a new div to parent element with class columns
      // Then assign columnsElement to that div
      if (columnCounter === 3) {
        columnCounter = 0;
        columnsElement = document.createElement('div');
        columnsElement.className += 'columns';
        parent.appendChild(columnsElement);
      }

      // Add next card to columns element
      columnsElement.appendChild(cards[0]);
      i++;
      columnCounter++;
    }

    // Keep adding empty columns until 3 columns to last row for consistent formatting
    while (columnCounter != 3) {
      const emptyColumn = document.createElement('div');
      emptyColumn.className += 'column';
      columnsElement.appendChild(emptyColumn);
      columnCounter++;
    }

  }

}
