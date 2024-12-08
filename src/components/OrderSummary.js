import React from "react";

const OrderSummary = ({ teaType, addOns, saveOrderToDatabase }) => {
    return (
        <div>
            <h2>Order Summary</h2>
            <p>Tea: {teaType || "None selected"}</p>
            <p>Add-Ons: {addOns.length > 0 ? addOns.join(", ") : "None"}</p>
            <button onClick={saveOrderToDatabase}>Submit Order</button>
        </div>
    );
};

export default OrderSummary;