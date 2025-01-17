const cloudinary = require('cloudinary').v2;
const AppError = require('./appError');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class CloudinaryService {
  static async uploadImagem(filePath, options = {}) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'biblioteca',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 800, height: 600, crop: 'limit' }]
      });
      return {
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (error) {
      throw new AppError('Erro ao fazer upload da imagem', 500);
    }
  }

  static async deleteImagem(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      throw new AppError('Erro ao deletar imagem', 500);
    }
  }
}

module.exports = CloudinaryService;
