function Pricing({ onOpenModal }) {
    try {
        const plans = [
            {
                name: 'Básico',
                price: '2.500 Kz',
                period: 'por kg',
                features: [
                    'Lavagem comum',
                    'Secagem natural',
                    'Dobra simples',
                    'Entrega em 48h'
                ],
                popular: false
            },
            {
                name: 'Premium',
                price: '4.200 Kz',
                period: 'por kg',
                features: [
                    'Lavagem premium',
                    'Amaciante especial',
                    'Passadoria incluída',
                    'Entrega em 24h',
                    'Embalagem premium'
                ],
                popular: true
            },
            {
                name: 'Executivo',
                price: '5.800 Kz',
                period: 'por kg',
                features: [
                    'Lavagem a seco',
                    'Tratamento especial',
                    'Passadoria profissional',
                    'Entrega expressa',
                    'Coleta agendada'
                ],
                popular: false
            }
        ];

        return (
            <section id="pricing" data-name="pricing" data-file="components/Pricing.js" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossos Preços</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Planos flexíveis para atender suas necessidades em Angola
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {plans.map((plan, index) => (
                            <div 
                                key={index} 
                                className={`price-card relative p-8 rounded-xl shadow-lg ${plan.popular ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-200'}`}
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                                            Mais Popular
                                        </span>
                                    </div>
                                )}
                                
                                <div className="text-center mb-8">
                                    <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-gray-800'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className="mb-4">
                                        <span className={`text-3xl font-bold ${plan.popular ? 'text-white' : 'text-gray-800'}`}>
                                            {plan.price}
                                        </span>
                                        <span className={`text-lg block ${plan.popular ? 'text-gray-200' : 'text-gray-600'}`}>
                                            {plan.period}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center">
                                            <i className={`fas fa-check mr-3 ${plan.popular ? 'text-yellow-300' : 'text-green-500'}`}></i>
                                            <span className={plan.popular ? 'text-white' : 'text-gray-600'}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button 
                                    onClick={onOpenModal}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                                        plan.popular 
                                            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    Escolher Plano
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Pricing component error:', error);
        reportError(error);
    }
}
