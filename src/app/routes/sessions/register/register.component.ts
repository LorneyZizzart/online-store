import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService, Result } from '@shared';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _clientService:ClientService,
    private _toastrService: ToastrService,
    private router: Router,) {
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required]],
      user: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
    });
  }

  ngOnInit() {}

  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  createCount(){
    if(this.registerForm.valid){
      this._clientService.postClient(this.registerForm.value)
      .then((response) => {
        this.mensaje({
          ok:true,
          titulo:'Registro exitoso',
          mensaje:'El registro de su encuenta fue satisfactorio'
        })
      })
      .catch((error) => {
        this.mensaje({
          ok:false,
          titulo:'Error',
          mensaje:'Se ha producido un error al registrar un nuevo producto'
        })
      }); 
    }
  }

  mensaje(data:Result){
    if(data.ok === true){
      this._toastrService.success(data.mensaje, data.titulo);
      this.router.navigateByUrl('/auth/client');
    }else if (data.ok === false){
      this._toastrService.error(data.mensaje, data.titulo);
    }else{
      this._toastrService.info(data.mensaje, data.titulo);
    }
  }
}
