import Link from 'next/link';
import './homePage.css';
import Navbar from '../app/navbar/navbar';

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Home Section */}
      <section className="home-section">
        <h1 className="logo">
          <span className="food-part">Food</span>
          <span className="bridge-part">Bridge.</span>
        </h1>
        <h2 className="subheading">Connecting restaurants to those in need.</h2>
        <div className="nav-buttons">
          <Link href="/customers"><button>Customers</button></Link>
          <Link href="/restaurants"><button>Restaurants</button></Link>
          <Link href="#about"></Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <h2>Our Mission</h2>
        <p>
          At FoodBridge, we are on a mission to tackle one of America's most pressing issues: food waste. Nearly 40% of the food produced in the United States goes uneaten, while millions struggle to access healthy meals. 
        </p>
        <p>
          Our platform connects restaurants with communities in need by offering unsold food, meals, and ingredients before they go to waste. Instead of letting food go to landfills, restaurants contribute to feeding those who need it most.
        </p>
        
        <h2>How It Works</h2>
        <p>
          We partner with local restaurants, bakeries, and cafes to fight food waste and support those facing food insecurity. Restaurants list available food for pick-up, which users can access for free.
        </p>

        <h2>Our Commitment to Charity</h2>
        <p>
          Our 100% charity-based model ensures that all donations go toward expanding our reach, developing better technology, and raising awareness of the food waste crisis. Together, we can ensure no food goes to waste.
        </p>
      </section>
    </div>
  );
}
