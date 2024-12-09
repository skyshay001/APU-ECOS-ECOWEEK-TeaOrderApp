import React from "react";

const AddOns = ({ addOns, setAddOns, menu }) => {
    const handleAddOnChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setAddOns([...addOns, value]);
        } else {
            setAddOns(addOns.filter((addOn) => addOn !== value));
        }
    };

    return (
        <div>
            <h2>Select Add-Ons</h2>
            {menu.addOns.map((addOn, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        id={`addon-${index}`}
                        value={addOn}
                        checked={addOns.includes(addOn)}
                        onChange={handleAddOnChange}
                    />
                    <label htmlFor={`addon-${index}`}>{addOn}</label>
                </div>
            ))}
        </div>
    );
};

export default AddOns;