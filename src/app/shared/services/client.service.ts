import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Client } from '@shared/interfaces/client.interface';
import { Product } from '@shared/interfaces/product.interface';
import { ConvertData } from '@shared/utils/convertDataFire';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    constructor(private firestore: AngularFirestore) {}

    loginClient(client:Client){
        return new Promise(resolve => {
            this.firestore.collection('Client').snapshotChanges().subscribe(data => {
                for(const item of ConvertData.getFire(data)){
                    if(client.email === item.email && client.password === item.password){
                        resolve({ok:true, client:item});
                    }          
                }
                resolve({ok:false});
            });
          });
    }

    getClients() {
      return this.firestore.collection('Client').snapshotChanges();
    }
  
    postClient(client: Client): Promise<DocumentReference> {
      return this.firestore.collection('Client').add(client);
    }
  
    deleteClient(id: any): Promise<void> {
      return this.firestore.collection('Client').doc(id).delete();
    }
  
    putClient(client: Client): Promise<void> {
      return this.firestore.collection('Client').doc(client.id.toString()).set(client);
    }

    // Order

    getOrders(idClient:string){
      return this.firestore.collection('Client').doc(idClient).collection('Product').snapshotChanges();
    }

    postOrder(idClient:string, product: Product){
      return this.firestore.collection('Client').doc(idClient).collection('Product').add(product);
    }

    deleteOrder(idClient: string, idProduct:string): Promise<void> {
      return this.firestore.collection('Client').doc(idClient).collection('Product').doc(idProduct).delete();
    }
}