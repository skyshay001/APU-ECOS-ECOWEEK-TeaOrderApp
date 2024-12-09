import React from "react";

const AddOns = ({ addOns, setAddOns, menu }) => {
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
            {menu.addOns.map((addOn, index) => (
                <label key={index}>
                    <input
                        type="checkbox"
                        value={addOn}
                        onChange={handleAddOnChange}
                    />
                    {addOn}
                </label>
            ))}
        </div>
    );
};

export default AddOns;