import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category, DiscountType } from '../product.type';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  discount?: number;

  @Column({ name: 'discount_type' })
  discountType?: DiscountType;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column()
  image: string;

  @Column()
  category: Category;

  @Column()
  brand: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at' })
  deletedAt: Date;
}
