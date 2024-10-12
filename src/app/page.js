import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Home Section */}
      <section class="home-section container">
        <h1 class="logo">FoodBridge</h1>
        <h2 class="subheading">Connecting restaurants to those in need.</h2>
        <div class="nav-buttons">
          <Link href="/customers">
            <button>Customers</button>
          </Link>
          <Link href="/restaurants">
            <button>Restaurants</button>
          </Link>
          <Link href="#about"></Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" class="about-section container">
        <h1>About Us</h1>

        <h2>Our Mission</h2>
        <p>
          At FoodBridge, we are on a mission to tackle one of America's most pressing issues: food waste. Did you know that
          nearly 40% of the food produced in the United States goes uneaten? This staggering amount of waste happens while
          millions of people struggle to access healthy meals. We believe it doesn’t have to be this way—and that’s where our
          organization comes in.
        </p>
        <p>
          Our mission is simple yet powerful: to connect restaurants with communities in need by offering unsold food, meals,
          and ingredients before they go to waste. Through our platform, restaurants can schedule free pick-up times for food
          that would otherwise be discarded. Instead of letting it go to landfills, they contribute to feeding those who need
          it most.
        </p>

        <h2>How It Works</h2>
        <p>
          We partner with local restaurants, bakeries, and cafes that share our vision of fighting food waste and supporting
          those facing food insecurity. These establishments list available food for pick-up on our platform, which users in
          need can access. It’s completely free for the recipients and provides an essential service: nourishing people while
          reducing waste.
        </p>
        <p>
          In return for their generosity, we showcase these food businesses on our page, offering them public recognition as
          key supporters in the fight against food waste and hunger. We celebrate their contributions, boosting their visibility
          and encouraging others to follow their lead.
        </p>

        <h2>Our Commitment to Charity</h2>
        <p>
          What sets us apart is our 100% charity-based model. We are driven by a passion for making an impact, not by profit. Our
          operations rely entirely on donations, sponsorships, and advertising partnerships. Every donation goes directly to
          expanding our reach, developing better technology to connect more businesses and people, and raising awareness of the
          food waste crisis.
        </p>
        <p>
          Together, with the help of our restaurant partners, sponsors, and caring communities, we aim to ensure that no good
          food goes to waste, and no one goes without a meal. Every meal we save is a meal that can fuel someone’s day, provide
          warmth, and create a stronger, more connected society.
        </p>
        <p>
          Join us in this fight to end food waste and hunger. Together, we can make a difference—one meal at a time.
        </p>
      </section>
    </div>
  );
}
