import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  productsByCategory: { [key: string]: any[] } = {};
  popularProducts: any[] = []; // Added for Popular Products section

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Fetch categories and products
    this.dataService.getCategories().subscribe((categories) => {
      this.categories = categories;

      this.dataService.getProducts().subscribe((products) => {
        this.groupProductsByCategory(products);
        this.populatePopularProducts(products); // Added for Popular Products
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
    this.popularProducts = products.filter((product) => product.isPopular); // Filtering popular products
  }

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }
}
