import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HandlError {
    constructor(private _router: Router){}

    of(error:HttpErrorResponse):Promise<boolean>{
        switch (error.status) {
            case 400: return this._router.navigate(['/sessions/400']); 
            case 404: return this._router.navigate(['/sessions/404']);
            case 500: return this._router.navigate(['/sessions/500']);
            default:
                break;
        }
        return this._router.navigate(['/sessions/404']);
    }
}