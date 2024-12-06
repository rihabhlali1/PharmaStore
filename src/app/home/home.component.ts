import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Use ProductService
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  groupedProducts: { [categoryId: number]: any[] } = {};  // Group products by category
  selectedCategoryId: number | null = null;
  cart: any[] = [];
  router: any;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    // Fetch categories
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    // Fetch products and group them by category
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.groupProductsByCategory(products); // Group products initially
    });
  }

  groupProductsByCategory(products: any[]): void {
    this.groupedProducts = {};  // Reset the grouped products
    products.forEach((product) => {
      if (!this.groupedProducts[product.categoryId]) {
        this.groupedProducts[product.categoryId] = [];
      }
      this.groupedProducts[product.categoryId].push(product);
    });
  }

  addToCart(product: any): void {
    // Call the CartService to add the product to the cart
    this.cartService.addToCart(product.id);

    // Optionally, navigate to the cart page
    this.router.navigate(['/cart']);
  }
}
