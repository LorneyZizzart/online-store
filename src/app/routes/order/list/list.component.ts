import { Component, OnInit } from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions';
import { ClientService, ConvertData, OrderService } from '@shared';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class OrderListComponent implements OnInit {

  columns: MtxGridColumn[] = COLUMNS;
  columns_products:MtxGridColumn[] = COLUMNS_PRODUCTS;
  loading = true;
  list = [];

  constructor(private _clientService:ClientService,
    private _orderService:OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this._orderService.getOrders().subscribe(data => {
      this.list  = ConvertData.getFire(data);
      this.loading = false;
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
  { header: 'Cliente', field: 'fullname', showExpand: true },
  { header: 'Celular', field: 'phone' },
  { header: 'Fecha', field: 'date' },
  { header: 'Hora', field: 'time'},
  { header: 'Método de pago', field: 'typePayment'},
  { header: 'Dirección', field: 'address'},
  { header: 'Nota', field: 'note'},
];

