import React from "react";

const OrderDashboard = ({ orders, markAsServed, deleteOrder }) => {
    return (
        <div>
            <h2>Order Dashboard</h2>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            Tea: {order.teaType}, Add-Ons:{" "}
                            {order.addOns && order.addOns.length > 0
                                ? order.addOns.join(", ")
                                : "None"}{" "}
                            - {order.status || "Pending"}
                            <button onClick={() => markAsServed(order.id)}>Mark as Served</button>
                            <button onClick={() => deleteOrder(order.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderDashboard;