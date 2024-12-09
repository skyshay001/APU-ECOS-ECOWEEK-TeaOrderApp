import React from "react";

const OrderForm = ({ setTeaType, menu }) => {
    const handleTeaSelection = (event) => {
        setTeaType(event.target.value);
    };

    return (
        <div>
            <h2>Select Your Tea</h2>
            <form>
                {menu.teaTypes.map((tea, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name="tea"
                            value={tea}
                            onChange={handleTeaSelection}
                        />
                        {tea}
                    </label>
                ))}
            </form>
        </div>
    );
};

export default OrderForm;