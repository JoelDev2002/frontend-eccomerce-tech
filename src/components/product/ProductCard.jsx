import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [active, setActive] = useState(false);

    return (
        <div className="flex flex-col rounded-2xl shadow-md border border-gray-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

            {/* Imagen */}
            <div className="relative w-full h-32 sm:h-44 lg:h-48 bg-white overflow-hidden">
                <button
                    onClick={() => setActive(!active)}
                    className="absolute top-2 right-2 z-10 rounded-full bg-white/90 backdrop-blur-sm p-1.5 shadow hover:scale-110 transition-transform"
                >
                    <Heart
                        size={15}
                        className={active ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400'}
                    />
                </button>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-0.5 px-2.5 pt-2 pb-1 sm:px-3 sm:pt-3 flex-grow">
                <span className="text-purple-700 uppercase text-[10px] sm:text-xs font-bold tracking-wider truncate">
                    {product.category}
                </span>
                <p className="font-semibold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2">
                    {product.name}
                </p>
                <p className="font-bold text-gray-800 text-sm sm:text-base mt-0.5">
                    S/ {product.price}
                </p>
            </div>

            {/* Botón */}
            <div className="px-2.5 pb-2.5 pt-1.5 sm:px-3 sm:pb-3">
                <button
                    onClick={() => addToCart(product)}
                    className="w-full rounded-xl bg-black hover:bg-gray-800 active:scale-95 px-2 py-2 sm:py-2.5 text-white flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium transition-all duration-200"
                >
                    <ShoppingBag size={15} />
                    <span>Agregar</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
