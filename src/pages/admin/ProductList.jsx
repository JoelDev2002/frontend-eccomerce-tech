import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/api';
import { Pencil, Trash } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await productService.delete(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error("Failed to delete product", error);
                alert("Error al eliminar el producto");
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Cargando...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 gap-4">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Productos</h1>
                <Link
                    to="/admin/products/new"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium transition-colors text-sm md:text-base whitespace-nowrap"
                >
                    + Nuevo Producto
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[640px]">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100 text-center">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Imagen</th>
                                <th className="p-4">Nombre</th>
                                <th className="p-4">Precio</th>
                                <th className="p-4">Categoría</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-center">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-200 transition-colors">
                                    <td className="p-4 text-gray-500">#{product.id}</td>
                                    <td className="p-4 flex justify-center items-center">
                                        <img src={product.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">{product.name}</td>
                                    <td className="p-4 text-gray-600">${product.price}</td>
                                    <td className="p-4 text-gray-600">
                                        <span className="bg-blue-50 text-purple-700 px-2 py-1 rounded text-xs font-bold uppercase">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600">{product.stock}</td>
                                    <td className="py-4 text-right flex gap-6 justify-center">
                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="bg-primary-100 hover:bg-primary-500 hover:text-primary-100 p-2 rounded-full text-primary-600 font-medium text-sm"
                                        >
                                            <Pencil />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-100 hover:bg-red-500 hover:text-red-100 p-2 rounded-full text-red-500 font-medium text-sm"
                                        >
                                            <Trash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {products.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No hay productos registrados.
                    </div>
                )}
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
                {products.length === 0 && (
                    <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm border border-gray-100">
                        No hay productos registrados.
                    </div>
                )}
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-3 items-center">
                        <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                        <div className="flex-grow min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                            <p className="text-sm text-gray-500">${product.price} · Stock: {product.stock}</p>
                            <span className="inline-block bg-blue-50 text-purple-700 px-2 py-0.5 rounded text-xs font-bold uppercase mt-1">
                                {product.category}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                            <Link
                                to={`/admin/products/edit/${product.id}`}
                                className="bg-primary-100 hover:bg-primary-500 hover:text-primary-100 p-2 rounded-full text-primary-600"
                            >
                                <Pencil size={16} />
                            </Link>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="bg-red-100 hover:bg-red-500 hover:text-red-100 p-2 rounded-full text-red-500"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;

