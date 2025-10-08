/**
 * Guitar: Base type that defines the structure of a guitar in the catalog
 */
export type Guitar = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number
}

/**
 * CartItem: Extends the Guitar type by adding quantity for shopping cart
 */
export type CartItem = Guitar & {
    quantity: number
}

/**
 * Note: By using Guitar['id'] in other files we ensure that if the id type changes here,
 * it will automatically update throughout the application
 */