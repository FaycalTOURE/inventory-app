import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IProduct {
  id: number;
  name: string;
  active: boolean;
  expirationDate: string;
  description: string;
  type: string;
  features?: string[];
}

function generateId() {
  return Math.floor(Math.random() * 1000 + 1);
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: IProduct[] = [{
    id: generateId(),
    name: 'IPhone X',
    active: true,
    description: 'Like Brand New',
    expirationDate: '01/15/2019',
    type: 'mobile'
  },
  {
    id: generateId(),
    name: 'Macbook Pro 13',
    active: false,
    description: 'MBP 13 - 8 GB RAM',
    expirationDate: '01/29/2020',
    type: 'laptop'
  },
  {
    id: generateId(),
    name: 'AirPods Pro',
    active: true,
    description: 'The Pro AirPods',
    expirationDate: '01/29/2020',
    type: 'music'
  }
  ];
  products$ = new BehaviorSubject<IProduct[]>(this.products);

  addProduct(product) {
    this.products = [
      {
        id: generateId(),
        ...product,
      },
      ...this.products,
    ];
    this.products$.next(this.products);
  }

  editProduct(id, product) {
    const index = this.products.findIndex(p => p.id === id);
    this.products = [
      ...this.products.slice(0, index),
      {
        id,
        ...product,
      },
      ...this.products.slice(index + 1),
    ];
    this.products$.next(this.products);
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    this.products = [
      ...this.products.slice(0, index),
      ...this.products.slice(index + 1),
    ];
    this.products$.next(this.products);
    this.products$.toPromise().then(function (data) {
      console.log('next', data);
    })
  }
}
