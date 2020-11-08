import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions';
import { ConvertData, Order, OrderService } from '@shared';
import { OrderViewVoucherComponent } from '../view-voucher/view-voucher.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class OrderListComponent implements OnInit {

  columns: MtxGridColumn[] = COLUMNS;
  loading = true;
  list = [];
  auxList = [];

  constructor(public _dialog: MatDialog,
    private _orderService:OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this._orderService.getOrders().subscribe(data => {
      this.list  = ConvertData.getFire(data);
      this.auxList = ConvertData.getFire(data);
      this.loading = false;
    })
  }

  search(value: string) {
    const array:any[] = [];
    this.list = this.auxList;
    for(const item of this.list){
      if(item.id.toLowerCase().indexOf(value.toLowerCase()) >= 0){
        array.push(item);
      }
    }
    this.list = array;
  }

  seeVoucher(item:Order){
    if(item.typePayment === "Transferencia"){
      const dialogRef = this._dialog.open(OrderViewVoucherComponent, {
        width: '600px',
        data : item
      });
    }
  }
}

export const COLUMNS:MtxGridColumn[] = [
  { header: 'Código', field: 'id', showExpand: true , width:'260px' },
  { header: 'Cliente', field: 'fullname' },
  { header: 'Celular', field: 'phone' },
  { header: 'Correo electrónico', field: 'email', hide: true },
  { header: 'Fecha', field: 'date', width:'100px' },
  { header: 'Hora', field: 'time'},
  { header: 'Método de pago', field: 'typePayment', hide: true},
  { header: 'Dirección', field: 'address'},
  { header: 'Nota', field: 'note', hide: true},
];

