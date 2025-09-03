export class Database {
    static async loadProducts() {
        try {
            const response = await fetch('./data/products.json');
            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
            return [];
        }
    }

    static async loadCategories() {
        try {
            const response = await fetch('./data/categories.json');
            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error);
            return [];
        }
    }

    static async loadAllData() {
        const [products, categories] = await Promise.all([
            this.loadProducts(),
            this.loadCategories()
        ]);

        return { products, categories };
    }
}
