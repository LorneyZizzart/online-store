import { Component, OnInit } from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions';
import { ClientService, ConvertData } from '@shared';

@Component({
  selector: 'app-sale-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SaleListComponent implements OnInit {
  columns: MtxGridColumn[] = COLUMNS;
  columns_products:MtxGridColumn[] = COLUMNS_PRODUCTS;
  loading:boolean;
  list = [];

  constructor(private _clientService:ClientService) { 
  }

  ngOnInit() {
    this.getClients();
  }

  log(e: any) {
    console.log(e);
  }

  getClients(){
    this._clientService.getClients().subscribe(data => {
      this.list  = ConvertData.getFire(data);
      this.loading = false;
    })
  }

  getProducts(client){
    this._clientService.getOrders(client.data.id).subscribe(data => {
      for(let item of this.list){
        if(item.id === client.data.id){
          item.products = ConvertData.getFire(data);
          item.cashTotal= item.products.reduce((sum, value) => (typeof value.price == "number" ? sum + value.price : sum), 0);
        }
      }
      console.log(this.list);
    })
  }

}

export const COLUMNS_PRODUCTS:MtxGridColumn[] = [
  { header: 'Imagen', field: 'image', width: '80px'},
  { header: 'Nombre', field: 'name' },
  { header: 'Precio', field: 'price' },
  { header: 'Categoría', field: 'categori'},
];

export const COLUMNS:MtxGridColumn[] = [
  { header: 'Nombre completo', field: 'fullname', showExpand: true},
  { header: 'Correo electrónico', field: 'email' }
];
