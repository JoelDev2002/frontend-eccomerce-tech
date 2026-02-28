import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const SideCart = () => {
    const {
        cart,
        isSideCartOpen,
        closeSideCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount
    } = useContext(CartContext);

    const navigate = useNavigate();

    const handleViewCart = () => {
        closeSideCart();
        navigate('/cart');
    };

    return (
        <>
            {/* Overlay oscuro */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isSideCartOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeSideCart}
            />

            {/* Side Cart Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isSideCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Tu Carrito</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
                            </p>
                        </div>
                        <button
                            onClick={closeSideCart}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Cerrar carrito"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tu carrito está vacío</h3>
                                <p className="text-gray-500">Añade productos para comenzar tu compra</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                        {/* Imagen del producto */}
                                        <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Detalles del producto */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 truncate mb-1">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-2">
                                                ${item.price.toFixed(2)}
                                            </p>

                                            {/* Controles de cantidad */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="w-8 text-center font-medium text-gray-800">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Precio total y botón eliminar */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                aria-label="Eliminar producto"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <p className="font-bold text-gray-800">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer con total y botones */}
                    {cart.length > 0 && (
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                            {/* Subtotal */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-gray-700">Subtotal</span>
                                <span className="text-2xl font-bold text-gray-900">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>

                            {/* Botones */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleViewCart}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-primary-500/30 transition-all"
                                >
                                    Ver Carrito Completo
                                </button>
                                <button
                                    onClick={closeSideCart}
                                    className="w-full bg-white hover:bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors"
                                >
                                    Continuar Comprando
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SideCart;
