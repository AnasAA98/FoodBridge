// src/app/customers/register/page.js
"use client";
import { useState } from "react";
import { auth } from "./../../../../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { useRouter } from "next/navigation";

const db = getFirestore(); // Firestore instance

export default function CustomerRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // New field for customer's name
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the customer info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name, // Store the user's name
        role: "customer" // Storing the role as 'customer'
      });

      // Redirect to the customer dashboard after registration
      router.push("/customers/dashboard");
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
      <h1>Customer Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Capture name input
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
