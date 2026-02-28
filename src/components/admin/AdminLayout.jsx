import { Box, DoorOpen, LayoutDashboard, Tag } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard /> },
        { path: '/admin/products', label: 'Productos', icon: <Box /> },
        { path: '/admin/categories', label: 'Categorías', icon: <Tag /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="text-2xl font-bold text-primary-600 tracking-tight">
                        <img src="/logotech.png" alt="logo de la pagina" />
                    </Link>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                ? 'bg-primary-50 text-primary-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <DoorOpen />
                        <span>Salir</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
