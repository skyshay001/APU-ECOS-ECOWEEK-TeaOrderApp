import React from "react";

const AddOns = ({ addOns, setAddOns }) => {
    const handleAddOnChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setAddOns([...addOns, value]);
        } else {
            setAddOns(addOns.filter((addOn) => addOn !== value));
        }
    };

    return (
        <div>
            <h2>Add-Ons</h2>
            <label>
                <input
                    type="checkbox"
                    value="More Boba"
                    onChange={handleAddOnChange}
                />
                More Boba
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Matcha Topping"
                    onChange={handleAddOnChange}
                />
                Matcha Topping
            </label>
        </div>
    );
};

export default AddOns;	