import { Component, OnInit } from '@angular/core';
import { SettingsService, User } from '@core';
import { ClientService, ConvertData } from '@shared';
import { Product } from '@shared/interfaces/product.interface';

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
    settings: SettingsService) { 
      this.user = settings.user;
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this._clientService.getOrders(this.user.id).subscribe(data => {
      this.orders  = ConvertData.getFire(data);
      this.btnOrder = this.orders.length === 0 ? true : false;
      this.cashTotal= this.orders.reduce((sum, value) => (typeof value.price == "number" ? sum + value.price : sum), 0);
    })
  }

  addOrder(product:Product){
    delete product.id;
    this._clientService.postOrder(this.user.id, product);
  }

  resetOrders(){
    for(let item of this.orders){
      this.deleteProduct(item);
    }
  }

  deleteProduct(product:Product){
    this._clientService.deleteOrder(this.user.id, product.id);
  }

}
