import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class StoreHomeComponent implements OnInit {

  folders = [
    { name: 'Imported', updated: 'Miles' },
    { name: 'Important', updated: 'Tina' },
    { name: 'Unread', updated: 'Jeremy' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
