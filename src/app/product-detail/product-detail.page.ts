import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from '../services/http.service';
import { Product } from '../interfaces/IProduct';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private toastController: ToastController,
    private httpSrv: HttpService
  ) { }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Product ID:', id);
    try {
      this.product = await this.httpService.getProduct(id);
      console.log('Product Details:', this.product);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }

  getStarArray(rate: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rate));
  }

  async addToCart() {
    if (this.product) {
      this.httpSrv.addProductToCart(this.product);
      console.log('Add succesfully');
      const toast = await this.toastController.create({
        message: `${this.product.title} added to cart!`,
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      await toast.present();
    }
  }
}