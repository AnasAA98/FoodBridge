import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to FoodBridge</h1>
      <div>
        <Link href="/customers">
          <button>Customers</button>
        </Link>
        <Link href="/restaurants">
          <button>Restaurants</button>
        </Link>
        <Link href="/about">
          <button>About</button>
        </Link>
      </div>
    </div>
  );
}