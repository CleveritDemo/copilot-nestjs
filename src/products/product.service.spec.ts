import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
	let service: ProductService;
	let repository: Repository<Product>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductService,
				{
					provide: getRepositoryToken(Product),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<ProductService>(ProductService);
		repository = module.get<Repository<Product>>(getRepositoryToken(Product));
	});

	describe('findAll', () => {
		it('should return an array of products', async () => {
			const products: Product[] = [
				{
					id: '1',
					name: 'Product 1',
					description: 'Description 1',
					image: 'Image 1',
					price: 100,
					quantity: 10,
					isAvailable: true,
					category: 'Category 1',
				},
				{
					id: '2',
					name: 'Product 2',
					description: 'Description 2',
					image: 'Image 2',
					price: 200,
					quantity: 20,
					isAvailable: false,
					category: 'Category 2',
				},
			];

			jest.spyOn(repository, 'find').mockResolvedValue(products);

			expect(await service.findAll()).toBe(products);
		});
	});

	describe('findOne', () => {
		it('should return a product if found', async () => {
			const product: Product = {
				id: '1',
				name: 'Product 1',
				description: 'Description 1',
				image: 'Image 1',
				price: 100,
				quantity: 10,
				isAvailable: true,
				category: 'Category 1',
			};

			jest.spyOn(repository, 'findOneBy').mockResolvedValue(product);

			expect(await service.findOne('1')).toBe(product);
		});

		it('should throw a NotFoundException if product not found', async () => {
			jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

			await expect(service.findOne('1')).rejects.toThrow(
				new NotFoundException(`Product with ID 1 not found`),
			);
		});
	});
});
