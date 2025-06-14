function ProfileModal({ isOpen, onClose, user }) {
    try {
        const [orders, setOrders] = React.useState([]);
        const [loading, setLoading] = React.useState(false);

        React.useEffect(() => {
            if (isOpen && user) {
                loadUserOrders();
            }
        }, [isOpen, user]);

        const loadUserOrders = async () => {
            setLoading(true);
            try {
                const result = await trickleListObjects('order', 20, true);
                const userOrders = result.items.filter(order => 
                    order.objectData.email === user.objectData.email
                );
                setOrders(userOrders);
            } catch (error) {
                console.error('Erro ao carregar pedidos:', error);
            } finally {
                setLoading(false);
            }
        };

        const getStatusColor = (status) => {
            switch (status) {
                case 'pending': return 'text-yellow-600 bg-yellow-100';
                case 'processing': return 'text-blue-600 bg-blue-100';
                case 'completed': return 'text-green-600 bg-green-100';
                case 'cancelled': return 'text-red-600 bg-red-100';
                default: return 'text-gray-600 bg-gray-100';
            }
        };

        const getStatusText = (status) => {
            switch (status) {
                case 'pending': return 'Pendente';
                case 'processing': return 'Em Processamento';
                case 'completed': return 'Concluído';
                case 'cancelled': return 'Cancelado';
                default: return 'Desconhecido';
            }
        };

        if (!isOpen || !user) return null;

        return (
            <div data-name="profile-modal" data-file="components/ProfileModal.js" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
                    <div className="p-4 sm:p-6">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Meu Perfil</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-times text-lg sm:text-xl"></i>
                            </button>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white mb-4 sm:mb-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                                <div className="bg-white bg-opacity-20 rounded-full p-3">
                                    <i className="fas fa-user text-xl sm:text-2xl"></i>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg sm:text-xl font-semibold">{user.objectData.name}</h3>
                                    <p className="opacity-90 text-sm sm:text-base">{user.objectData.email}</p>
                                    <p className="opacity-90 text-sm sm:text-base">{user.objectData.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Estatísticas</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{orders.length}</div>
                                    <div className="text-xs sm:text-sm text-gray-600">Total de Pedidos</div>
                                </div>
                                <div className="bg-green-50 p-3 sm:p-4 rounded-lg text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                                        {orders.filter(o => o.objectData.status === 'completed').length}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600">Concluídos</div>
                                </div>
                                <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                                        {orders.filter(o => o.objectData.status === 'pending').length}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600">Pendentes</div>
                                </div>
                                <div className="bg-purple-50 p-3 sm:p-4 rounded-lg text-center col-span-2 lg:col-span-1">
                                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                                        {orders.reduce((total, order) => total + (order.objectData.total || 0), 0).toLocaleString()} Kz
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600">Total Gasto</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Pedidos Recentes</h4>
                            {loading ? (
                                <div className="flex justify-center py-6 sm:py-8">
                                    <div className="loading-spinner"></div>
                                </div>
                            ) : orders.length > 0 ? (
                                <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
                                    {orders.map((order) => (
                                        <div key={order.objectId} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                                                <div>
                                                    <div className="font-semibold text-gray-800 text-sm sm:text-base">
                                                        Pedido #{order.objectData.orderNumber}
                                                    </div>
                                                    <div className="text-xs sm:text-sm text-gray-600">
                                                        {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.objectData.status)} self-start`}>
                                                    {getStatusText(order.objectData.status)}
                                                </span>
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                                                <div>Serviço: {order.objectData.service}</div>
                                                <div>Peso: {order.objectData.weight}kg</div>
                                                <div className="font-semibold">Total: {order.objectData.totalFormatted}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 sm:py-8 text-gray-500">
                                    <i className="fas fa-box-open text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
                                    <p className="text-sm sm:text-base">Nenhum pedido encontrado</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProfileModal component error:', error);
        reportError(error);
    }
}
