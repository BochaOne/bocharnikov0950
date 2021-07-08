import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyProductCategory } from 'src/app/shared/interfaces/category.interface';
import { MyProduct } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: MyProduct[];
  categoryList!: MyProductCategory[];
  category:string = "";

  filters = [
    { id: 0, option: "category" },
    { id: 1, option: "count" }
  ];

  counts = [
    { id: 0, value: "Количество продуктов(Шт.)" },
    { id: 1, value: "Есть в наличие" },
    { id: 2, value: "Нет в наличие" },
  ]

  constructor(
    private productService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  async getProducts() {
    try {
      this.products = (await this.productService.getProducts()) || [];
    } catch (err) {
      console.log(err);
    }
  }

  linkToItem(id?: number) {
    if (id) {
      this.router.navigate([this.router.url, "item", id])
    } else {
      this.router.navigate([this.router.url, "item"])
    }
  }

  async getCategories() {
    try {
      this.categoryList = await this.productService.getCategories();
    } catch (err) {
      console.log(err);
    }
  }

  countProduct(product: MyProduct, type: string) {
    if (type == 'plus') {
      product.productCount++;
      this.productService.putProduct(product.id, product);
    } else {
      product.productCount--;
      this.productService.putProduct(product.id, product);
    }
  }

  async filterData(idFilt: string, selector: string) {
    this.products = (await this.productService.getProducts()) || [];
    let id = 0;
    id = parseInt(idFilt);
    this.filters.find(item => item.option == selector ? item.id = id : false);
    for (let filter of this.filters) {
      if (filter.id != 0) {
        if (filter.option == "count") {
          this.products = this.products.filter(item => filter.id == 1 ? item.productCount > 0 : item.productCount == 0 );
        }
      }
    }
  }

  async sortData(idSort: string) {
    let id = 0;
    id = parseInt(idSort);
    if (id == 0){
      this.products = this.products.sort((a, b) => a.productPrice - b.productPrice);
    } else if (id == 1) {
      this.products = this.products.sort((a, b) => b.productPrice - a.productPrice);
    } else if (id == 2) {
      this.products = this.products.sort((a, b) => a.productCount - b.productCount);
    } else if (id == 3) {
      this.products = this.products.sort((a, b) => b.productCount - a.productCount);
    }
  }
}
