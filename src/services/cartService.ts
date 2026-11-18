import type { CartItem, ProductRecord } from '../types';

const CART_STORAGE_KEY = 'the_threador_cart_v1';

export const cartService = {
  getItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addItem(
    product: ProductRecord,
    selectedSize: string,
    selectedColor: string,
    selectedFabric?: string,
    customNotes?: string,
    quantity = 1
  ): CartItem[] {
    const items = this.getItems();
    const existingIndex = items.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor &&
        item.selectedFabric === selectedFabric
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${selectedSize}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        product,
        selectedSize,
        selectedColor,
        selectedFabric,
        customNotes,
        quantity,
        addedAt: Date.now()
      };
      items.push(newItem);
    }

    this.save(items);
    return items;
  },

  updateQuantity(itemId: string, quantity: number): CartItem[] {
    let items = this.getItems();
    if (quantity <= 0) {
      items = items.filter((i) => i.id !== itemId);
    } else {
      items = items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
    }
    this.save(items);
    return items;
  },

  removeItem(itemId: string): CartItem[] {
    const items = this.getItems().filter((i) => i.id !== itemId);
    this.save(items);
    return items;
  },

  clearCart(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CART_STORAGE_KEY);
  },

  getSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  getCount(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
  },

  save(items: CartItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('the-threador-cart-update', { detail: items }));
    } catch (e) {
      console.warn('Failed to persist cart items to localStorage', e);
    }
  }
};

