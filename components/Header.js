function Header({ onOpenModal, onOpenAuth, onOpenProfile }) {
    try {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const [user, setUser] = React.useState(null);

        React.useEffect(() => {
            setUser(authService.getCurrentUser());
            
            // Atualizar estado do usuário quando houver mudanças
            const handleStorageChange = () => {
                setUser(authService.getCurrentUser());
            };
            
            window.addEventListener('storage', handleStorageChange);
            return () => window.removeEventListener('storage', handleStorageChange);
        }, []);

        const scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setIsMenuOpen(false);
        };

        const handleOrderClick = () => {
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
                onOpenModal();
            } else {
                onOpenAuth();
            }
        };

        const handleLogout = () => {
            authService.logout();
            setUser(null);
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

                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700">Olá, {user.objectData.name}</span>
                                    <button 
                                        onClick={handleOrderClick}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Fazer Pedido
                                    </button>
                                    <button 
                                        onClick={onOpenProfile}
                                        className="text-gray-700 hover:text-blue-600 transition"
                                        title="Meu Perfil"
                                    >
                                        <i className="fas fa-user-circle text-xl"></i>
                                    </button>
                                    <button 
                                        onClick={handleLogout}
                                        className="text-gray-700 hover:text-red-600 transition"
                                        title="Sair"
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={onOpenAuth}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Entrar / Cadastrar
                                </button>
                            )}
                        </div>

                        <div className="md:hidden flex items-center space-x-2">
                            {user && (
                                <button 
                                    onClick={onOpenProfile}
                                    className="text-gray-700 hover:text-blue-600 transition"
                                >
                                    <i className="fas fa-user-circle text-xl"></i>
                                </button>
                            )}
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700"
                            >
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pb-4">
                            <nav className="flex flex-col space-y-4">
                                <button onClick={() => scrollToSection('home')} className="text-gray-700 text-left">Início</button>
                                <button onClick={() => scrollToSection('services')} className="text-gray-700 text-left">Serviços</button>
                                <button onClick={() => scrollToSection('pricing')} className="text-gray-700 text-left">Preços</button>
                                <button onClick={() => scrollToSection('about')} className="text-gray-700 text-left">Sobre</button>
                                <button onClick={() => scrollToSection('contact')} className="text-gray-700 text-left">Contato</button>
                                {user ? (
                                    <div className="flex flex-col space-y-2">
                                        <span className="text-gray-700">Olá, {user.objectData.name}</span>
                                        <button onClick={handleOrderClick} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-left">
                                            Fazer Pedido
                                        </button>
                                        <button onClick={onOpenProfile} className="text-blue-600 text-left">
                                            Meu Perfil
                                        </button>
                                        <button onClick={handleLogout} className="text-red-600 text-left">
                                            Sair
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={onOpenAuth} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-left">
                                        Entrar / Cadastrar
                                    </button>
                                )}
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
