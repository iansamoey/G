import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux"; // Importing useSelector to access Redux store

const PayPalButtonWrapper = () => {
  const cart = useSelector((state) => state.cart); // Accessing the cart from Redux store

  const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, // PayPal client ID from environment variables
    currency: "USD",
    intent: "capture",
  };

  // Calculate total dynamically based on cart items
  const total = cart.products.reduce(
    (sum, product) => sum + product.price * product.foodQuantity,
    0
  ).toFixed(2); // Ensuring total is formatted to two decimal places

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total, // Use the dynamically calculated total
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert(`Transaction completed by ${details.payer.name.given_name}`);
      // Here you can dispatch any actions or handle the transaction success
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: "vertical" }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButtonWrapper;
