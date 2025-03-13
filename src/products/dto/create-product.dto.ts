import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
	@ApiProperty({ description: 'The name of the product' })
	@IsString()
	name: string;

	@ApiProperty({ description: 'The description of the product' })
	@IsString()
	description: string;

	@ApiProperty({ description: 'The image URL of the product' })
	@IsString()
	image: string;

	@ApiProperty({ description: 'The price of the product' })
	@IsNumber()
	price: number;

	@ApiProperty({ description: 'The quantity of the product' })
	@IsNumber()
	quantity: number;

	@ApiProperty({ description: 'The availability status of the product' })
	@IsBoolean()
	isAvailable: boolean;

	@ApiProperty({ description: 'The category of the product' })
	@IsString()
	category: string;
}
