"use client";
import { useState, useEffect } from "react";
import { auth } from "./../../../../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore();
const storage = getStorage();

export default function RestaurantDashboard() {
  const [user, setUser] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null); // Store restaurant data including establishment name
  const [inventory, setInventory] = useState([]); // Restaurant's inventory
  const [newItem, setNewItem] = useState({
    name: "",
    pounds: "",
    expirationDate: "",
    imageFile: null,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await ensureRestaurantDocumentExists(user.uid); // Ensure document exists
        fetchRestaurantData(user.uid); // Fetch restaurant data (including establishment name)
        fetchRestaurantInventory(user.uid); // Fetch the restaurant's inventory
      } else {
        router.push("/restaurants/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Ensure the restaurant document exists
  const ensureRestaurantDocumentExists = async (restaurantId) => {
    const restaurantRef = doc(db, "restaurants", restaurantId);
    const restaurantDoc = await getDoc(restaurantRef);

    if (!restaurantDoc.exists()) {
      // If the document does not exist, create it with an empty inventory
      await setDoc(restaurantRef, { inventory: [], establishmentName: "" });
    }
  };

  // Fetch restaurant data (including establishment name)
  const fetchRestaurantData = async (restaurantId) => {
    const restaurantRef = doc(db, "restaurants", restaurantId);
    const restaurantDoc = await getDoc(restaurantRef);
    if (restaurantDoc.exists()) {
      setRestaurantData(restaurantDoc.data()); // Store restaurant data, including establishment name
    }
  };

  // Fetch restaurant's inventory
  const fetchRestaurantInventory = async (restaurantId) => {
    const restaurantRef = doc(db, "restaurants", restaurantId);
    const restaurantDoc = await getDoc(restaurantRef);
    if (restaurantDoc.exists()) {
      setInventory(restaurantDoc.data().inventory);
    }
  };

  // Handle image upload to Firebase Storage
  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setNewItem((prevItem) => ({ ...prevItem, imageUrl: url }));
  };

  // Add a new item to the restaurant's inventory
  const handleAddItem = async (e) => {
    e.preventDefault();
    const restaurantRef = doc(db, "restaurants", user.uid);

    const item = {
      itemId: Math.random().toString(36).substring(2, 15),
      name: newItem.name,
      pounds: newItem.pounds,
      expirationDate: newItem.expirationDate,
      imageUrl: newItem.imageUrl,
    };

    await updateDoc(restaurantRef, {
      inventory: arrayUnion(item),
    });

    // Clear form and refresh inventory
    setNewItem({
      name: "",
      pounds: "",
      expirationDate: "",
      imageFile: null,
      imageUrl: "",
    });
    fetchRestaurantInventory(user.uid);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading || !restaurantData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {restaurantData.establishmentName}</h1> {/* Display establishment name */}
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

      <h2>Add New Inventory Item</h2>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Pounds (lb)"
          value={newItem.pounds}
          onChange={(e) => setNewItem((prev) => ({ ...prev, pounds: e.target.value }))}
        />
        <input
          type="date"
          value={newItem.expirationDate}
          onChange={(e) => setNewItem((prev) => ({ ...prev, expirationDate: e.target.value }))}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            handleImageUpload(file);
          }}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
