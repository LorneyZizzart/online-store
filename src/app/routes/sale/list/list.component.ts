import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SaleListComponent implements OnInit {

  constructor() { 
    console.log('entro')
  }

  ngOnInit() {
  }

}
