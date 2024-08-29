import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/IProduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.URL_BASE;

  constructor(private readonly http: HttpClient) { }
  private cart: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cart);

  getCartItems(): Product[] {
    return this.cart;
  }

  public get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http.get<T>(url).subscribe(
        data => resolve(data),
        error => reject(error)
      );
    });
  } 

  public async getProduct(id: number): Promise<any> {
    const url = `${this.apiUrl}products/${id}`;
    try {
      return await this.http.get(url).toPromise();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  addProductToCart(product: Product) : void{
    this.cart.push(product);
    this.cartItemsSubject.next(this.cart);
  }

  getProducts(): Product[]{
    return this.cart;
  }

  removeProductFromCart(product: Product): void {
    const index = this.cart.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.cart.splice(index, 1);  
      this.cartItemsSubject.next(this.cart);
    }
  }
  

  getTotalAmount(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }

  clearCart(): void {
    this.cart = [];
    this.cartItemsSubject.next(this.cart);
  }
 
}

