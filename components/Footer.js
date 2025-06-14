function Footer() {
    try {
        return (
            <footer data-name="footer" data-file="components/Footer.js" className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <i className="fas fa-tint text-2xl text-blue-400"></i>
                                <h3 className="text-xl font-bold">LavaClean Angola</h3>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Sua lavandaria de confiança em Luanda há mais de 8 anos.
                            </p>
                            <div className="flex space-x-4">
                                <i className="fab fa-facebook text-xl hover:text-blue-400 cursor-pointer"></i>
                                <i className="fab fa-instagram text-xl hover:text-pink-400 cursor-pointer"></i>
                                <i className="fab fa-whatsapp text-xl hover:text-green-400 cursor-pointer"></i>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>Lavagem Comum</li>
                                <li>Lavagem a Seco</li>
                                <li>Passadoria</li>
                                <li>Roupas de Casa</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contato</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><i className="fas fa-phone mr-2"></i>+244 923 456 789</li>
                                <li><i className="fas fa-envelope mr-2"></i>contato@lavaclean.ao</li>
                                <li><i className="fas fa-map-marker-alt mr-2"></i>Luanda, Angola</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Horários</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li>Segunda a Sexta: 7h às 18h</li>
                                <li>Sábado: 8h às 15h</li>
                                <li>Domingo: Fechado</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 LavaClean Angola. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer component error:', error);
        reportError(error);
    }
}
