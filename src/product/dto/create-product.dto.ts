import { Category, DiscountType } from '../product.type';

export class CreateProductDto {
  name: string;

  price: number;

  description: string;

  stock: number;

  image: string;

  category: Category;

  brand: string;

  discount?: number;

  discountType?: DiscountType;
}
