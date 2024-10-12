// src/app/restaurants/register/page.js
"use client";
import { useState } from "react";
import { auth } from "./../../../../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { useRouter } from "next/navigation";

const db = getFirestore(); // Firestore instance

export default function RestaurantRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [establishmentName, setEstablishmentName] = useState(""); // Field for restaurant's name
  const [address, setAddress] = useState(""); // New field for restaurant address
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the restaurant info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        establishmentName: establishmentName, // Store the restaurant's name
        address: address, // Store the restaurant's address
        role: "restaurant" // Storing the role as 'restaurant'
      });

      // Redirect to the restaurant dashboard after registration
      router.push("/restaurants/dashboard");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("This email is already registered. Please log in instead.");
      } else {
        console.error("Registration Error:", error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>Restaurant Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Establishment Name"
          value={establishmentName}
          onChange={(e) => setEstablishmentName(e.target.value)} // Capture establishment name
          required
        />
        <input
          type="text"
          placeholder="Full Address" // New address field
          value={address}
          onChange={(e) => setAddress(e.target.value)} // Capture address
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
