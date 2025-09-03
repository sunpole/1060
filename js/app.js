import { Database } from '../modules/database.js';
import { Cart } from '../modules/cart.js';
import { UI } from '../modules/ui.js';
import { Utils } from '../modules/utils.js';

class ShopApp {
    constructor() {
        this.cart = new Cart();
        this.products = [];
        this.categories = [];
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.render();
    }

    async loadData() {
        const loadingElement = document.getElementById('loading');
        loadingElement.style.display = 'block';

        try {
            const data = await Database.loadAllData();
            this.products = data.products;
            this.categories = data.categories;
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            UI.showMessage('Не удалось загрузить данные', 'error');
        } finally {
            loadingElement.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Делаем методы доступными для onclick
        window.addToCart = (productId) => this.addToCart(productId);
        window.removeFromCart = (productId) => this.removeFromCart(productId);
        window.clearCart = () => this.clearCart();

        // Обновляем при изменении localStorage
        window.addEventListener('storage', () => {
            this.cart = new Cart();
            this.render();
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.cart.addProduct(product);
            this.render();
            UI.showMessage(`Добавлено: ${product.name}`, 'success');
        }
    }

    removeFromCart(productId) {
        this.cart.removeProduct(productId);
        this.render();
        UI.showMessage('Товар удален из корзины', 'info');
    }

    clearCart() {
        this.cart.clear();
        this.render();
        UI.showMessage('Корзина очищена', 'info');
    }

    render() {
        UI.renderProducts(this.products, this.categories, this.cart, this.addToCart);
        UI.renderCart(this.cart, this.removeFromCart);
        
        // Обновляем счетчик корзины
        document.getElementById('cart-count').textContent = this.cart.getTotalCount();
    }
}

// Инициализация приложения
const app = new ShopApp();

// Делаем доступным глобально для дебага
window.app = app;

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
