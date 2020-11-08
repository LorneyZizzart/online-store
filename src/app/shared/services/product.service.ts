import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileImg } from '@shared/interfaces/fileImg.interface';
import { Product } from '@shared/interfaces/product.interface';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private PROD_STORAGE_PATH = 'product';
  public uploadPorcent = of(0);

  constructor(private firestore: AngularFirestore,
    private readonly storage: AngularFireStorage) {}

  getProducts() {
    return this.firestore.collection('Product').snapshotChanges();
  }

  saveProduct(product: Product, image?: FileImg) {
    if (image) {
      return this.saveProductWithImage(product, image);
    } else {
      return this.postProduct(product);
    }
  }

  private postProduct(product: Product): Promise<DocumentReference> {
    return this.firestore.collection('Product').add(product);
  }

  deleteProduct(id: any): Promise<void> {
    return this.firestore.collection('Product').doc(id).delete();
  }

  putProduct(product: Product): Promise<void> {
    return this.firestore.collection('Product').doc(product.id.toString()).set(product);
  }

  private saveProductWithImage(product: Product, image: FileImg): Promise<any>{
    return new Promise(resolve => { 
      const filePath = this.generateFileName(image.name);
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image);
      this.uploadPorcent =  task.percentageChanges();
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              product.imgUrl = urlImage;
              this.firestore.collection('Product').add(product).then(data => {
                resolve({ok:true, data});
              });
            });
          })
        ).subscribe();
    });
  }

  private generateFileName(name: string): string {
    return `${this.PROD_STORAGE_PATH}/${new Date().getTime()}_${name}`;
  }
}
