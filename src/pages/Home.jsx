import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import CategoryNav from '../components/common/CategoryNav';
import { CreditCard, Motorbike, ShieldCheck } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAll();
                setProducts(data.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>

            {/* Hero Section */}
            <section
                className="relative text-white h-[400px] lg:h-[517px] bg-cover bg-center bg-no-repeat "
                style={{
                    backgroundImage: `url('./banner-apple.webp')`,
                }}
            >
                {/* Overlay con degradado para mejorar legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>

                <Link
                    to="/shop"
                    className="absolute left-1/2 -translate-x-1/2 bottom-10 text-center inline-block bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/30 "
                >
                    Ver Catálogo
                </Link>
            </section>
            <CategoryNav />

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl font-bold text-secondary-900">Productos Destacados</h2>
                    <Link to="/shop" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center">
                        Ver todos <span className="ml-1">→</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 h-96 animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                                <div className="p-4 space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Features/Benefits Section (Optional visual filler) */}
            <section className="bg-white py-16 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-gradient-to-t from-blue-400 to-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"><Motorbike size={35} strokeWidth={2} /></div>
                            <h3 className="text-xl font-bold mb-2">Envío Gratis</h3>
                            <p className="text-gray-500">En compras superiores a $500</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-gradient-to-t from-purple-400 to-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"><ShieldCheck size={35} strokeWidth={2} /></div>
                            <h3 className="text-xl font-bold mb-2">Garantía Asegurada</h3>
                            <p className="text-gray-500">12 meses de garantía oficial</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-gradient-to-t from-green-400 to-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"><CreditCard size={35} strokeWidth={2} /></div>
                            <h3 className="text-xl font-bold mb-2">Pago Seguro</h3>
                            <p className="text-gray-500">Tarjetas de crédito y débito</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
