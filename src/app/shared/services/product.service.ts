import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Product } from '@shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  getProducts() {
    return this.firestore.collection('Product').snapshotChanges();
  }

  postProduct(product: Product): Promise<DocumentReference> {
    return this.firestore.collection('Product').add(product);
  }

  deleteProduct(id: any): Promise<void> {
    return this.firestore.collection('Product').doc(id).delete();
  }

  putProduct(product: Product): Promise<void> {
    return this.firestore.collection('Product').doc(product.id.toString()).set(product);
  }
}
