function Hero({ onOpenModal }) {
    try {
        return (
            <section id="home" data-name="hero" data-file="components/Hero.js" className="hero-gradient min-h-screen flex items-center pt-20">
                <div className="container mx-auto px-4 text-center text-white">
                    <div data-aos="fade-up" data-aos-duration="1000">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Sua Roupa
                            <span className="block text-yellow-300">Sempre Limpa</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Serviços de lavandaria premium em Angola com qualidade profissional. 
                            Coleta e entrega em Luanda e arredores.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={onOpenModal}
                                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition pulse-animation"
                            >
                                <i className="fas fa-shopping-cart mr-2"></i>
                                Fazer Pedido Agora
                            </button>
                            <button 
                                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition"
                            >
                                Ver Serviços
                            </button>
                        </div>
                    </div>
                    
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div data-aos="fade-up" data-aos-delay="200">
                            <i className="fas fa-clock text-4xl mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
                            <p>24-48 horas</p>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <i className="fas fa-shield-alt text-4xl mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">Qualidade Garantida</h3>
                            <p>100% Satisfação</p>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="600">
                            <i className="fas fa-truck text-4xl mb-4"></i>
                            <h3 className="text-xl font-semibold mb-2">Coleta Grátis</h3>
                            <p>Em Luanda</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Hero component error:', error);
        reportError(error);
    }
}
