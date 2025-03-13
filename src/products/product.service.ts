import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OpenAIService } from './openai.service';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>,
		private openAIService: OpenAIService,
	) {}

	create(createProductDto: CreateProductDto): Promise<Product> {
		const product = this.productRepository.create(createProductDto);
		return this.productRepository.save(product);
	}

	findAll(): Promise<Product[]> {
		return this.productRepository.find();
	}

	async findOne(id: string): Promise<Product> {
		const product = await this.productRepository.findOneBy({ id });
		if (!product) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}

		const description = await this.openAIService.generateProductDescription(
			product.name,
		);
		product.description = description;

		return product;
	}

	async update(
		id: string,
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		await this.productRepository.update(id, updateProductDto);
		const product = await this.productRepository.findOneBy({ id });
		if (!product) {
			throw new NotFoundException(`Product with ID ${id} not found`);
		}
		return product;
	}

	async remove(id: string): Promise<void> {
		await this.productRepository.delete(id);
	}
}
