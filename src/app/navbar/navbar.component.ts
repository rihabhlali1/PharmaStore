import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone:false,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    // Simulate fetching cart count from a service
    this.cartCount = 3; // Replace with dynamic cart count logic
  }
}
