import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, set, remove } from "firebase/database";
import app from "./firebaseConfig";
import OrderForm from "./components/OrderForm";
import AddOns from "./components/AddOns";
import OrderDashboard from "./components/OrderDashboard";

function App() {
    const db = getDatabase(app);

    const [menu] = useState({
        teaTypes: ["Black Tea", "Green Tea", "Houjicha"],
        addOns: ["More Boba", "Matcha Topping"],
    });
    const [teaType, setTeaType] = useState("");
    const [addOns, setAddOns] = useState([]);
    const [orders, setOrders] = useState([]);

    // Fetch orders from Firebase
    useEffect(() => {
        const ordersRef = ref(db, "orders/");
        const unsubscribe = onValue(ordersRef, (snapshot) => {
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

        return () => unsubscribe();
    }, [db]);

    // Submit a new order to Firebase
    const submitOrder = () => {
        if (!teaType) {
            alert("Please select a tea type.");
            return;
        }
        const newOrder = {
            teaType,
            addOns,
            status: "Pending",
        };
        push(ref(db, "orders/"), newOrder)
            .then(() => {
                setTeaType("");
                setAddOns([]);
            })
            .catch((error) => {
                console.error("Error submitting order:", error);
            });
    };

    // Mark an order as served
    const markAsServed = (id) => {
        const order = orders.find((order) => order.id === id);
        if (order && order.status !== "Served") {
            const updatedOrder = { ...order, status: "Served" };
            set(ref(db, `orders/${id}`), updatedOrder).catch((error) => {
                console.error("Error marking order as served:", error);
            });
        }
    };

    // Delete an order
    const deleteOrder = (id) => {
        remove(ref(db, `orders/${id}`)).catch((error) => {
            console.error("Error deleting order:", error);
        });
    };

    return (
        <div>
            <h1>Tea Order App</h1>
            <OrderForm teaType={teaType} setTeaType={setTeaType} menu={menu} />
            <AddOns addOns={addOns} setAddOns={setAddOns} menu={menu} />
            <button onClick={submitOrder}>Submit Order</button>
            <OrderDashboard
                orders={orders}
                markAsServed={markAsServed}
                deleteOrder={deleteOrder}
            />
        </div>
    );
}

export default App;