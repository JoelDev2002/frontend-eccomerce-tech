import { Box, DoorOpen, LayoutDashboard, Menu, Tag, X } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const AdminLayout = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard /> },
        { path: '/admin/products', label: 'Productos', icon: <Box /> },
        { path: '/admin/categories', label: 'Categorías', icon: <Tag /> },
    ];

    const closeSidebar = () => setSidebarOpen(false);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-primary-600 tracking-tight">
                    <img src="/logotech.png" alt="logo de la pagina" className="h-10 w-auto" />
                </Link>
                {/* Close button — mobile only */}
                <button
                    onClick={closeSidebar}
                    className="md:hidden text-gray-400 hover:text-gray-600"
                    aria-label="Cerrar menú"
                >
                    <X size={22} />
                </button>
            </div>

            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeSidebar}
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
                    onClick={closeSidebar}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                    <DoorOpen />
                    <span>Salir</span>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar — Desktop (always visible) */}
            <aside className="hidden md:flex w-64 bg-white shadow-md flex-col flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* Sidebar — Mobile (drawer) */}
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}
            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-grow overflow-hidden">
                {/* Mobile Top Bar */}
                <div className="md:hidden flex items-center gap-3 bg-white shadow-sm px-4 py-3 flex-shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600 hover:text-primary-600 transition-colors"
                        aria-label="Abrir menú"
                    >
                        <Menu size={24} />
                    </button>
                    <img src="/logotech.png" alt="admin" className="h-8 w-auto" />
                    <span className="text-sm font-semibold text-gray-700 ml-1">Admin</span>
                </div>

                <main className="flex-grow overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
