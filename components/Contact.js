function Contact() {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [submitMessage, setSubmitMessage] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            
            try {
                // Salvar no banco de dados
                await trickleCreateObject('contact', {
                    ...formData,
                    createdAt: new Date().toISOString()
                });
                
                // Enviar para WhatsApp
                const whatsappMessage = `*Nova Mensagem - LavaClean Angola*%0A%0A*Nome:* ${formData.name}%0A*Email:* ${formData.email}%0A*Telefone:* ${formData.phone}%0A*Mensagem:* ${formData.message}`;
                const whatsappUrl = `https://wa.me/244951184916?text=${whatsappMessage}`;
                
                window.open(whatsappUrl, '_blank');
                
                setSubmitMessage('Mensagem enviada! Você será redirecionado para o WhatsApp.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } catch (error) {
                setSubmitMessage('Erro ao enviar mensagem. Tente novamente.');
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

        return (
            <section id="contact" data-name="contact" data-file="components/Contact.js" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Entre em Contato</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Estamos em Luanda prontos para atender você. Fale conosco!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div data-aos="fade-right">
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Endereço</h3>
                                        <p className="text-gray-600">Rua Kwame Nkrumah, 123 - Maianga<br />Luanda, Angola</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Telefone</h3>
                                        <p className="text-gray-600">+244 951 184 916<br />+244 912 345 678</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Email</h3>
                                        <p className="text-gray-600">contato@lavaclean.ao<br />pedidos@lavaclean.ao</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Horário</h3>
                                        <p className="text-gray-600">Segunda a Sexta: 7h às 18h<br />Sábado: 8h às 15h</p>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center space-x-3">
                                        <i className="fab fa-whatsapp text-2xl text-green-600"></i>
                                        <div>
                                            <h4 className="font-semibold text-green-800">WhatsApp Direto</h4>
                                            <p className="text-green-600 text-sm">Mensagens são enviadas automaticamente</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div data-aos="fade-left">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Seu nome"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                                
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Seu email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                                
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Seu telefone (+244)"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                                
                                <textarea
                                    name="message"
                                    placeholder="Sua mensagem"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                ></textarea>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <div className="loading-spinner mr-2"></div>
                                            Enviando...
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <i className="fab fa-whatsapp mr-2 text-xl"></i>
                                            Enviar via WhatsApp
                                        </div>
                                    )}
                                </button>
                                
                                {submitMessage && (
                                    <div className={`p-4 rounded-lg ${submitMessage.includes('enviada') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Contact component error:', error);
        reportError(error);
    }
}
