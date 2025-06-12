function Header({ onOpenModal }) {
    try {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);

        const scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setIsMenuOpen(false);
        };

        return (
            <header data-name="header" data-file="components/Header.js" className="bg-white shadow-lg fixed w-full top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-tint text-3xl text-blue-600"></i>
                            <h1 className="text-2xl font-bold text-gray-800">LavaClean</h1>
                        </div>
                        
                        <nav className="hidden md:flex space-x-8">
                            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition">Início</button>
                            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition">Serviços</button>
                            <button onClick={() => scrollToSection('pricing')} className="text-gray-700 hover:text-blue-600 transition">Preços</button>
                            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition">Sobre</button>
                            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition">Contato</button>
                        </nav>

                        <button 
                            onClick={onOpenModal}
                            className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Fazer Pedido
                        </button>

                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-gray-700"
                        >
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pb-4">
                            <nav className="flex flex-col space-y-4">
                                <button onClick={() => scrollToSection('home')} className="text-gray-700 text-left">Início</button>
                                <button onClick={() => scrollToSection('services')} className="text-gray-700 text-left">Serviços</button>
                                <button onClick={() => scrollToSection('pricing')} className="text-gray-700 text-left">Preços</button>
                                <button onClick={() => scrollToSection('about')} className="text-gray-700 text-left">Sobre</button>
                                <button onClick={() => scrollToSection('contact')} className="text-gray-700 text-left">Contato</button>
                                <button onClick={onOpenModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-left">
                                    Fazer Pedido
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
