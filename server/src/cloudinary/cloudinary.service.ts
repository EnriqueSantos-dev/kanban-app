import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	UploadApiErrorResponse,
	UploadApiResponse,
	v2 as cloudinary
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
	private readonly base64FormatString = 'data:image/png;base64,';

	constructor(private readonly configService: ConfigService) {}

	public async uploadImage(
		file: Express.Multer.File
	): Promise<UploadApiResponse | UploadApiErrorResponse> {
		return new Promise((resolve, reject) => {
			const extension = this.extractFileExtension(file);
			const fileToUpload = this.transformFileToUpload(file);

			cloudinary.uploader.upload(
				fileToUpload,
				{
					format: extension,
					folder: this.configService.get('CLOUDINARY_FOLDER')
				},
				(error, result) => {
					if (error) reject(error);
					resolve(result);
				}
			);
		});
	}

	private transformFileToUpload(File: Express.Multer.File) {
		const { buffer } = File;
		const base64Image = buffer.toString('base64');
		const fileStringFormattedToUpload = `${this.base64FormatString}${base64Image}`;

		return fileStringFormattedToUpload;
	}

	private extractFileExtension(file: Express.Multer.File) {
		const { mimetype } = file;
		const fileExtension = mimetype.split('/')[1];

		return fileExtension;
	}
}
