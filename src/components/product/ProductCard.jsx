import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [active, setActive] = useState(false)
    return (
        <div class=" flex  flex-col gap-1 rounded-2xl px-3 py-3 shadow-xl border border-gray-100 bg-white hover:scale-[1.01] transition duration-500">
            <header class="relative  rounded-xl w-full h-64 ">
                <div class="absolute top-2 right-2 z-10 cursor-pointer rounded-full bg-white p-1 shadow-md">
                    <Heart className={active ? 'fill-red-600 stroke-red-600' : ''} onClick={() => setActive(!active)} />
                </div>
                <img src={product.image} alt={product.name} class=" w-ful h-full  object-cover rounded-xl" />
            </header>
            <footer class="flex flex-col gap-1">
                <h3 class="text-purple-900 uppercase text-xs font-semibold tracking-wider">
                    {product.category}
                </h3>
                <p class="font-bold">{product.name}</p>
                <p class="text-gray-500 text-sm mb-4 flex-grow line-clamp-2">{product.description}</p>
                <span class="font-semibold text-black/70">S/ {product.price}</span>
            </footer>
            <button onClick={() => addToCart(product)} class="rounded-3xl bg-black px-2 py-3 text-white flex items-center justify-center gap-2">
                <ShoppingBag />
                <span>Agregar</span>
            </button>
        </div>

    );
};

export default ProductCard;
