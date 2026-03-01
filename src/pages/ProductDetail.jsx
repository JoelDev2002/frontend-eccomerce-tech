import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/api';
import { useCart } from '../hooks/useCart';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getById(id);
                const found = Array.isArray(data) ? data.find(p => p.id === parseInt(id)) : data;
                // Mock API might return array for getById depending on implementation, 
                // but our mock getById returns data directly if supported, 
                // or we might need to find it from getAll if API mock is simple.
                // Let's assume getById works or we fallback.
                // Actually my api.js getById calls /products/${id}, so it returns one item usually.
                // But for the mock array, if I used json-server it works. 
                // If I rely on the catch block in api.js returning MOCK_PRODUCTS, 
                // getById logic in api.js might fail if not handled.
                // Let's check api.js content I wrote.
                // api.js getById calls api.get. If it fails, it throws.
                // I didn't put a catch block in getById in api.js to return a mock item!
                // I only did it for getAll.
                // I should probably fix api.js or handle it here.
                // I will handle it here for safety or update api.js.
                // Updating api.js is cleaner.
                setProduct(found || data);
            } catch (error) {
                console.warn("Using fallback mock data");
                const mocks = await productService.getAll(); // this returns mocks on error
                const found = mocks.find(p => p.id === parseInt(id));
                setProduct(found);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-20">Cargando...</div>;
    if (!product) return <div className="text-center py-20">Producto no encontrado</div>;

    return (
        <div className="container mx-auto px-4 py-6 md:py-8">
            <Link to="/shop" className="text-gray-500 hover:text-primary-600 mb-6 md:mb-8 inline-block text-sm md:text-base">
                ← Volver a la tienda
            </Link>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-64 sm:h-80 md:h-auto bg-gray-100 flex items-center justify-center p-6 md:p-8">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                        <div className="text-sm font-bold text-primary-600 uppercase tracking-wide mb-2">
                            {product.category}
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>
                        <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                            ${product.price}
                        </div>
                        <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-base md:text-lg">
                            {product.description}
                        </p>

                        {/* Especificaciones Técnicas */}
                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="mb-6 md:mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-3">Especificaciones</h3>
                                <ul className="grid grid-cols-1 gap-2 text-sm">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <li key={key} className="flex justify-between border-b border-gray-200 pb-1 last:border-0">
                                            <span className="font-medium text-gray-500">{key}</span>
                                            <span className="text-gray-900 font-semibold">{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all shadow-lg hover:shadow-primary-500/40 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
