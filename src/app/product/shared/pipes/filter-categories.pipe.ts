import { Pipe, PipeTransform } from '@angular/core';
import { MyProduct } from 'src/app/shared/interfaces/products.interface';

@Pipe({
  name: 'filterCategories'
})
export class FilterCategoriesPipe implements PipeTransform {

  transform(value: MyProduct[], args: string): MyProduct[] {
    return (value) ? value.filter(item => item.productCategory.includes(args)) : [];
  }

}
