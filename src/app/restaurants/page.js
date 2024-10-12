import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Restaurants</h1>
      <div>
        <Link href="/restaurants/login">
          <button>Login</button>
        </Link>
        <Link href="/restaurants/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}
