const Footer = () => {
    return (
        <footer className="bg-secondary-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">TechStore</h3>
                        <p className="text-gray-400">
                            La mejor tecnología al mejor precio.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-primary-400">Sobre Nosotros</a></li>
                            <li><a href="#" className="hover:text-primary-400">Contacto</a></li>
                            <li><a href="#" className="hover:text-primary-400">Términos y Condiciones</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Síguenos</h4>
                        <div className="flex space-x-4">
                            {/* Social placeholders */}
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} TechStore. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
