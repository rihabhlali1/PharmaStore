import { Injectable } from '@angular/core';
import { ProductService } from './product.service'; // Import ProductService
import { BehaviorSubject } from 'rxjs'; // Import BehaviorSubject

@Injectable({
  providedIn: 'root'
})
export class CartService {
  updateCart(cartItems: { product: any; quantity: number; }[]) {
    throw new Error('Method not implemented.');
  }
  private cartKey = 'cartItems'; // Key to store cart items in localStorage
  private cartSubject = new BehaviorSubject<{ product: any, quantity: number }[]>(this.getCartItems()); // BehaviorSubject to track cart changes

  constructor(private productService: ProductService) {}

  // Get current cart items as an observable
  getCartItems(): { product: any, quantity: number }[] {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  // Get cart items as observable
  getCartItemsObservable() {
    return this.cartSubject.asObservable();
  }

  // Add item to the cart
  addToCart(productId: number): void {
    this.productService.getProducts().subscribe(products => {
      const product = products.find(p => p.id === productId);
      if (product) {
        const cartItems = this.getCartItems();
        const existingItem = cartItems.find(item => item.product.id === productId);

        if (existingItem) {
          existingItem.quantity++;
        } else {
          cartItems.push({ product, quantity: 1 });
        }

        this.saveCartItems(cartItems);
        this.cartSubject.next(cartItems); // Emit the updated cart items to observers
      }
    });
  }

  // Remove item from the cart
  removeFromCart(productId: number): void {
    const cartItems = this.getCartItems().filter(item => item.product.id !== productId);
    this.saveCartItems(cartItems);
    this.cartSubject.next(cartItems); // Emit the updated cart items to observers
  }

  // Clear all items from the cart
  clearCart(): void {
    this.saveCartItems([]);
    this.cartSubject.next([]); // Emit empty cart after clearing
  }

  // Save cart items to localStorage
  private saveCartItems(cartItems: { product: any, quantity: number }[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }
}
