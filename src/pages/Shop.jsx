import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import CategoryNav from '../components/common/CategoryNav';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let data;
                if (categoryId) {
                    data = await productService.getByCategory(categoryId);
                } else {
                    data = await productService.getAll();
                }
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [categoryId]);

    return (
        <div>

            <CategoryNav />
            <div className="container mx-auto px-4 py-6 md:py-8">
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2 md:mb-4">
                        {categoryId ? `Categoría: ${products[0]?.category || 'Cargando...'}` : 'Catálogo Completo'}
                    </h1>
                    <p className="text-gray-600">Explora nuestra selección de los mejores dispositivos móviles.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
