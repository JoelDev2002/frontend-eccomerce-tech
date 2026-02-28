const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Total Productos</div>
                    <div className="text-3xl font-bold text-gray-800">12</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Categorías</div>
                    <div className="text-3xl font-bold text-gray-800">4</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm mb-1">Ventas Hoy</div>
                    <div className="text-3xl font-bold text-gray-800">$0.00</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[300px] flex items-center justify-center text-gray-400">
                Gráficos y estadísticas vendrán aquí...
            </div>
        </div>
    );
};

export default AdminDashboard;
