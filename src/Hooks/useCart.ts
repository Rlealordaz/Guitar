import { useEffect, useState, useMemo } from "react";
import type { CartItem, Guitar } from '../Types'
import { db } from '../data/db'

/**
 * useCart: Custom hook that manages all shopping cart logic
 */
export const useCart = () => {
    /**
     * Retrieves the cart from localStorage on initialization
     */
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    // Main state variables
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    // Constants for quantity limits
    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    /**
     * Persists the cart to localStorage whenever it changes
     */
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    /**
     * Adds or updates an item in the cart
     */
    function addToCart(item: Guitar) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)

        if (itemExists >= 0) {
            // If it exists and doesn't exceed maximum, increment quantity
            if (cart[itemExists].quantity >= MAX_ITEMS) return

            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            // If it doesn't exist, add it with quantity 1
            const newItem: CartItem = { ...item, quantity: 1 }
            setCart([...cart, newItem])
        }
    }

    /**
     * Removes an item from the cart by its ID
     */
    function removeFromCart(id: Guitar['id']) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    /**
     * Decreases item quantity if not at minimum
     */
    function decreaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    /**
     * Increases item quantity if not exceeding maximum
     */
    function increaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    /**
     * Clears the cart completely
     */
    function clearCart() {
        setCart([])
    }

    // Derived state (memoized for performance optimization)
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + (item.quantity * item.price), 0),
        [cart]
    )

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        increaseQuantity,
        cartTotal,
        isEmpty
    }
}