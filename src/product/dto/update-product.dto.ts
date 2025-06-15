import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Category, DiscountType } from '../product.type';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  name?: string;

  price?: number;

  description?: string;

  stock?: number;

  image?: string;

  category?: Category;

  brand?: string;

  discount?: number;

  discountType?: DiscountType;
}
