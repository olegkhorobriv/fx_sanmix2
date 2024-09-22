// products.component.ts
import { Component } from '@angular/core';

interface Product {
  name: string;
  category: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [
    {
      name: 'Product 1',
      category: 'Category 1',
      description: 'Description for Product 1',
      image: 'https://via.placeholder.com/300'
    },
    {
      name: 'Product 2',
      category: 'Category 2',
      description: 'Description for Product 2',
      image: 'https://via.placeholder.com/300'
    }
    // Додайте більше продуктів за потреби
  ];

  applyFilter(filterValue: string) {
    // Логіка фільтрації продуктів
    filterValue = filterValue.trim().toLowerCase();
    this.products = this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  }

  addProduct() {
    // Логіка додавання нового продукту
  }

  editProduct(product: Product) {
    // Логіка редагування продукту
  }

  deleteProduct(product: Product) {
    // Логіка видалення продукту
  }
}
