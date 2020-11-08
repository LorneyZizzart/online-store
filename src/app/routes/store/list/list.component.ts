import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConvertData, HandlError, ProductService } from '@shared';
import { Product } from '@shared/interfaces/product.interface';

@Component({
  selector: 'app-store-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StoreListComponent implements OnInit {

  loading:boolean;
  list = [];  

  @Output() product = new EventEmitter<Product>();

  constructor(private _productService:ProductService,
   
    private _handlError:HandlError,
    ) {
      
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.loading = true;
    this._productService.getProducts().subscribe(data => {
      this.list  = ConvertData.getFire(data);
      this.loading = false;
    }, error =>this._handlError.of(error));
  }

  addCar(product:Product){
    this.product.emit(product);; 
  }

}
