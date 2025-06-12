function About() {
    try {
        return (
            <section id="about" data-name="about" data-file="components/About.js" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div data-aos="fade-right">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Sobre a LavaClean Angola</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Com mais de 8 anos de experiência em Angola, a LavaClean é referência 
                                em serviços de lavandaria premium em Luanda. Nossa missão é cuidar das suas roupas 
                                com o máximo de qualidade e carinho.
                            </p>
                            <p className="text-lg text-gray-600 mb-8">
                                Utilizamos equipamentos modernos e produtos de qualidade internacional para 
                                garantir que suas roupas fiquem sempre impecáveis, preservando as 
                                fibras e cores originais no clima angolano.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">8+</div>
                                    <div className="text-gray-600">Anos em Angola</div>
                                </div>
                                <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
                                    <div className="text-gray-600">Clientes em Luanda</div>
                                </div>
                                <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">25000+</div>
                                    <div className="text-gray-600">Peças Lavadas</div>
                                </div>
                                <div className="text-center" data-aos="fade-up" data-aos-delay="400">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">24h</div>
                                    <div className="text-gray-600">Entrega Rápida</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative" data-aos="fade-left">
                            <img 
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="Lavandaria moderna em Angola"
                                className="rounded-lg shadow-xl w-full"
                            />
                            <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('About component error:', error);
        reportError(error);
    }
}
