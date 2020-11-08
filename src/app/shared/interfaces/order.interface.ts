import { Product } from './product.interface';

export interface Order{
    id:string;
    typePayment:string;
    phone:string;
    address:string;
    time:string;
    date:string;
    note:string;
    fullname:string;
    email:string;
    imgUrl:string;
    products:Product[];
}