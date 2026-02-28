import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import SearchBar from '../common/SearchBar';
import '../common/SearchBar.css';

const Header = () => {
    const { cartCount } = useCart();

    // Placeholder function for search - replace with actual API call later
    const handleSearch = (searchTerm) => {
        console.log('Searching for:', searchTerm);
        // TODO: Implement search endpoint integration
        // Example: navigate to search results page or trigger search API
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center gap-6">
                    <Link to="/" className="flex items-center flex-shrink-0">
                        <img src="./logotech.png" alt="logo tech" className="h-10 w-auto object-contain" />
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-2xl">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex space-x-8 flex-shrink-0">
                        <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Inicio
                        </Link>
                        <Link to="/shop" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Tienda
                        </Link>
                    </nav>

                    {/* Cart Action */}
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative text-gray-600 hover:text-primary-600 transition-colors">
                            <span className="sr-only">Carrito</span>
                            {/* Simple Cart Icon Placeholder */}
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden mt-4">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
        </header>
    );
};

export default Header;
