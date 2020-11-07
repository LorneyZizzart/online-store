import { MtxGridColumn } from '@ng-matero/extensions';

export interface Result{
    ok?:boolean;
    titulo?:string;
    mensaje?:string;
    columns?:MtxGridColumn[];
    result?:any[];
}