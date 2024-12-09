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
    const [journal, setJournal] = useState([]);

    // Log changes to the journal
    const logChange = (action, order) => {
        const journalEntry = {
            action,
            order,
            timestamp: new Date().toISOString(),
        };
        setJournal((prevJournal) => [...prevJournal, journalEntry]);
    };

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

    const markAsServed = (id) => {
        const order = orders.find((order) => order.id === id);
        if (order && order.status !== "Served") {
            const updatedOrder = { ...order, status: "Served" };
            set(ref(db, `orders/${id}`), updatedOrder)
                .then(() => {
                    logChange("Marked as Served", updatedOrder);
                })
                .catch((error) => {
                    console.error("Error marking order as served:", error);
                });
        }
    };

    const deleteOrder = (id) => {
        const order = orders.find((order) => order.id === id);
        if (order) {
            remove(ref(db, `orders/${id}`))
                .then(() => {
                    logChange("Deleted", order);
                })
                .catch((error) => {
                    console.error("Error deleting order:", error);
                });
        }
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
            <div>
                <h2>Journal</h2>
                {journal.length === 0 ? (
                    <p>No actions logged yet.</p>
                ) : (
                    <ul>
                        {journal.map((entry, index) => (
                            <li key={index}>
                                {entry.action} - {entry.order.teaType} at{" "}
                                {new Date(entry.timestamp).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;