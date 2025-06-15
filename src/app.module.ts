import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mobile-mart',
      synchronize: false,
      logging: true,
      entities: [Product],
      migrations: [__dirname + '/migrations/**/*.js'],
      subscribers: []
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor() {
    console.log('AppModule __dirname:', __dirname);
    console.log('Entities path used:', __dirname + '/**/*.entity{.ts,.js}');
    console.log('Product entity imported:', Product.name); // Should log 'Product'
  }
}
