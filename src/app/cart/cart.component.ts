import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service'; // Import CartService

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { product: any, quantity: number }[] = []; // Array to hold cart items

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to the cart items observable
    this.cartService.getCartItemsObservable().subscribe(cartItems => {
      this.cartItems = cartItems; // Update cartItems whenever cart state changes
    });
  }

  // Decrease product quantity
  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  // Increase product quantity
  increaseQuantity(item: any): void {
    item.quantity++;
    this.updateCart();
  }

  // Update quantity when changed in the input field
  updateQuantity(item: any): void {
    if (item.quantity < 1) {
      item.quantity = 1; // Prevent quantity from going below 1
    }
    this.updateCart();
  }

  // Remove product from cart
  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item.product.id);
  }

  // Clear the entire cart
  clearCart(): void {
    this.cartService.clearCart();
  }

  // Calculate total cart price
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }


  // Place the order (e.g., process checkout)
  placeOrder(): void {
    if (this.cartItems.length > 0) {
      alert('Order placed successfully!');
      this.clearCart(); // Clear cart after order
    } else {
      alert('Your cart is empty.');
    }
  }

  // Cancel the order (clear cart without placing an order)
  cancelOrder(): void {
    if (confirm('Are you sure you want to cancel the order?')) {
      this.clearCart();
    }
  }
  // Update cart after any quantity change
  updateCart(): void {
    this.cartService.updateCart(this.cartItems);
  }
}
