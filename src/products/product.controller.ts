import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new product' })
	@ApiResponse({
		status: 201,
		description: 'The product has been successfully created.',
		type: Product,
	})
	create(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return this.productService.create(createProductDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all products' })
	@ApiResponse({
		status: 200,
		description: 'Return all products.',
		type: [Product],
	})
	findAll(): Promise<Product[]> {
		return this.productService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a product by ID' })
	@ApiResponse({
		status: 200,
		description: 'Return a product by ID.',
		type: Product,
	})
	findOne(@Param('id') id: string): Promise<Product> {
		return this.productService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a product by ID' })
	@ApiResponse({
		status: 200,
		description: 'The product has been successfully updated.',
		type: Product,
	})
	update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto,
	): Promise<Product> {
		return this.productService.update(id, updateProductDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a product by ID' })
	@ApiResponse({
		status: 200,
		description: 'The product has been successfully deleted.',
	})
	remove(@Param('id') id: string): Promise<void> {
		return this.productService.remove(id);
	}
}
