import { CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions';
import { ConvertData, HandlError, ProductService } from '@shared';
import { ProductsListOptionsComponent } from './options/options.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ProductsListComponent implements OnInit {

  columns: MtxGridColumn[] = COLUMNS;
  loading:boolean;
  list = [];
  auxList = [];
  dragging = false;
  constructor(public _dialog: MatDialog,
    private _productService:ProductService,
    private _handlError:HandlError) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.loading = true;
    this._productService.getProducts().subscribe(data => {
      this.list  = ConvertData.getFire(data);
      this.auxList  = ConvertData.getFire(data);
      this.loading = false;
    }, error =>this._handlError.of(error));
  }

  handleDragStart(event: CdkDragStart): void {
    this.dragging = true;
  }

  trackByName(index: number, item: any) {
    return item.name;
  }

  newProduct(){
    this.showDialog('new');
  }

  showDialog(opcion:string, item?:any){
    this._dialog.open(ProductsListOptionsComponent, {
      width: '600px',
      data : {
        opcion,
        item
      }
    });
  }

}

export const COLUMNS:MtxGridColumn[] = [
  { header: 'Imagen', field: 'image', width: '60px'},
  { header: 'Nombre', field: 'name' },
  { header: 'Categoría', field: 'categori'},
  { header: 'Descripción', field: 'description' }
];