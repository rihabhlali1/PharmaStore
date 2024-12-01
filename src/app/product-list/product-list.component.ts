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
    this.filteredProducts = categoryId
      ? this.products.filter((product) => product.categoryId === categoryId)
      : this.products;
  }
}
