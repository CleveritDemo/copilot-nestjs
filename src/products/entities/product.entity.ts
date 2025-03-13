import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	image: string;

	@Column('decimal')
	price: number;

	@Column('int')
	quantity: number;

	@Column('boolean')
	isAvailable: boolean;

	@Column()
	category: string;
}
