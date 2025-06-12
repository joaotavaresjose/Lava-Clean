const orderService = {
    async createOrder(orderData) {
        try {
            const order = await trickleCreateObject('order', {
                ...orderData,
                status: 'pending',
                orderNumber: this.generateOrderNumber(),
                createdAt: new Date().toISOString()
            });
            return order;
        } catch (error) {
            throw new Error('Erro ao criar pedido: ' + error.message);
        }
    },

    async getOrders() {
        try {
            const result = await trickleListObjects('order', 50, true);
            return result.items;
        } catch (error) {
            throw new Error('Erro ao buscar pedidos: ' + error.message);
        }
    },

    async updateOrderStatus(orderId, status) {
        try {
            const order = await trickleUpdateObject('order', orderId, { status });
            return order;
        } catch (error) {
            throw new Error('Erro ao atualizar pedido: ' + error.message);
        }
    },

    generateOrderNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `LV${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
    },

    calculateTotal(items) {
        return items.reduce((total, item) => {
            const price = this.getPriceByService(item.service);
            return total + (price * item.quantity);
        }, 0);
    },

    getPriceByService(service) {
        const prices = {
            'basico': 2500,
            'premium': 4200,
            'executivo': 5800
        };
        return prices[service] || 2500;
    },

    formatPrice(price) {
        return new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
            minimumFractionDigits: 0
        }).format(price).replace('AOA', 'Kz');
    }
};
