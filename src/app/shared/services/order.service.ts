import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileImg } from '@shared/interfaces/fileImg.interface';
import { Order } from '@shared/interfaces/order.interface';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private ORDER_STORAGE_PATH = 'order';
    public uploadPorcent = of(0);

    constructor(private firestore: AngularFirestore,
        private readonly storage: AngularFireStorage){}

    getOrders(){
      return this.firestore.collection('Order').snapshotChanges();
    }

        
    saveProduct(order:Order, image?: FileImg):Promise<any> {
        if (image) {
            return this.saveOrderWithImage(order, image);
        } else {
            return this.postOrder(order);
        }
    }

    private postOrder(order: Order): Promise<DocumentReference> {
        return this.firestore.collection('Order').add(order);
    }

    private saveOrderWithImage(order: Order, image: FileImg): Promise<any>{
        return new Promise(resolve => { 
          const filePath = this.generateFileName(image.name);
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, image);
          this.uploadPorcent =  task.percentageChanges();
          task.snapshotChanges()
            .pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(urlImage => {
                  order.imgUrl = urlImage;
                  this.firestore.collection('Order').add(order).then(data => {
                    resolve(data);
                  });
                });
              })
            ).subscribe();
        });
    }

    private generateFileName(name: string): string {
        return `${this.ORDER_STORAGE_PATH}/${new Date().getTime()}_${name}`;
    }

}