import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
                <p className="text-gray-500 mb-8">Parece que aún no has agregado productos.</p>
                <Link to="/shop" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold transition-colors">
                    Ir a comprar
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-secondary-900">Carrito de Compras</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-50" />
                            <div className="flex-grow">
                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                <div className="font-bold text-primary-600">${item.price}</div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-2 hover:bg-gray-100 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-2 hover:bg-gray-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={clearCart}
                        className="text-gray-500 hover:text-red-500 text-sm font-medium mt-4"
                    >
                        Vaciar Carrito
                    </button>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
                    <h2 className="text-xl font-bold mb-6 text-gray-900">Resumen del Pedido</h2>
                    <div className="space-y-4 mb-6 border-b border-gray-100 pb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Envío</span>
                            <span className="text-green-600">Gratis</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 mb-8">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-primary-500/40">
                        Proceder al Pago
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-4">
                        Compras seguras y encriptadas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
