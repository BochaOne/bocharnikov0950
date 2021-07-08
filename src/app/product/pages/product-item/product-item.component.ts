import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProductCategory } from 'src/app/shared/interfaces/category.interface';
import { MyProduct } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  id: number | null = null;

  product!: MyProduct;
  categoryList!: MyProductCategory[];

  productForm!: FormGroup;

  constructor(
    private productService: ProductsService, 
    private fb: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
      this.getData();
      this.getCategories();
    })
  }

  async getData() {
    const controls = {
      productTitle: [null, [Validators.required, Validators.maxLength(50)]],
      productArticle: [null, [Validators.required, Validators.maxLength(50)]],
      productPrice: [null, [Validators.required, Validators.maxLength(50)]],
      productMaker: [null,[Validators.maxLength(200)]],
      productCategory: [null, [Validators.required]],
      productWeight: [null, [Validators.required, Validators.maxLength(50)]],
      productCount: [null, [Validators.required, Validators.maxLength(50)]],
    };

    this.productForm = this.fb.group(controls);

    if(this.id) {
      try {
        this.product = await this.productService.getProduct(this.id);
      } catch (error) {
        console.log(error);
        return;
      }
      this.productForm.patchValue(this.product);
    } else {
      this.productForm.reset();
    }
  }

  async onAddNote() {
    if(this.id) {
      const note = this.productForm.value;
      try {
        await this.productService.putProduct(this.id, note);
        this.router.navigate(['product']);
        this.getData();
      } catch (error) {
        console.log(error);
      }
    } else {
      const note = this.productForm.value;
      try {
        await this.productService.postProduct(note);
        this.router.navigate(['product']);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async onDeleteNote() {
    try {
      await this.productService.deleteProduct(this.id!);
      this.router.navigate(['product']);
    } catch (error) {
      console.log(error);
    }
  }

  async getCategories() {
    try {
      this.categoryList = await this.productService.getCategories();
    } catch (err) {
      console.log(err);
    }
  }
}
