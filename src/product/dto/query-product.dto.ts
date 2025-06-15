import { Category } from '../product.type';

export class QueryProductDto {
  q?: string;

  category?: Category;

  page?: number;

  take?: number;

  exclude?: string;
}
