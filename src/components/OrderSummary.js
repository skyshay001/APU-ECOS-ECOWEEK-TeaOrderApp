import React from "react";

const OrderSummary = ({ orders, saveOrdersToDatabase }) => {
    return (
        <div>
            <h2>Order Summary</h2>
            {orders.length === 0 ? (
                <p>No orders added yet.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            Tea: {order.teaType}, Add-Ons:{" "}
                            {order.addOns.length > 0 ? order.addOns.join(", ") : "None"}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={saveOrdersToDatabase}>Submit All Orders</button>
        </div>
    );
};

export default OrderSummary;