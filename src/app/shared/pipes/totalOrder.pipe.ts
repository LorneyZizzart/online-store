import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '@shared/interfaces/product.interface';

@Pipe({
    name: 'totalOrder'
})
export class TotalOrderPipe implements PipeTransform{

    transform(list:Product[]): number{
        return list.reduce((sum, value) => (typeof value.price == "number" ? sum + value.price : sum), 0);
    }
}