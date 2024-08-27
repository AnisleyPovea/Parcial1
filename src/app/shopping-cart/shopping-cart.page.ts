import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/IProduct';
import { HttpService } from '../services/http.service';
import { ToastController } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
   products: Product []=[];
   totalAmount: number = 0;
   formattedTotalAmount: string = '';

  constructor(private httpSrv: HttpService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.products= this.httpSrv.getProducts();
    this.totalAmount = this.httpSrv.getTotalAmount();
    this.formattedTotalAmount = this.formatCurrency(this.totalAmount);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  removeFromCart(product: Product) {
    this.httpSrv.removeProductFromCart(product);
    this.products = this.httpSrv.getProducts(); 
    console.log('Eliminated successfully');
  }

  async simulatePayment() {
   
    const toast = await this.toastController.create({
      message: `Payment Successful! `,
      duration: 3000,
      position: 'bottom',
      color: 'success'
      
    });
    await toast.present();
    console.log('Payment Successfull. Total:', this.formattedTotalAmount);
    
    this.httpSrv.clearCart();
  }

}
