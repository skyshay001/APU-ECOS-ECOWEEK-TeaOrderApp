import React from "react";

const OrderForm = ({ setTeaType }) => {
    const handleTeaSelection = (event) => {
        setTeaType(event.target.value);
    };

    return (
        <div>
            <h2>Select Your Tea</h2>
            <form>
                <label>
                    <input
                        type="radio"
                        name="tea"
                        value="Black Tea"
                        onChange={handleTeaSelection}
                    />
                    Black Tea
                </label>
                <label>
                    <input
                        type="radio"
                        name="tea"
                        value="Green Tea"
                        onChange={handleTeaSelection}
                    />
                    Green Tea
                </label>
                <label>
                    <input
                        type="radio"
                        name="tea"
                        value="Houjicha"
                        onChange={handleTeaSelection}
                    />
                    Houjicha
                </label>
            </form>
        </div>
    );
};

export default OrderForm;