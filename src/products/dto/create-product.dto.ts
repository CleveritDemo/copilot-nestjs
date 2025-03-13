import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	image: string;

	@IsNumber()
	price: number;

	@IsNumber()
	quantity: number;

	@IsBoolean()
	isAvailable: boolean;

	@IsString()
	category: string;
}
