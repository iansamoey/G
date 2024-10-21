import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import PayPalButtonWrapper from './PayPalButtonWrapper'; // Assuming this is a component wrapping the PayPal button

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  // Retrieve cart from Redux state
  const cart = useSelector((state) => state.cart);

  // Log cart products to troubleshoot data retrieval
  useEffect(() => {
    console.log('Cart products:', cart.products);
  }, [cart.products]);

  // Function to handle quantity changes (0 for decrease, 1 for increase)
  const quantityChange = useCallback((changeType, product) => {
    if (changeType === 0 && product.foodQuantity > 1) {
      // Decrease quantity
      dispatch({
        type: 'DECREASE_QUANTITY',
        payload: { productId: product._id },
      });
    } else if (changeType === 1) {
      // Increase quantity
      dispatch({
        type: 'INCREASE_QUANTITY',
        payload: { productId: product._id },
      });
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {cart.products.length > 0 ? (
        <>
          {/* Cart Products Table */}
          <div className="max-h-[40rem] overflow-auto">
            <table className="w-full text-sm text-center text-gray-500">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="py-3 px-0">PRODUCT</th>
                  <th scope="col" className="py-3 px-6">EXTRAS</th>
                  <th scope="col" className="py-3 px-2">PRICE</th>
                  <th scope="col" className="py-3 px-6">QUANTITY</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product) => (
                  <tr
                    className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                    key={product._id}
                  >
                    <td className="py-4 px-0 font-medium">
                      <span className="text-purple-600">{product.title}</span>
                    </td>
                    <td className="py-4 px-6 font-medium">
                      {product.extras.length > 0
                        ? product.extras.map((item) => (
                            <span key={item._id}>
                              {item.text}
                              <br />
                            </span>
                          ))
                        : "No Extras"}
                    </td>
                    <td className="py-4 px-2 font-medium">
                      ${product.price}
                    </td>
                    <td className="py-4 px-6 font-medium">
                      <button onClick={() => quantityChange(0, product)}>
                        <i className="fa-solid fa-chevron-left mr-3 text-primary"></i>
                      </button>
                      {product.foodQuantity}
                      <button onClick={() => quantityChange(1, product)}>
                        <i className="fa-solid fa-chevron-right ml-3 text-primary"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PayPal Button Section */}
          <div className="my-4">
            <PayPalButtonWrapper />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <button
            className="btn-primary mt-4"
            onClick={() => router.push("/menu")}
          >
            Go to menu
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
