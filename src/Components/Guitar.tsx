import type { Guitar } from "../Types";

/**
 * GuitarProps: Defines the structure of props received by the component
 */
type GuitarProps = {
    guitar: Guitar,                      // Guitar to display
    addToCart: (item: Guitar) => void    // Function to add item to cart
}

/**
 * Guitar: Component that displays an individual guitar and allows adding it to cart
 */
export default function Guitar({ guitar, addToCart }: GuitarProps) {
    // Extract the properties we'll use from the guitar object
    const { name, price, description, image } = guitar

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img 
                    className="img-fluid" 
                    src={`/img/${image}.jpg`} 
                    alt="imagen guitarra" 
                />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    )
}