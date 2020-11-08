import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService, Result } from '@shared';
import { Product } from '@shared/interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-products-list-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class ProductsListOptionsComponent implements OnInit {

  reactiveForm: FormGroup;
  title: string = null;
  color = 'primary';
  btnOption = 'Guardar';
  btnAction = true;

  imageSeleccionada: string | ArrayBuffer;
  file: File;

  categories = ['Repuestos', 'Aparato electrónico'];

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductsListOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toastrService: ToastrService,
    private _productService:ProductService) { }

  ngOnInit() {
    switch (this.data.opcion) {
      case 'new':
        this.newProduct();
        break;
      case 'edit':
        this.editProduct(this.data.item);
        break;
      default:
        break;
    }
  }

  newProduct() {
    this.title = 'Nuevo producto';
    this.reactiveForm = this.fb.group({
      categori: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  editProduct(item:Product) {
    this.title = 'Nuevo producto';
    this.reactiveForm = this.fb.group({
      id: [item.id, Validators.required],
      categori: [item.categori, Validators.required],
      name: [item.name, Validators.required],
      price: [item.price, Validators.required],
      description: [item.description, Validators.required],
    });
  }

  selecionarImg(event:HtmlInputEvent):void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSeleccionada = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  guardar(){    
    if(this.reactiveForm.valid){
      switch (this.data.opcion) {
        case 'new':
          this._productService.postProduct(this.reactiveForm.value)
            .then((response) => {
              this.mensaje({
                ok:true,
                titulo:'Registrado',
                mensaje:'El producto fue registrado satisfactoriamente.'
              })
            })
            .catch((error) => {
              this.mensaje({
                ok:false,
                titulo:'Error',
                mensaje:'Se ha producido un error al registrar un nuevo producto'
              })
            });      
          break;
        case 'edit':
          this._productService.putProduct(this.reactiveForm.value)
            .then((response) => {
              this.mensaje({
                ok:true,
                titulo:'Actualizado',
                mensaje:'El producto fue registrado satisactoriamente'
              })
            })
            .catch((error) => {
              this.mensaje({
                ok:false,
                titulo:'Error',
                mensaje:'Se ha producido un error al actualizar el producto'
              })
            });
          break;
        default:
          break;
      }
      
    }    
  }

  mensaje(data:Result){
    if(data.ok === true){
      this._toastrService.success(data.mensaje, data.titulo);
      this.dialogRef.close();
    }else if (data.ok === false){
      this._toastrService.error(data.mensaje, data.titulo);
    }else{
      this._toastrService.info(data.mensaje, data.titulo);
    }
  }
}
