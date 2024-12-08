import React from "react";

const OrderDashboard = ({ orders }) => {
    return (
        <div>
            <h2>Order Dashboard</h2>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>
                            Tea: {order.teaType}, Add-Ons:{" "}
                            {order.addOns && order.addOns.length > 0
                                ? order.addOns.join(", ")
                                : "None"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderDashboard;