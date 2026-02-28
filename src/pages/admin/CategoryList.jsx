import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../../services/api';
import { Trash } from 'lucide-react';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (error) {
            console.error("Failed to load categories", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
            try {
                // Nota: Falta implementar delete en categoryService en api.js
                await categoryService.delete(id);
                setCategories(categories.filter(c => c.idCategoria !== id));
            } catch (error) {
                console.error("Failed to delete category", error);
                alert("Error al eliminar categoría (Implementar API)");
            }
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Categorías</h1>
                <Link
                    to="/admin/categories/new"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    + Nueva Categoría
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Nombre</th>
                            <th className="p-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.map((category) => (
                            <tr key={category.idCategoria} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500">#{category.idCategoria}</td>
                                <td className="p-4 font-medium text-gray-900">{category.nombre}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleDelete(category.idCategoria)}
                                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                                    >
                                        <Trash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categories.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No hay categorías registradas.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryList;
