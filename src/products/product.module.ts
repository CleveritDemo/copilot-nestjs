import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { ProductSeederService } from './product-seeder.service';
import { HttpModule } from '@nestjs/axios';
import { OpenAIService } from './openai.service';

@Module({
	imports: [TypeOrmModule.forFeature([Product]), HttpModule],
	providers: [ProductService, ProductSeederService, OpenAIService],
	controllers: [ProductController],
})
export class ProductModule {}
