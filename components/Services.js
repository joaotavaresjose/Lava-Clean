function Services() {
    try {
        const services = [
            {
                icon: 'fas fa-tshirt',
                title: 'Lavagem Comum',
                description: 'Lavagem completa de roupas do dia a dia com produtos de qualidade.',
                features: ['Sabão premium', 'Amaciante', 'Secagem natural']
            },
            {
                icon: 'fas fa-user-tie',
                title: 'Lavagem a Seco',
                description: 'Tratamento especial para roupas delicadas e sociais.',
                features: ['Ternos e vestidos', 'Roupas delicadas', 'Produtos especiais']
            },
            {
                icon: 'fas fa-iron',
                title: 'Passadoria',
                description: 'Serviço profissional de passadoria com acabamento perfeito.',
                features: ['Ferro profissional', 'Dobra perfeita', 'Embalagem cuidadosa']
            },
            {
                icon: 'fas fa-home',
                title: 'Roupas de Casa',
                description: 'Lavagem de edredons, cortinas e roupas de cama.',
                features: ['Edredons e cobertores', 'Cortinas', 'Roupas de cama']
            }
        ];

        return (
            <section id="services" data-name="services" data-file="components/Services.js" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossos Serviços</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Oferecemos uma gama completa de serviços para cuidar das suas roupas em Angola
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div 
                                key={index} 
                                className="service-card bg-white p-8 rounded-xl shadow-lg"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="text-center mb-6">
                                    <i className={`${service.icon} text-5xl text-blue-600 mb-4`}></i>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                </div>
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-600">
                                            <i className="fas fa-check text-green-500 mr-2"></i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Services component error:', error);
        reportError(error);
    }
}
