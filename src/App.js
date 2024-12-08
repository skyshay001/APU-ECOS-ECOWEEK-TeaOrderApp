import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";
import app from "./firebaseConfig";
import OrderForm from "./components/OrderForm";
import AddOns from "./components/AddOns";
import OrderSummary from "./components/OrderSummary";
import OrderDashboard from "./components/OrderDashboard";

function App() {
    const [teaType, setTeaType] = useState("");
    const [addOns, setAddOns] = useState([]);
    const [orders, setOrders] = useState([]); // State to store fetched orders

    // Function to save order to Firebase
    const saveOrderToDatabase = () => {
        const db = getDatabase(app);
        const orderData = {
            teaType,
            addOns,
            timestamp: Date.now(),
        };

        push(ref(db, "orders/"), orderData)
            .then(() => {
                console.log("Order saved:", orderData);
                alert("Order submitted successfully!");
            })
            .catch((error) => {
                console.error("Error saving order:", error);
                alert("Failed to submit order.");
            });
    };

    // Function to fetch orders from Firebase
    const fetchOrders = () => {
        const db = getDatabase(app);
        const ordersRef = ref(db, "orders/");
    
        onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const ordersArray = Object.values(data).map((order) => ({
                    ...order,
                    addOns: order.addOns || [], // Ensure addOns is always an array
                }));
                setOrders(ordersArray); // Update state with sanitized data
            } else {
                setOrders([]); // If no data, clear the orders array
            }
        });
    };    

    // Use useEffect to fetch orders when the app loads
    useEffect(() => {
        fetchOrders();
    }, []);

    // Function to test Firebase connection
    const testFirebaseConnection = () => {
        const db = getDatabase(app);
        push(ref(db, "orders/"), {
            teaType: "Test Tea",
            addOns: ["Test Add-On"],
            timestamp: Date.now(),
        })
            .then(() => {
                console.log("Test data pushed successfully!");
                alert("Test data pushed successfully!");
            })
            .catch((error) => {
                console.error("Error pushing test data:", error);
                alert("Failed to push test data.");
            });
    };

    return (
        <div>
            <h1>Tea Order App</h1>
            <OrderForm setTeaType={setTeaType} />
            <AddOns addOns={addOns} setAddOns={setAddOns} />
            <OrderSummary
                teaType={teaType}
                addOns={addOns}
                saveOrderToDatabase={saveOrderToDatabase}
            />
            <OrderDashboard orders={orders} /> {/* Add the dashboard to display orders */}
            <button onClick={testFirebaseConnection}>
                Test Firebase Connection
            </button>
        </div>
    );
}

export default App;