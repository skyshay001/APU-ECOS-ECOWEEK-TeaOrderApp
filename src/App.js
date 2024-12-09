import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, set, remove } from "firebase/database";
import app from "./firebaseConfig";
import OrderForm from "./components/OrderForm";
import AddOns from "./components/AddOns";
import OrderSummary from "./components/OrderSummary";
import OrderDashboard from "./components/OrderDashboard";

function App() {
    const [menu, setMenu] = useState({
        teaTypes: ["Black Tea", "Green Tea", "Houjicha"],
        addOns: ["More Boba", "Matcha Topping"],
    });
    const [teaType, setTeaType] = useState("");
    const [addOns, setAddOns] = useState([]);
    const [orders, setOrders] = useState([]);
    const [journal, setJournal] = useState([]); // Logs order changes

    const db = getDatabase(app);

    // Save order to Firebase
    const saveOrderToDatabase = () => {
        const orderData = {
            teaType,
            addOns,
            timestamp: Date.now(),
        };
        push(ref(db, "orders/"), orderData)
            .then(() => {
                alert("Order submitted successfully!");
            })
            .catch((error) => {
                alert("Failed to submit order.");
                console.error("Error saving order:", error);
            });
    };

    // Fetch orders from Firebase
    const fetchOrders = () => {
        const ordersRef = ref(db, "orders/");
        onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const ordersArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setOrders(ordersArray);
            } else {
                setOrders([]);
            }
        });
    };

    // Add order to the journal
    const logChange = (changeType, order) => {
        setJournal((prevJournal) => [
            ...prevJournal,
            { changeType, order, timestamp: Date.now() },
        ]);
    };

    // Mark an order as served
    const markAsServed = (id) => {
        const orderToUpdate = orders.find((order) => order.id === id);
        if (orderToUpdate) {
            const updatedOrder = { ...orderToUpdate, status: "Served" };
            set(ref(db, `orders/${id}`), updatedOrder);
            logChange("Marked as Served", updatedOrder);
        }
    };

    // Delete an order
    const deleteOrder = (id) => {
        const orderToDelete = orders.find((order) => order.id === id);
        if (orderToDelete) {
            remove(ref(db, `orders/${id}`));
            logChange("Deleted", orderToDelete);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Tea Order App</h1>
            <OrderForm setTeaType={setTeaType} menu={menu} />
            <AddOns addOns={addOns} setAddOns={setAddOns} menu={menu} />
            <OrderSummary
                teaType={teaType}
                addOns={addOns}
                saveOrderToDatabase={saveOrderToDatabase}
            />
            <OrderDashboard
                orders={orders}
                markAsServed={markAsServed}
                deleteOrder={deleteOrder}
            />
            <div>
                <h2>Journal</h2>
                <ul>
                    {journal.map((entry, index) => (
                        <li key={index}>
                            {entry.changeType} - {entry.order.teaType} at{" "}
                            {new Date(entry.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;