import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService, categoryService } from '../../services/api';
import { uploadImage, isValidImage } from '../../services/imageUpload';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stock: '',
        urlImagen: '',
        categoriaId: '',
        descripcion: '' // Texto simple por ahora, manejado aparte el mapa
    });

    // Estado para especificaciones dinámicas (Map<String, String>)
    const [specs, setSpecs] = useState([{ key: '', value: '' }]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Estado para subida de imágenes
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        loadCategories();
        if (isEditing) {
            loadProduct();
        }
    }, [id]);

    const loadCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
            console.log(data)
        } catch (error) {
            console.error("Error loading categories", error);
        }
    };

    const loadProduct = async () => {
        try {
            const product = await productService.getById(id);

            // Mapear los datos del frontend (product) a los del formulario (DTO style)
            // Nota: El getById transformer devuelve estructura en inglés, 
            // pero para enviar necesitamos formatear como DTO. 
            // Aquí el form usa estado interno mezcla de ambos por simplicidad UI, 
            // luego al enviar formateamos.

            console.log("PRODUCTO TRANSFORMADO CARGADO:", product);

            setFormData({
                nombre: product.name || '',
                precio: product.price || '',
                stock: product.stock || '',
                urlImagen: product.image || '',
                categoriaId: product.categoryId ? String(product.categoryId) : '',
                descripcion: product.description || ''
            });

            // Establecer vista previa de imagen si existe
            if (product.image) {
                setImagePreview(product.image);
            }

            // Cargar especificaciones
            if (product.specifications && Object.keys(product.specifications).length > 0) {
                const specsArray = Object.entries(product.specifications).map(([key, value]) => ({ key, value }));
                setSpecs(specsArray);
            }
        } catch (error) {
            console.error("Error loading product", error);
        }
    };

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    };

    const addSpec = () => {
        setSpecs([...specs, { key: '', value: '' }]);
    };

    const removeSpec = (index) => {
        setSpecs(specs.filter((_, i) => i !== index));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar que sea una imagen
        if (!isValidImage(file)) {
            alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF, WEBP)');
            return;
        }

        try {
            setUploadingImage(true);

            // Crear vista previa local
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Subir imagen a ImgBB
            const imageUrl = await uploadImage(file);
            console.log("Imagen subida con éxito:", imageUrl);

            // Actualizar el campo de URL
            setFormData(prev => ({ ...prev, urlImagen: imageUrl }));

        } catch (error) {
            console.error('Error al subir imagen:', error);
            alert('Error al subir la imagen: ' + error.message);
            setImagePreview(null);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData.categoriaId)
        try {

            // Construir Mapa de especificaciones
            const descripcionMap = {};
            specs.forEach(spec => {
                if (spec.key && spec.value) {
                    descripcionMap[spec.key] = spec.value;
                }
            });


            const categoriaIdNum = parseInt(formData.categoriaId, 10);

            if (isNaN(categoriaIdNum)) {
                console.error("ERROR: CategoriaId es NaN. Datos actuales:", formData);
                alert("Error: Por favor selecciona una categoría válida.");
                setLoading(false);
                return;
            }

            const payload = {
                nombre: formData.nombre,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                urlImagen: formData.urlImagen,
                categoriaId: categoriaIdNum,
                descripcion: descripcionMap
            };

            console.log("ENVIANDO PAYLOAD AL BACKEND:", payload);

            if (isEditing) {
                const response = await productService.update(id, payload);
                console.log("Respuesta servidor (Update):", response);
                navigate('/admin/products');
            } else {
                const response = await productService.create(payload);
                console.log("Respuesta servidor (Create):", response);
                navigate('/admin/products');
            }
        } catch (error) {
            console.error("Error saving product", error);
            alert("Error al guardar producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                            value={formData.nombre}
                            onChange={e => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                            value={formData.precio}
                            onChange={e => setFormData(prev => ({ ...prev, precio: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                        <input
                            type="number"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                            value={formData.stock}
                            onChange={e => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                        <select
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white"
                            value={formData.categoriaId}
                            onChange={e => setFormData(prev => ({ ...prev, categoriaId: e.target.value }))}
                        >
                            <option value="">Seleccionar Categoría</option>
                            {categories.map(cat => (
                                <option key={cat.categoriaId} value={cat.categoriaId}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>

                        {/* Selector de archivo */}
                        <div className="mb-4">
                            <label className="flex items-center justify-center w-full px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                                <div className="flex flex-col items-center">
                                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="text-sm text-gray-600">
                                        {uploadingImage ? 'Subiendo imagen...' : 'Haz clic para seleccionar una imagen'}
                                    </span>
                                    <span className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WEBP (máx. 32MB)</span>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={uploadingImage}
                                />
                            </label>
                        </div>

                        {/* Vista previa de imagen */}
                        {imagePreview && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={imagePreview}
                                        alt="Vista previa"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Campo manual de URL (opcional) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">O ingresa una URL manualmente</label>
                            <input
                                type="url"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                value={formData.urlImagen}
                                onChange={e => {
                                    setFormData({ ...formData, urlImagen: e.target.value });
                                    setImagePreview(e.target.value);
                                }}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                    </div>
                </div>

                {/* Sección de Especificaciones Dinámicas */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Especificaciones Técnicas</h2>
                        <button
                            type="button"
                            onClick={addSpec}
                            className="text-sm text-primary-600 font-bold hover:underline"
                        >
                            + Agregar Campo
                        </button>
                    </div>

                    <div className="space-y-3">
                        {specs.map((spec, index) => (
                            <div key={index} className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Ej: Pantalla, Procesador"
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                                    value={spec.key}
                                    onChange={e => handleSpecChange(index, 'key', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Valor"
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none"
                                    value={spec.value}
                                    onChange={e => handleSpecChange(index, 'value', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSpec(index)}
                                    className="text-red-500 hover:text-red-700 px-2"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        Estos campos se guardarán como un mapa detallado (clave: valor) en la base de datos.
                    </p>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="px-6 py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading || uploadingImage}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-primary-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Guardando...' : uploadingImage ? 'Subiendo Imagen...' : 'Guardar Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
