import Link from "next/link";
import Navbar from '../navbar/navbar';



export default function Home() {
  return (
    <div>
      <Navbar />  { }
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
