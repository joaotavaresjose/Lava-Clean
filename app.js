function App() {
    try {
        const [isModalOpen, setIsModalOpen] = React.useState(false);
        const [isAuthOpen, setIsAuthOpen] = React.useState(false);
        const [isProfileOpen, setIsProfileOpen] = React.useState(false);
        const [user, setUser] = React.useState(null);

        React.useEffect(() => {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    offset: 100
                });
            }
            
            // Verificar usuário logado ao carregar
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
        }, []);

        const openModal = () => {
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
        };

        const openAuth = () => {
            setIsAuthOpen(true);
        };

        const closeAuth = () => {
            setIsAuthOpen(false);
        };

        const openProfile = () => {
            setIsProfileOpen(true);
        };

        const closeProfile = () => {
            setIsProfileOpen(false);
        };

        const handleAuthSuccess = () => {
            const newUser = authService.getCurrentUser();
            setUser(newUser);
            setIsAuthOpen(false);
            setIsModalOpen(true);
        };

        const handleOrderClick = () => {
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
                openModal();
            } else {
                openAuth();
            }
        };

        return (
            <div data-name="app" data-file="app.js">
                <Header 
                    onOpenModal={handleOrderClick} 
                    onOpenAuth={openAuth} 
                    onOpenProfile={openProfile} 
                />
                <Hero onOpenModal={handleOrderClick} />
                <Services />
                <Pricing onOpenModal={handleOrderClick} />
                <About />
                <Contact />
                <Footer />
                <OrderModal isOpen={isModalOpen} onClose={closeModal} />
                <AuthModal isOpen={isAuthOpen} onClose={closeAuth} onSuccess={handleAuthSuccess} />
                <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} user={user} />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
