// src/app/customers/dashboard/page.js
"use client";
import { useEffect, useState } from "react";
import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const db = getFirestore();

export default function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // Holds customer data (full name)
  const [inventory, setInventory] = useState([]); // Customer's inventory
  const [availableItems, setAvailableItems] = useState([]); // All restaurant items
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await Promise.all([
          fetchCustomerData(user.uid),
          fetchCustomerInventory(user.uid),
          fetchAvailableItems(),
        ]);
      } else {
        router.push("/customers/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch customer data to display full name
  const fetchCustomerData = async (customerId) => {
    const customerRef = doc(db, "users", customerId); // Adjusted to reference 'users' collection
    const customerDoc = await getDoc(customerRef);
    if (customerDoc.exists()) {
      setUserData(customerDoc.data()); // Store customer data, including full name
    }
  };

  // Fetch customer's inventory
  const fetchCustomerInventory = async (customerId) => {
    const customerRef = doc(db, "customers", customerId);
    const customerDoc = await getDoc(customerRef);
    if (customerDoc.exists()) {
      setInventory(customerDoc.data().inventory || []);
    }
  };

  // Fetch all available items from restaurants
  const fetchAvailableItems = async () => {
    const restaurantSnapshot = await getDocs(collection(db, "restaurants"));
    const items = [];
    restaurantSnapshot.forEach((doc) => {
      const data = doc.data();
      const restaurantName = data.establishmentName || "Unknown Restaurant";
      const address = data.address || "No Address Provided";
      data.inventory.forEach((item) => {
        items.push({
          ...item,
          restaurantName,
          address,
        });
      });
    });
    setAvailableItems(items);
  };

  // Pick an item from a restaurant
  const pickItem = async (restaurantId, item) => {
    const restaurantRef = doc(db, "restaurants", restaurantId);
    const customerRef = doc(db, "customers", user.uid);

    // Remove the item from restaurant's inventory
    await updateDoc(restaurantRef, {
      inventory: arrayRemove(item),
    });

    // Add the item to customer's inventory
    await updateDoc(customerRef, {
      inventory: arrayUnion(item),
    });

    fetchCustomerInventory(user.uid); // Refresh customer inventory
    fetchAvailableItems(); // Refresh available items
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData?.name || "Guest"}</h1>{" "}
      {/* Display the customer's full name */}
      <button onClick={handleLogout}>Logout</button>
      <h2>Your Inventory</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.itemId}>
            <img src={item.imageUrl} alt={item.name} width="100" />
            <p>{item.name}</p>
            <p>{item.pounds} lbs</p>
            <p>Expires on: {item.expirationDate}</p>
          </li>
        ))}
      </ul>
      <h2>Available Items from Restaurants</h2>
      <ul>
        {availableItems.map((item) => (
          <li key={item.itemId}>
            <h3>{item.restaurantName}</h3> {/* Restaurant name */}
            <p>Address: {item.address}</p> {/* Restaurant address */}
            <img src={item.imageUrl} alt={item.name} width="100" />
            <p>{item.name}</p>
            <p>{item.pounds} lbs</p>
            <p>Expires on: {item.expirationDate}</p>
            <button onClick={() => pickItem(item.restaurantId, item)}>
              Pick Item
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
