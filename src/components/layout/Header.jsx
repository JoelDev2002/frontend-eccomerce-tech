import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import SearchBar from '../common/SearchBar';
import '../common/SearchBar.css';
import { useState } from 'react';

const Header = () => {
    const { cartCount } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = (searchTerm) => {
        console.log('Searching for:', searchTerm);
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center gap-4">
                        {/* Logo */}
                        <Link to="/" className="flex items-center flex-shrink-0" onClick={closeMobileMenu}>
                            <img src="./logotech.png" alt="logo tech" className="h-10 w-auto object-contain" />
                        </Link>

                        {/* Search Bar — Desktop */}
                        <div className="hidden md:flex flex-1 max-w-2xl">
                            <SearchBar onSearch={handleSearch} />
                        </div>

                        {/* Navigation — Desktop */}
                        <nav className="hidden lg:flex space-x-8 flex-shrink-0">
                            <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                                Inicio
                            </Link>
                            <Link to="/shop" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                                Tienda
                            </Link>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Cart */}
                            <Link to="/cart" className="relative text-gray-600 hover:text-primary-600 transition-colors">
                                <span className="sr-only">Carrito</span>
                                <ShoppingCart size={24} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Hamburger — Mobile only */}
                            <button
                                className="lg:hidden p-1 text-gray-600 hover:text-primary-600 transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Abrir menú"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar — Mobile */}
                    <div className="md:hidden mt-3">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <Link to="/" onClick={closeMobileMenu}>
                        <img src="./logotech.png" alt="logo tech" className="h-9 w-auto object-contain" />
                    </Link>
                    <button onClick={closeMobileMenu} className="text-gray-500 hover:text-gray-700">
                        <X size={22} />
                    </button>
                </div>
                <nav className="flex flex-col p-5 gap-1">
                    <Link
                        to="/"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors"
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/shop"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors"
                    >
                        Tienda
                    </Link>
                    <Link
                        to="/cart"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors"
                    >
                        Carrito
                        {cartCount > 0 && (
                            <span className="ml-auto bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Header;
