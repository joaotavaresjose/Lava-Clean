function OrderModal({ isOpen, onClose }) {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            phone: '',
            email: '',
            address: '',
            service: 'basico',
            weight: 1,
            pickupDate: '',
            notes: ''
        });
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [submitMessage, setSubmitMessage] = React.useState('');
        const [isSuccess, setIsSuccess] = React.useState(false);

        React.useEffect(() => {
            if (isOpen) {
                const user = authService.getCurrentUser();
                if (user) {
                    setFormData(prev => ({
                        ...prev,
                        name: user.objectData.name || '',
                        email: user.objectData.email || '',
                        phone: user.objectData.phone || ''
                    }));
                }
                setSubmitMessage('');
                setIsSuccess(false);
            }
        }, [isOpen]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setSubmitMessage('');
            
            try {
                const total = orderService.calculateTotal([{
                    service: formData.service,
                    quantity: formData.weight
                }]);

                await orderService.createOrder({
                    ...formData,
                    total: total,
                    totalFormatted: orderService.formatPrice(total)
                });
                
                setIsSuccess(true);
                setSubmitMessage('Pedido realizado com sucesso! Entraremos em contato em breve.');
                
                // Resetar formulário após 3 segundos e fechar modal
                setTimeout(() => {
                    setFormData({
                        name: '', phone: '', email: '', address: '',
                        service: 'basico', weight: 1, pickupDate: '', notes: ''
                    });
                    setSubmitMessage('');
                    setIsSuccess(false);
                    onClose();
                }, 3000);
                
            } catch (error) {
                setIsSuccess(false);
                setSubmitMessage('Erro ao realizar pedido. Tente novamente.');
                console.error('Order error:', error);
            } finally {
                setIsSubmitting(false);
            }
        };

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        const total = orderService.calculateTotal([{
            service: formData.service,
            quantity: formData.weight
        }]);

        if (!isOpen) return null;

        return (
            <div data-name="order-modal" data-file="components/OrderModal.js" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Fazer Pedido</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        {isSuccess ? (
                            <div className="text-center py-8">
                                <div className="mb-4">
                                    <i className="fas fa-check-circle text-6xl text-green-500"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pedido Confirmado!</h3>
                                <p className="text-gray-600 mb-4">{submitMessage}</p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-green-800 text-sm">
                                        <i className="fas fa-info-circle mr-2"></i>
                                        Esta janela fechará automaticamente em alguns segundos...
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nome completo"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Telefone (+244)"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                />

                                <textarea
                                    name="address"
                                    placeholder="Endereço completo em Luanda para coleta"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    rows="2"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                ></textarea>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                    >
                                        <option value="basico">Básico - 2.500 Kz/kg</option>
                                        <option value="premium">Premium - 4.200 Kz/kg</option>
                                        <option value="executivo">Executivo - 5.800 Kz/kg</option>
                                    </select>

                                    <input
                                        type="number"
                                        name="weight"
                                        placeholder="Peso (kg)"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                    />

                                    <input
                                        type="date"
                                        name="pickupDate"
                                        value={formData.pickupDate}
                                        onChange={handleChange}
                                        required
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>

                                <textarea
                                    name="notes"
                                    placeholder="Observações (opcional)"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows="2"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                                ></textarea>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center text-lg font-semibold">
                                        <span>Total:</span>
                                        <span className="text-blue-600">{orderService.formatPrice(total)}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <div className="loading-spinner mr-2"></div>
                                            Processando pedido...
                                        </div>
                                    ) : (
                                        'Confirmar Pedido'
                                    )}
                                </button>

                                {submitMessage && !isSuccess && (
                                    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                                        <i className="fas fa-exclamation-triangle mr-2"></i>
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('OrderModal component error:', error);
        reportError(error);
    }
}
