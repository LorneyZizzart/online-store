import { CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MtxDialog, MtxGridColumn } from '@ng-matero/extensions';
import { ConvertData, HandlError, ProductService } from '@shared';
import { Product } from '@shared/interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';
import { title } from 'process';
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
  dragging = false;
  constructor(public _dialog: MatDialog,
    private _mtxDialog: MtxDialog,
    private _toastrService: ToastrService,
    private _productService:ProductService,
    private _handlError:HandlError) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.loading = true;
    this._productService.getProducts().subscribe(data => {
      this.list  = ConvertData.getFire(data);
      this.loading = false;
      console.log(this.list);
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

  editProduct(item:Product){
    this.showDialog('edit', item);
  }

  deleteProduct(item:Product){
    this._mtxDialog.confirm(
      `¿ Esta seguro de eliminar ?`,
      () => {        
        this._productService.deleteProduct(item.id)
        .then(()=>{
          this._toastrService.success('Registro eliminado');
        });
      }
    );
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
  { header: 'Option', field: 'option', width: '10px'},
  { header: 'Imagen', field: 'image', width: '80px'},
  { header: 'Nombre', field: 'name' },
  { header: 'Precio', field: 'price' },
  { header: 'Categoría', field: 'categori'},
  { header: 'Descripción', field: 'description' }
];