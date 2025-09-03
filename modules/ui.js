export class UI {
    static renderProducts(products, categories, cart, onAddToCart) {
        const container = document.getElementById('products-container');
        
        container.innerHTML = products.map(product => {
            const category = categories.find(c => c.id === product.categoryId);
            
            return `
                <div class="product-card" style="border-color: ${category?.color || '#ccc'}">
                    <div class="product-emoji">${product.image}</div>
                    <h3>${product.name}</h3>
                    <p class="category" style="color: ${category?.color || '#666'}">
                        ${category?.name || 'Без категории'}
                    </p>
                    <p class="price">${product.price} руб.</p>
                    <button onclick="onAddToCart(${product.id})" class="add-btn">
                        🛒 Добавить
                    </button>
                </div>
            `;
        }).join('');
    }

    static renderCart(cart, onRemoveFromCart) {
        const container = document.getElementById('cart-container');
        const totalElement = document.getElementById('cart-total');
        
        if (cart.items.length === 0) {
            container.innerHTML = '<p class="empty">Корзина пуста</p>';
            totalElement.textContent = '0';
            return;
        }

        container.innerHTML = cart.items.map(item => `
            <div class="cart-item">
                <span class="item-emoji">${item.image}</span>
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">×${item.quantity}</span>
                <span class="item-price">${item.price * item.quantity} руб.</span>
                <button onclick="onRemoveFromCart(${item.id})" class="remove-btn">
                    ❌
                </button>
            </div>
        `).join('');

        totalElement.textContent = cart.getTotal();
    }

    static showMessage(text, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}
