import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProductSeederService implements OnModuleInit {
	constructor(private readonly productService: ProductService) {}

	async onModuleInit() {
		await this.seedProducts();
	}

	async seedProducts() {
		const existingProducts = await this.productService.findAll();
		if (existingProducts.length > 0) {
			return;
		}

		const products: CreateProductDto[] = [];

		for (let i = 0; i < 10; i++) {
			products.push({
				name: faker.commerce.productName(),
				description: faker.commerce.productDescription(),
				image: faker.image.urlLoremFlickr(),
				price: parseFloat(faker.commerce.price()),
				quantity: faker.number.int({ min: 1, max: 100 }),
				isAvailable: faker.datatype.boolean(),
				category: faker.commerce.department(),
			});
		}

		for (const product of products) {
			await this.productService.create(product);
		}
	}
}
