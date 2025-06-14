const authService = {
    async register(userData) {
        try {
            const existingUser = await this.getUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email já cadastrado');
            }
            
            const user = await trickleCreateObject('user', {
                ...userData,
                password: this.hashPassword(userData.password),
                createdAt: new Date().toISOString()
            });
            
            this.setCurrentUser(user);
            return user;
        } catch (error) {
            throw new Error('Erro ao cadastrar: ' + error.message);
        }
    },

    async login(email, password) {
        try {
            const user = await this.getUserByEmail(email);
            if (!user || !this.verifyPassword(password, user.objectData.password)) {
                throw new Error('Email ou senha incorretos');
            }
            
            this.setCurrentUser(user);
            return user;
        } catch (error) {
            throw new Error('Erro ao fazer login: ' + error.message);
        }
    },

    async getUserByEmail(email) {
        try {
            const result = await trickleListObjects('user', 100, true);
            return result.items.find(user => user.objectData.email === email);
        } catch (error) {
            return null;
        }
    },

    logout() {
        localStorage.removeItem('lavaclean_user');
        window.location.reload();
    },

    getCurrentUser() {
        const userData = localStorage.getItem('lavaclean_user');
        return userData ? JSON.parse(userData) : null;
    },

    setCurrentUser(user) {
        localStorage.setItem('lavaclean_user', JSON.stringify(user));
    },

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    },

    hashPassword(password) {
        return btoa(password + 'lavaclean_salt');
    },

    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }
};
