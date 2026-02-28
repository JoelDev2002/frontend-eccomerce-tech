import axios from 'axios';

// La URL base ahora es relativa porque configuramos un proxy en vite.config.js
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para transformar los datos del DTO de Java (ProductoResponseDTO)
const transformProduct = (product) => {
    console.log("RAW BACKEND PRODUCT:", product); // Log para debug
    // Manejo de la descripción (Map<String, String>)
    let descriptionText = '';
    let specifications = {};

    if (product.descripcion && typeof product.descripcion === 'object') {
        specifications = product.descripcion;
        // Creamos un texto resumen uniendo los valores del mapa
        descriptionText = Object.entries(product.descripcion)
            .map(([key, value]) => `${key}: ${value}`)
            .join('. ');
    } else {
        descriptionText = product.descripcion || '';
    }

    return {
        id: product.productoId, // Mapeo de productoId
        name: product.nombre,
        price: product.precio,
        stock: product.stock,
        image: product.urlImagen || 'https://placehold.co/400x300?text=No+Image',
        categoryId: product.categoriaId, // Nuevo campo del backend
        category: product.categoriaNombre || 'General',
        description: descriptionText, // Texto plano para tarjetas
        specifications: specifications, // Mapa original para detalles
    };
};

export const productService = {
    getAll: async () => {
        try {
            // El controlador retorna List<ProductoResponseDTO>
            const response = await api.get('/producto');
            return response.data.map(transformProduct);
        } catch (error) {
            console.error("Error connecting to backend:", error);
            throw error;
        }
    },
    getByCategory: async (categoryId) => {
        try {
            const response = await api.get(`/producto/category/${categoryId}`);
            return response.data.map(transformProduct);
        } catch (error) {
            console.error("Error fetching products by category:", error);
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const response = await api.get(`/producto/${id}`);
            return transformProduct(response.data);
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error;
        }
    },
    // Método crear adaptado a ProductoRequestDTO si fuera necesario en el futuro
    create: async (productData) => {
        const response = await api.post('/producto', productData);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/producto/${id}`);
    },
    update: async (id, productData) => {
        const response = await api.put(`/producto/${id}`, productData);
        return response.data;
    }
};

export const categoryService = {
    getAll: async () => {
        try {
            const response = await api.get('/categoria'); // CategoriaController ruta base es 'v1/categoria'
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },
    delete: async (id) => {
        await api.delete(`/categoria/${id}`);
    },
    create: async (categoryData) => {
        const response = await api.post('/categoria', categoryData);
        return response.data;
    }
};

export default api;
