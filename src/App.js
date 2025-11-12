



import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useParams,
  Link,
} from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div id="home" className="container-one">
      <div className="welcome">
        <h2>Delightful Cakes, Delivered Fresh in Chennai</h2>
        <h2>Every bite brings a smile!</h2>
      </div>
      <div className="welcome-p">
        <p>
          From birthdays to weddings, SK Bakery crafts delicious moments with
          love. Our premium cakes are freshly baked and beautifully designed to
          make your celebrations sweeter than ever.
        </p>
        <br />
        <p>
          At SK Bakery, we believe that every moment deserves a sweet touch.
          From our signature cakes and creamy pastries to freshly baked breads
          and cookies, we pour love, passion, and craftsmanship into every
          creation. Indulge in the heavenly taste of homemade goodness — baked
          fresh every single day!
        </p>
        <br />
        <p>
          Freshly baked products daily <br />
          Locally sourced ingredients <br />
          Custom cakes made to order <br />
          Warm and friendly service that makes you feel right at home
        </p>
      </div>
    </div>
  );
}

function Menu({ items }) {
  const cakeItems = [
    "Chocolate Truffle Cake",
    "Red Velvet Cake",
    "Halloween Specials",
    "Wedding Cake",
    "Nutty Caramel Cake",
    "Eggless Redvelvet Oreo Cake",
    "Eggless Rose Pistachio Cake",
    "Eggless Fruit Blueberry Cake",
    "Eggless Hot Chocolate Cake",
  ];

  const quantityItems = [
    "Tropical Mango Tresleches",
    "Cold Chocolate Tresleches",
    "Shakes",
    "Pastries",
    "Sandwiches",
    "Chat Items",
  ];

  return (
    <div className="menu-section">
      <h1 className="menu-title">Explore Our Signature Creations</h1>
      <div className="menu-container">
        {items.map((product, index) => {
          const isCake = cakeItems.includes(product.title);
          const isQuantityItem = quantityItems.includes(product.title);

          let priceLabel = "";
          if (isCake) priceLabel = `₹${product.price} / 1 kg`;
          else if (isQuantityItem) priceLabel = `1 pc / ₹${product.price}`;
          else priceLabel = `₹${product.price}`;

          return (
            <div key={index} className="menu-card">
              <img src={product.src} alt={product.title} className="menu-image" />
              <div className="menu-info">
                <h3>{product.title}</h3>
                <p>{priceLabel}</p>
                <Link to={`/menu/${index}`} className="menu-btn-link">
                  <button className="menu-btn">View Details</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductDetails({ items }) {
  const { id } = useParams();
  const product = items[id];
  const [quantity, setQuantity] = useState("1");

  if (!product) return <h2 className="not-found">Product not found</h2>;

  const cakeItems = [
    "Chocolate Truffle Cake",
    "Red Velvet Cake",
    "Halloween Specials",
    "Wedding Cake",
    "Nutty Caramel Cake",
    "Eggless Redvelvet Oreo Cake",
    "Eggless Rose Pistachio Cake",
    "Eggless Fruit Blueberry Cake",
    "Eggless Hot Chocolate Cake",
  ];

  const quantityItems = [
    "Tropical Mango Tresleches",
    "Cold Chocolate Tresleches",
    "Shakes",
    "Pastries",
    "Sandwiches",
    "Chat Items",
  ];

  const ingredientsList = [
    "Flour, Butter, Cocoa, Cream, Sugar",
    "Cocoa, Red Velvet Mix, Cream Cheese, Butter, Vanilla",
    "Vanilla Base, Orange Frosting, Sprinkles",
    "Bread, Cheese, Vegetables, Sauces",
    "Flour, Sugar, Indian Spices, Butter",
    "Milk, Butter, Vanilla Essence, Cream",
    "Wheat, Spices, Tamarind, Potato",
    "Milk, Sugar, Flavor Syrups, Ice Cream",
    "Caramel, Nuts, Chocolate, Cream",
    "Mango Puree, Milk, Cream, Vanilla",
    "Chocolate, Milk, Whipped Cream",
    "Red Velvet, Oreo, Vanilla Cream",
    "Rose Essence, Pistachio, Cream",
    "Blueberry, Fruit Chunks, Cream",
    "Dark Chocolate, Milk, Butter, Cocoa",
  ];

  const isCake = cakeItems.includes(product.title);
  const isQuantityItem = quantityItems.includes(product.title);
  const ingredients = ingredientsList[id] || "Fresh ingredients and love ";

  const getPrice = () => {
    const base = product.price;
    if (isCake) {
      switch (quantity) {
        case "0.5": return `₹${Math.round(base * 0.6)}`;
        case "1": return `₹${base}`;
        case "2": return `₹${base * 2}`;
        default: return `₹${base}`;
      }
    } else if (isQuantityItem) {
      const q = parseInt(quantity);
      return `₹${base * q}`;
    } else {
      return `₹${base}`;
    }
  };

  const displayPrice = getPrice();

  return (
    <div className="product-details">
      <div className="product-card">
        <div className="image-section">
          <img src={product.src} alt={product.title} className="product-image" />
        </div>

        <div className="info-section">
          <h1>{product.title}</h1>
          <p className="price">{displayPrice}</p>

          <div className="quantity-section">
            <label>Select Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {isCake ? (
                <>
                  <option value="0.5">500 g</option>
                  <option value="1">1 kg</option>
                  <option value="2">2 kg</option>
                </>
              ) : isQuantityItem ? (
                <>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </>
              ) : (
                <option value="1">1</option>
              )}
            </select>
          </div>

          <div className="ingredients">
            <h3>Ingredients:</h3>
            <p>{ingredients}</p>
          </div>

          <p className="description">
            Enjoy the delightful taste of our <b>{product.title}</b>, freshly
            crafted with love at <b>SK Bakery</b>. Perfect for any occasion!
          </p>

          <div className="button-group">
            <Link to="/menu">
              <button className="back-btn">← Back to Menu</button>
            </Link>
            <a
              href={`https://wa.me/919876543210?text=Hi! I want to order ${product.title} (${displayPrice}, Quantity: ${quantity})`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="order-btn">🛒 Order Now</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact({ formData, errors, submitted, handleChange, handleSubmit }) {
  return (
    <div id="contact" className="container-three">
      <div className="content-three">
        <form className="contact-us" onSubmit={handleSubmit} noValidate>
          <div className="labels">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="labels">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              type="tel"
              name="mobile"
              placeholder="Enter Your Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>

          <div className="labels">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="labels">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              className="option-control"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option>Birthdays</option>
              <option>Anniversaries</option>
              <option>Weddings</option>
              <option>Other Events</option>
            </select>
            {errors.occasion && <p className="error">{errors.occasion}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>

          {submitted && (
            <p className="success-msg">
              Thank you! We’ll get in touch soon.
            </p>
          )}
        </form>

        <div className="add">
          <h2>Get in Touch With Us</h2>
          <p>
            Visit our cozy bakery at <b>123 Baker Street, Chennai – 600001</b>
            <br />
            Call us: <b>+91 98765 43210</b>
            <br />
            Or drop a sweet message: <b>hello@skbakery.com</b>
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    occasion: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const items = [
    { src: "https://liliyum.com/cdn/shop/products/Chocolate-Ganache-Cake-1_720x.jpg?v=1630922631", title: "Chocolate Truffle Cake", price: 799 },
    { src: "https://static.wixstatic.com/media/4729b9_f1467732dd324265851bac2e41cb736b~mv2.webp", title: "Red Velvet Cake", price: 899 },
    { src: "https://bkmedia.bakingo.com/web-of-horrors-halloween-theme-cake-them5443flav-A.jpg", title: "Halloween Specials", price: 999 },
    { src: "https://cdn.uengage.io/uploads/64261/image-594255-1759335731.jpeg", title: "Wedding Cake", price: 1299 },
    { src: "https://cdn.uengage.io/uploads/64261/image-975633-1754200351.jpeg", title: "Sandwiches", price: 179 },
    { src: "https://www.anytimecake.in/wp-content/uploads/2019/08/Blueberry-Pastries4-Pcs-300x237.jpg", title: "Pastries", price: 249 },
    { src: "https://thumbs.dreamstime.com/b/pani-puri-indian-chat-item-served-terracotta-bowls-plate-114919673.jpg", title: "Chat Items", price: 199 },
    { src: "https://www.indiafilings.com/learn/wp-content/uploads/2018/09/London-Shakes-Franchise.jpg", title: "Shakes", price: 179 },
    { src: "https://cdn.uengage.io/uploads/64261/image-946735-1759335731.jpeg", title: "Nutty Caramel Cake", price: 749 },
    { src: "https://cdn.uengage.io/uploads/64261/image-191928-1761823505.jpeg", title: "Tropical Mango Tresleches", price: 699 },
    { src: "https://cdn.uengage.io/uploads/64261/image-391739-1761824675.jpeg", title: "Cold Chocolate Tresleches", price: 699 },
    { src: "https://cdn.uengage.io/uploads/64261/image-999115-1759335731.jpeg", title: "Eggless Redvelvet Oreo Cake", price: 849 },
    { src: "https://cdn.uengage.io/uploads/64261/image-672375-1750868757.jpeg", title: "Eggless Rose Pistachio Cake", price: 899 },
    { src: "https://cdn.uengage.io/uploads/64261/image-951783-1759335730.jpeg", title: "Eggless Fruit Blueberry Cake", price: 899 },
    { src: "https://cdn.uengage.io/uploads/64261/image-794679-1759336764.jpeg", title: "Eggless Hot Chocolate Cake", price: 849 },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.occasion) newErrors.occasion = "Please select an occasion";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitted(true);
    alert(
      `Form Submitted Successfully!\n\nName: ${formData.name}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\nOccasion: ${formData.occasion}`
    );

    setFormData({
      name: "",
      mobile: "",
      email: "",
      occasion: "",
    });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Router>
      <div className="App">
        <header className="top">
          <div className="h1">
            <h1>SK Bakery</h1>
          </div>

          <nav className="nav">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu items={items} />} />
            <Route path="/menu/:id" element={<ProductDetails items={items} />} />
            <Route
              path="/contact"
              element={
                <Contact
                  formData={formData}
                  errors={errors}
                  submitted={submitted}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              }
            />
          </Routes>
        </main>

        <footer className="bottom">
          <p>© 2025 SK Bakery. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
