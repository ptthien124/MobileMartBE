import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryProductDto } from './dto/query-product.dto';
import { customResponse } from 'src/utils';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  create(createProductDto: CreateProductDto) {
    const { discount, discountType, price, stock, ...rest } = createProductDto;

    const payload: Partial<Product> = { price: Number(price), stock: Number(stock), ...rest };

    if (discount) {
      payload.discount = Number(discount);
      payload.discountType = discountType;
    }

    return this.productRepository.save(payload);
  }

  async findAll(queryProductDto: QueryProductDto) {
    const { q, category, page = 1, take = 10, exclude } = queryProductDto;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (q) {
      queryBuilder.andWhere('product.name ILIKE :q', { q: `%${q}%` });
    }

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    console.log(exclude, 'exclude');

    if (exclude) {
      queryBuilder.andWhere('product.id != :exclude and product.stock > 0', { exclude });
    }

    queryBuilder.take(take).skip((page - 1) * take);

    const response = await queryBuilder.getManyAndCount();

    return customResponse({ response, page, take });
  }

  findOne(id: string) {
    return this.productRepository.createQueryBuilder('product').where('product.id = :id', { id }).getOne();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    const { discount, discountType, price = product?.price, stock = product?.stock, ...rest } = updateProductDto;

    const payload: Partial<Product> = { ...rest, price: Number(price), stock: Number(stock) };

    if (discount) {
      payload.discount = Number(discount);
      payload.discountType = discountType;
    }

    return this.productRepository.update(id, payload);
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}
