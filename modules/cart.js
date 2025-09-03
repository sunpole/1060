export class Cart {
    constructor() {
        this.items = this.loadFromStorage();
    }

    addProduct(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        
        this.saveToStorage();
        return this.items;
    }

    removeProduct(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        return this.items;
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    clear() {
        this.items = [];
        this.saveToStorage();
    }
}
