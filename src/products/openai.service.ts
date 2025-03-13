import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface OpenAIResponse {
	choices: {
		message: {
			content: string;
		};
	}[];
}

@Injectable()
export class OpenAIService {
	constructor(private readonly httpService: HttpService) {}

	async generateProductDescription(productName: string): Promise<string> {
		const headers = {
			'Content-Type': 'application/json',
			'api-key': process.env.OPENAI_API_KEY,
		};

		const params = {
			'api-version': '2024-02-15-preview',
		};

		const json_data = {
			messages: [
				{
					role: 'system',
					content:
						'You are an AI wizard that helps people create product descriptions.',
				},
				{
					role: 'user',
					content: productName,
				},
			],
			max_tokens: 800,
			temperature: 0.7,
			frequency_penalty: 0,
			presence_penalty: 0,
			top_p: 0.95,
			stop: null,
		};

		try {
			const response = await firstValueFrom(
				this.httpService.post<OpenAIResponse>(
					'https://clever-dev-openai.openai.azure.com/openai/deployments/chat/chat/completions',
					json_data,
					{ headers, params },
				),
			);
			return response.data.choices[0].message.content;
		} catch (error) {
			throw new InternalServerErrorException(
				'Failed to generate product description',
			);
		}
	}
}
