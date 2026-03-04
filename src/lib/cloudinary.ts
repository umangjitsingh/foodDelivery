import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
	cloud_name: process.env.CLOUD_NAME ,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadFileOnCloudinary(file: Blob): Promise<string | null> {
	if (!file) return null;

	try {
		const buffer = Buffer.from(await file.arrayBuffer());

		const url = await new Promise<string | null>((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{ resource_type: "auto" },
				(error, result) => {
					if (error) return reject(error);
					resolve(result?.secure_url ?? null);
				}
			);

			uploadStream.end(buffer);
		});

		return url;
	} catch (err) {
		console.error("Cloudinary upload failed:", err);
		return null;
	}
}