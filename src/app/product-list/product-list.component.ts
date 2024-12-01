import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone:false,
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategoryId: number | null = null;
  cart: any[] = [];
  router: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetch categories
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    // Fetch products
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products; // Initially show all products
    });
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
  
    console.log("Selected Category ID:", categoryId);
    console.log("All Products:", this.products);
  
    this.filteredProducts = categoryId
      ? this.products.filter((product) => {
          console.log(`Checking product: ${product.name}, categoryId: ${product.categoryId}`);
          return +product.categoryId === +categoryId;
        })
      : this.products;
  
    console.log("Filtered Products:", this.filteredProducts);
  }
  
  addToCart(product: any): void {
    // Add the product to the cart
    this.cart.push(product);
    console.log('Cart:', this.cart);

    // Optionally, navigate to the cart page
    this.router.navigate(['/cart'], { state: { cart: this.cart } });
  }
}
