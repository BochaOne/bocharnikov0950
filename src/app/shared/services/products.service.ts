import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MyProduct } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Promise<any> {
    return this.http.get(`${environment.routeApi}/products`).toPromise();
  }

  getProduct(id: number): Promise<any> {
    return this.http.get(`${environment.routeApi}/products/${id}`).toPromise();
  }

  postProduct(data: MyProduct): Promise<any> {
    return this.http.post(`${environment.routeApi}/products`, data).toPromise();
  }

  deleteProduct(id: number): Promise<any> {
    return this.http.delete( `${environment.routeApi}/products/${id}`).toPromise();
  }

  putProduct(id: number, data: MyProduct): Promise<any> {
    return this.http.put( `${environment.routeApi}/products/${id}`, data).toPromise();
  }

  getCategories(): Promise<any> {
    return this.http.get(`${environment.routeApi}/categories`).toPromise();
  }
}
