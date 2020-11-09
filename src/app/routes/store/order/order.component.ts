import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService, User } from '@core';
import { Order, OrderService, Result } from '@shared';
import { Product } from '@shared/interfaces/product.interface';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-store-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class StoreOrderComponent implements OnInit {

  reactiveForm: FormGroup;
  btnOption = 'Enviar pedido';
  btnAction = true;
  imageSeleccionada: string | ArrayBuffer;
  file: any;
  typesPayment = ['Efectivo', 'Transferencia'];
  transfer = false;
  loading = false;
  user: User;

  order:Order;

  // urlTracing = 'https://jhonny.san.ar/tucomercio/seguimiento/?on=Nzgw';

  constructor(private fb: FormBuilder,
    settings: SettingsService,
    public dialogRef: MatDialogRef<StoreOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _orderService:OrderService,
    private _toastrService: ToastrService,) {
      this.user = settings.user;
     }

  ngOnInit() {
    this.newOrder();
  }

  newOrder() {
    this.reactiveForm = this.fb.group({
      typePayment: ['Efectivo', Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      time: [null, Validators.required],
      date: [moment().format('yyyy-MM-DD'), Validators.required],
      note: [null],
    });

    this.reactiveForm.valueChanges.subscribe(data => {
      this.transfer = data.typePayment === 'Efectivo' ? false : true; 
    })
  }

  selecionarImg(event:HtmlInputEvent):void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSeleccionada = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  sendOrder(){
    if(this.reactiveForm.valid){
      if(this.transfer && !this.file){
        this._toastrService.info('Debe subir una foto del voucher', 'Información');
        return;
      }
      this.loading = true;
      this.order = this.reactiveForm.value;
      this.order.fullname = this.user.fullname;
      this.order.email = this.user.email;
      this.order.products = this.data;
      this.order.time = moment(this.reactiveForm.value.time).format('LT');
      this._orderService.saveProduct(this.order, this.file)
        .then((data) => {
          console.log(data);
          console.log(data.u_.path.segments[1]);
          this.sendSMS(this.order.products, this.user, data.u_.path.segments[1]);
          this.mensaje({ ok:true, titulo:'Registrado', mensaje:'Se pedido se envio satisfactoriamente' })
        })
        .catch((error) => {
          this.mensaje({  ok:false, titulo:'Error',  mensaje:'Se ha producido un error al enviar su pedido.' })
        });
    }
  }

  sendSMS(list:Product[], client:User, code:string){
    const urlwhatsapp  = `https://api.whatsapp.com/send/?phone=`;
    const number  = `+59160717057`;
    const text = `&text=`
    const order  = `======= 🛒 Pedido =======`;
    const user  = `======= 🙋‍♂️ Cliente =======`;
    const lineJump = `%0A%0A`;
    let products = "";
    let totalOrder = 0;
    let dataUser = `Nombre completo: ${client.fullname}
                    %0ACelular: ${this.reactiveForm.value.phone}`;

    for(let item of list){
      totalOrder += item.price ? item.price : 0;
      products += `*Nombre:* ${item.name}%0A*Precio:* ${item.price ? item.price : '0'} $%0A%0A`;
    }
    const mssgCode = `%0A*Código de pedido: ${code}*`
    const mssgTotal = `*Total del pedido: ${totalOrder} $*`

    window.open(`${urlwhatsapp}${number}${text}${order}${lineJump}${products}${mssgTotal}${lineJump}${user}${lineJump}${dataUser}${mssgCode}`, "_blank");

  }



  mensaje(data:Result){
    this.loading = false;
    if(data.ok === true){
      this._toastrService.success(data.mensaje, data.titulo);
      this.dialogRef.close({empty:true});
    }else if (data.ok === false){
      this._toastrService.error(data.mensaje, data.titulo);
    }else{
      this._toastrService.info(data.mensaje, data.titulo);
    }
  }

}
