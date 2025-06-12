function App() {
    try {
        const [isModalOpen, setIsModalOpen] = React.useState(false);

        React.useEffect(() => {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    offset: 100
                });
            }
        }, []);

        const openModal = () => {
            setIsModalOpen(true);
        };

        const closeModal = () => {
            setIsModalOpen(false);
        };

        return (
            <div data-name="app" data-file="app.js">
                <Header onOpenModal={openModal} />
                <Hero onOpenModal={openModal} />
                <Services />
                <Pricing onOpenModal={openModal} />
                <About />
                <Contact />
                <Footer />
                <OrderModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
