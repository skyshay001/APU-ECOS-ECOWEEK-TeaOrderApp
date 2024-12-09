import React from "react";

const OrderForm = ({ teaType, setTeaType, menu }) => {
    return (
        <div>
            <h2>Select Tea Type</h2>
            <select value={teaType} onChange={(e) => setTeaType(e.target.value)}>
                <option value="">Select a tea</option>
                {menu.teaTypes.map((tea, index) => (
                    <option key={index} value={tea}>
                        {tea}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default OrderForm;