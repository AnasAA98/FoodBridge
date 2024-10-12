import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome Customers</h1>
      <div>
        <Link href="/customers/login">
          <button>Login</button>
        </Link>
        <Link href="/customers/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}
