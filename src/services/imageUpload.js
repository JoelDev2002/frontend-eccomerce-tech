/**
 * Servicio para subir imágenes a ImgBB
 * ImgBB es un servicio gratuito de alojamiento de imágenes
 * 
 * API Key pública de demostración (limitada)
 * Para producción, obtén tu propia clave en: https://api.imgbb.com/
 */

const IMGBB_API_KEY = '77ba4ec6b842fe252b45805e73222c03'; // Clave de demostración
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

/**
 * Sube una imagen a ImgBB y retorna la URL pública
 * @param {File} imageFile - Archivo de imagen a subir
 * @returns {Promise<string>} URL pública de la imagen subida
 * @throws {Error} Si la subida falla
 */
export const uploadImage = async (imageFile) => {
    try {
        // Validar que sea un archivo de imagen
        if (!imageFile.type.startsWith('image/')) {
            throw new Error('El archivo debe ser una imagen');
        }

        // Validar tamaño (máximo 32MB para ImgBB free tier)
        const maxSize = 32 * 1024 * 1024; // 32MB en bytes
        if (imageFile.size > maxSize) {
            throw new Error('La imagen es demasiado grande. Máximo 32MB');
        }

        // Crear FormData para enviar el archivo
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('key', IMGBB_API_KEY);

        // Realizar la petición a ImgBB
        const response = await fetch(IMGBB_UPLOAD_URL, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        // Verificar si la subida fue exitosa
        if (!data.success) {
            throw new Error(data.error?.message || 'Error al subir la imagen');
        }

        // Retornar la URL de la imagen
        return data.data.url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

/**
 * Valida si un archivo es una imagen válida
 * @param {File} file - Archivo a validar
 * @returns {boolean} true si es una imagen válida
 */
export const isValidImage = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return file && validTypes.includes(file.type);
};

/**
 * Convierte bytes a formato legible
 * @param {number} bytes - Tamaño en bytes
 * @returns {string} Tamaño formateado (ej: "2.5 MB")
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export default {
    uploadImage,
    isValidImage,
    formatFileSize,
};
