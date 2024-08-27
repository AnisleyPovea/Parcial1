import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpService } from '../services/http.service';
import { Product } from '../interfaces/IProduct';
import { Category } from '../interfaces/ICategory';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  public products: Product[]=[];
  public filteredProducts: Product[] = []; 
  public categories: Category[] = [];  
  public selectedCategory: string = '';

  constructor(private readonly httpSrv: HttpService) {}

  async ngOnInit(){

    try {
    const url= environment.URL_BASE + "products";
    this.products = await this.httpSrv.get<Product[]>(url);
    this.filteredProducts = this.products;

    const urlCategories = environment.URL_PRODUCTS + "categories";
    this.categories = await this.httpSrv.get<Category[]>(urlCategories);

    console.log("~HomePage ~ ngOnInit ~ this.products:", this.products);
    console.log("~HomePage ~ ngOnInit ~ this.categories:", this.categories);
  } catch (error) {
    console.log('Error', error);
  }
}
  
filterProductsByCategory() {
  console.log('Selected Category:', this.selectedCategory); 
  if (this.selectedCategory) {
    this.filteredProducts = this.products.filter(product => 
      product.category === this.selectedCategory
    );
  } else {
    this.filteredProducts = this.products;  
  }
  console.log('Filtered Products:', this.filteredProducts); 
}
 
}
