import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  productsByCategory: { [key: string]: any[] } = {};
  popularProducts: any[] = [];

  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Fetch categories and products
    this.dataService.getCategories().subscribe((categories) => {
      this.categories = categories;

      this.dataService.getProducts().subscribe((products) => {
        this.groupProductsByCategory(products);
        this.populatePopularProducts(products);
      });
    });
  }

  groupProductsByCategory(products: any[]): void {
    this.categories.forEach((category) => {
      this.productsByCategory[category.name] = products.filter(
        (product) => product.categoryId === category.id
      );
    });
  }

  populatePopularProducts(products: any[]): void {
    this.popularProducts = products.filter((product) => product.isPopular);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}