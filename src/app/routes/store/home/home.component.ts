import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SettingsService, User } from '@core';
import { ClientService, ConvertData } from '@shared';
import { Product } from '@shared/interfaces/product.interface';
import { StoreOrderComponent } from '../order/order.component';

@Component({
  selector: 'app-store-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class StoreHomeComponent implements OnInit {

  cashTotal = 0;

  orders = [];
  btnOrder = true;

  user: User;

  constructor(private _clientService:ClientService,
    settings: SettingsService,
    private router: Router,
    public _dialog: MatDialog) { 
      this.user = settings.user;
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    if(this.user.email){
      this._clientService.getOrdersPending(this.user.id).subscribe(data => {
        this.orders  = ConvertData.getFire(data);
        this.btnOrder = this.orders.length === 0 ? true : false;
        this.cashTotal= this.orders.reduce((sum, value) => (typeof value.price == "number" ? sum + value.price : sum), 0);
      })
    }
  }

  addOrder(product:Product){
    if(this.user.email){
      delete product.id;
      this._clientService.postOrderPending(this.user.id, product);
    }else{
      this.router.navigateByUrl('/auth/login');
    }
    
  }

  resetOrders(){
    for(let item of this.orders){
      this.deleteOrdersPending(item);
    }
  }

  deleteOrdersPending(product:Product){
    this._clientService.deleteOrderPending(this.user.id, product.id);
  }

  makeOrder(item){
    const dialogRef = this._dialog.open(StoreOrderComponent, {
      width: '600px',
      data : item
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result?.empty){
        this.resetOrders();
      }
    });
  }

}
