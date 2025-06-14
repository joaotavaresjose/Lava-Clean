function AuthModal({ isOpen, onClose, onSuccess }) {
    try {
        const [isLogin, setIsLogin] = React.useState(true);
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        });
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setError('');
            
            try {
                if (isLogin) {
                    if (!formData.email || !formData.password) {
                        throw new Error('Por favor, preencha todos os campos');
                    }
                    await authService.login(formData.email, formData.password);
                } else {
                    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
                        throw new Error('Por favor, preencha todos os campos');
                    }
                    if (formData.password !== formData.confirmPassword) {
                        throw new Error('Senhas não coincidem');
                    }
                    if (formData.password.length < 6) {
                        throw new Error('Senha deve ter pelo menos 6 caracteres');
                    }
                    await authService.register(formData);
                }
                
                onSuccess();
                setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
                setError('');
            } catch (error) {
                setError(error.message);
                console.error('Auth error:', error);
            } finally {
                setIsSubmitting(false);
            }
        };

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
            // Limpar erro quando usuário começar a digitar
            if (error) setError('');
        };

        const toggleMode = () => {
            setIsLogin(!isLogin);
            setError('');
            setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
        };

        if (!isOpen) return null;

        return (
            <div data-name="auth-modal" data-file="components/AuthModal.js" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {isLogin ? 'Entrar' : 'Cadastrar'}
                        </h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="grid grid-cols-1 gap-4">
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
                        )}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                        />

                        {!isLogin && (
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmar senha"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                            />
                        )}

                        {error && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="loading-spinner mr-2"></div>
                                    {isLogin ? 'Entrando...' : 'Cadastrando...'}
                                </div>
                            ) : (
                                isLogin ? 'Entrar' : 'Cadastrar'
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="text-blue-600 hover:underline"
                            >
                                {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AuthModal component error:', error);
        reportError(error);
    }
}
