import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { categories, products } from './data/products.js'

const WHATSAPP_NUMBER = '27000000000'
const money = (amount) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(amount)

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('ncanees-cart') || '[]')
    return Array.isArray(saved) ? saved : []
  } catch (error) {
    console.error('Could not read the saved cart:', error)
    return []
  }
}

function App() {
  const [cart, setCart] = useState(readCart)

  useEffect(() => {
    localStorage.setItem('ncanees-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      return existing
        ? items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          )
        : [...items, { ...product, quantity }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setCart((items) =>
      quantity < 1
        ? items.filter((item) => item.id !== id)
        : items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    )
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="site-shell">
      <div className="announcement">A little sweetness goes a long way <span>♡</span> Free delivery on orders over R350</div>
      <Header cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/product/:productId" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function Header({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="nav-wrap">
        <Link to="/" className="brand" aria-label="NCANEE'S CANDY SHOP home" onClick={closeMenu}>
          <span className="brand-mark"><span>n</span><i>✦</i></span>
          <span className="brand-name">NCANEE'S<span>CANDY SHOP</span></span>
        </Link>
        <button
          className="icon-button mobile-menu-button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
          <NavLink to="/about" onClick={closeMenu}>Our story</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </nav>
        <Link to="/cart" className="cart-link" aria-label={`Shopping bag, ${cartCount} items`}>
          <ShoppingBag size={19} strokeWidth={1.8} />
          <span className="cart-link-label">Your bag</span>
          <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </header>
  )
}

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className={`product-photo ${product.background}`}>
        <img src={product.image} alt={product.imageAlt} loading="lazy" />
        <span className="product-badge">{product.badge}</span>
        <span className="quick-view">Take a peek <ArrowRight size={14} /></span>
      </Link>
      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>
          <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        </div>
        <span className="product-price">{money(product.price)}</span>
      </div>
      <button className="add-button" onClick={() => addToCart(product)}>
        <Plus size={16} /> Add to bag
      </button>
    </article>
  )
}

function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="section-title">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      {action}
    </div>
  )
}

function Home({ addToCart }) {
  const featured = products.slice(0, 4)
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow"><Sparkles size={14} /> A little paradise for sweet tooths</span>
          <h1>Sweet tooth?<br /><span>This way!</span></h1>
          <p>Gummy bears, swirly pops, chocolatey bites and all your favourite sweet things, ready to make your day.</p>
          <div className="hero-actions">
            <Link to="/shop" className="button button-dark">Shop all treats <ArrowRight size={17} /></Link>
            <a className="text-link" href="#our-favourites">Meet the favourites <ArrowDown size={15} /></a>
          </div>
          <div className="hero-note"><span className="avatar-stack"><i>♡</i><i>✦</i><i>☺</i></span><span>Made for sharing<br /><b>and keeping all to yourself</b></span></div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <span className="floating-sparkle sparkle-one">✳</span><span className="floating-sparkle sparkle-two">✦</span>
          <span className="hero-sticker">HEY<br />SWEET<br /><b>TOOTH!</b></span>
          <img
            className="hero-image"
            src={products[0].image}
            alt="A bright, close-up rainbow of chewy gummy bears"
          />
          <div className="hero-image-caption"><span>your happy place</span><Heart size={17} fill="currentColor" /></div>
        </div>
        <span className="hero-decoration deco-dot-one" /><span className="hero-decoration deco-dot-two" />
      </section>

      <section className="benefits" aria-label="Our promises">
        <div><span>♡</span><p>Thoughtfully picked<br /><b>the good stuff only</b></p></div>
        <div><span>✦</span><p>Little gifts, big joy<br /><b>made to make someone smile</b></p></div>
        <div><span>↗</span><p>Made for sharing<br /><b>or a treat-yourself moment</b></p></div>
      </section>

      <section className="section container" id="our-favourites">
        <SectionTitle eyebrow="The sweet-tooth hall of fame" title="The good stuff. All the colours." action={<Link className="text-link" to="/shop">See all treats <ArrowRight size={15} /></Link>} />
        <ProductGrid products={featured} addToCart={addToCart} />
      </section>

      <section className="offer-banner">
        <div className="offer-spark">✳</div>
        <div><span className="eyebrow">A little something extra</span><h2>Sweeten someone's day.</h2><p>Thoughtful treats for birthdays, just-because days and all the little celebrations.</p></div>
        <Link to="/shop" className="button button-light">Find a sweet gift <ArrowRight size={16} /></Link>
        <span className="offer-doodle">♡</span>
      </section>

      <section className="section container testimonial">
        <span className="eyebrow">Kind words, sweeter company</span>
        <div className="quote-stars">★★★★★</div>
        <blockquote>“Every box feels like a little celebration. The treats are lovely and the thoughtful details made my day.”</blockquote>
        <p className="quote-author">A happy sweet-tooth <span>· Demo testimonial</span></p>
      </section>
      <DemoNote />
    </>
  )
}

function ProductGrid({ products: items, addToCart }) {
  return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div>
}

function Shop({ addToCart }) {
  const [category, setCategory] = useState('All treats')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All treats' || product.category === category
    const matchesSearch = `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query.toLowerCase().trim())
    return matchesCategory && matchesSearch
  }), [category, query])

  return (
    <section className="shop-page container">
      <div className="page-heading">
        <span className="eyebrow">The sweet shop</span><h1>Dreams of a <span>sweet tooth.</span></h1>
        <p>Gummy, chocolatey, fruity or fluffy? Your next favourite is waiting in our colourful candy collection.</p>
      </div>
      <label className="search-box"><Search size={19} /><span className="sr-only">Search treats</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your sweet thing..." /></label>
      <div className="filter-row" aria-label="Filter by category">
        <div className="filter-buttons">{categories.map((item) => (
          <button key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
        ))}</div>
        <span className="results-count">{filtered.length} {filtered.length === 1 ? 'sweet thing' : 'sweet things'}</span>
      </div>
      {filtered.length ? <ProductGrid products={filtered} addToCart={addToCart} /> : <div className="empty-state"><span>♡</span><h2>No sweet matches just yet</h2><p>Try a different search or choose another category.</p><button className="button button-dark" onClick={() => { setQuery(''); setCategory('All treats') }}>Show me all treats</button></div>}
      <DemoNote />
    </section>
  )
}

function ProductDetails({ addToCart }) {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)
  const [quantity, setQuantity] = useState(1)
  if (!product) return <NotFound />
  return (
    <section className="detail-page container">
      <Link to="/shop" className="back-link"><ArrowLeft size={16} /> Back to all treats</Link>
      <div className="detail-layout">
        <div className={`detail-image ${product.background}`}><img src={product.image} alt={product.imageAlt} /></div>
        <div className="detail-info"><span className="eyebrow">{product.category} · {product.badge}</span><h1>{product.name}</h1>
          <p className="detail-price">{money(product.price)}</p><p className="detail-description">{product.description}</p>
          <p className="demo-caption">Sample product · Demo pricing</p>
          <div className="detail-purchase"><div className="quantity-control" aria-label="Choose quantity">
            <button aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button>
            <span aria-live="polite">{quantity}</span>
            <button aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus size={15} /></button>
          </div><button className="button button-dark" onClick={() => addToCart(product, quantity)}><ShoppingBag size={17} /> Add {quantity} to bag</button></div>
          <div className="detail-promise"><Check size={16} /> A sweet little pick-me-up, picked with care.</div>
        </div>
      </div>
      <div className="related-products"><SectionTitle eyebrow="Keep the happy going" title="A few more sweet things" /><ProductGrid products={products.filter((item) => item.id !== product.id).slice(0, 3)} addToCart={addToCart} /></div>
    </section>
  )
}

function Cart({ cart, updateQuantity }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <section className="cart-page container">
      <div className="page-heading"><span className="eyebrow">Your little collection</span><h1>Your <span>sweet bag.</span></h1></div>
      {!cart.length ? <div className="empty-state"><span>♡</span><h2>Your bag is waiting for a little happy</h2><p>There are lots of lovely things to discover.</p><Link className="button button-dark" to="/shop">Explore the shop <ArrowRight size={16} /></Link></div> :
        <div className="cart-layout"><div className="cart-items">{cart.map((item) => (
          <article className="cart-item" key={item.id}>
            <Link to={`/product/${item.id}`} className={`cart-thumb ${item.background}`}><img src={item.image} alt={item.imageAlt} /></Link>
            <div className="cart-item-info"><span className="product-category">{item.category}</span><Link to={`/product/${item.id}`} className="product-name">{item.name}</Link><span className="cart-item-price">{money(item.price)}</span>
              <div className="quantity-control small"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={13} /></button></div>
            </div><span className="line-total">{money(item.price * item.quantity)}</span>
            <button className="remove-button" aria-label={`Remove ${item.name}`} onClick={() => updateQuantity(item.id, 0)}><Trash2 size={17} /></button>
          </article>
        ))}<Link to="/shop" className="back-link continue-link"><ArrowLeft size={15} /> Keep browsing</Link></div>
          <aside className="order-card"><h2>A happy little total</h2><div className="summary-line"><span>Subtotal</span><b>{money(subtotal)}</b></div><div className="summary-line"><span>Delivery</span><span>Calculated at checkout</span></div><div className="summary-total"><span>Total</span><b>{money(subtotal)}</b></div><p className="demo-caption">Demo total · Delivery may vary.</p><Link className="button button-dark checkout-button" to="/checkout">Continue to checkout <ArrowRight size={16} /></Link></aside>
        </div>}
    </section>
  )
}

function Checkout({ cart }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [submitted, setSubmitted] = useState(false)
  if (!cart.length && !submitted) return <section className="container checkout-page"><div className="empty-state"><span>♡</span><h2>Your bag is empty</h2><p>Add something sweet before heading to checkout.</p><Link className="button button-dark" to="/shop">Browse the treats</Link></div></section>
  if (submitted) return <section className="container checkout-page"><div className="success-card"><span className="success-icon"><Check size={28} /></span><span className="eyebrow">Thanks for stopping by</span><h1>Your demo order is ready.</h1><p>This was a demonstration only. No order was sent and no payment was taken.</p><Link to="/shop" className="button button-dark">Back to the sweet shop</Link></div></section>
  return (
    <section className="checkout-page container">
      <div className="page-heading"><span className="eyebrow">Almost at the happy part</span><h1>Checkout <span>demo.</span></h1><p>Fill in your details to preview the order experience.</p></div>
      <div className="checkout-layout"><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
        <h2>Your details</h2><div className="form-grid">
          <label>Full name<input required autoComplete="name" placeholder="Your name" /></label>
          <label>Email address<input type="email" required autoComplete="email" placeholder="you@example.com" /></label>
          <label>Phone number<input type="tel" required autoComplete="tel" pattern="[+0-9() -]{7,}" placeholder="+27 00 000 0000" /></label>
          <label className="full-field">Delivery address<textarea required autoComplete="street-address" rows="3" placeholder="Street, suburb, city and postal code" /></label>
        </div>
        <div className="payment-note"><span>♡</span><p><b>Just so you know</b><br />This checkout is a demo. No payment is processed, and no real order will be placed.</p></div>
        <button type="submit" className="button button-dark">Place demo order <ArrowRight size={16} /></button>
      </form><aside className="order-card"><h2>In your sweet bag</h2>{cart.map((item) => <div className="checkout-item" key={item.id}><span>{item.name} × {item.quantity}</span><b>{money(item.price * item.quantity)}</b></div>)}<div className="summary-total"><span>Demo total</span><b>{money(subtotal)}</b></div><p className="demo-caption">Sample products and prices</p></aside></div>
    </section>
  )
}

function About() {
  return (
    <section className="about-page">
      <div className="about-hero container"><span className="eyebrow">A little story, a lot of heart</span><h1>Happiness is <span>always in season.</span></h1><p>NCANEE'S CANDY SHOP is a little corner of the internet dedicated to life's sweetest moments.</p>
        <div className="about-photo"><img src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=1400&q=85" alt="A joyful jumble of colourful gummy bears" loading="lazy" /></div>
      </div>
      <div className="story-block container"><div><span className="eyebrow">Why we do what we do</span><h2>It's never just a sweet.</h2></div><div><p>It's the little surprise on a long day. The shared treat after a big win. The tiny gift that says “I thought of you.” That's the feeling we want to put in every bag.</p><p>NCANEE'S CANDY SHOP is a demo brand built around a simple idea: life's everyday moments deserve a little extra sweetness.</p></div></div>
      <div className="mission-card container"><span>✳</span><h2>Our sweet little mission</h2><p>To make finding a thoughtful, joyful treat feel just as lovely as giving one.</p><Link to="/shop" className="button button-dark">Find your happy <ArrowRight size={16} /></Link></div>
      <DemoNote />
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi NCANEE'S CANDY SHOP! I'd love to know more about your treats.")}`
  return (
    <section className="contact-page container">
      <div className="page-heading"><span className="eyebrow">We'd love to hear from you</span><h1>Say a little <span>hello.</span></h1><p>A question, a kind word or a sweet idea? Drop us a note.</p></div>
      <div className="contact-layout"><div className="contact-card">
        {sent ? <div className="inline-success"><Check size={20} /><h2>Thanks for your note!</h2><p>This demo form doesn't send messages yet, but we're glad you stopped by.</p><button className="text-link" onClick={() => setSent(false)}>Send another note</button></div> :
          <form onSubmit={(event) => { event.preventDefault(); setSent(true) }}><label>Your name<input required autoComplete="name" placeholder="What should we call you?" /></label><label>Email address<input type="email" required autoComplete="email" placeholder="you@example.com" /></label><label>Your message<textarea required rows="5" placeholder="Tell us what's on your mind..." /></label><button className="button button-dark" type="submit">Send a little note <ArrowRight size={16} /></button></form>}
      </div><aside className="contact-aside"><span className="contact-spark">✳</span><h2>More of the happy</h2><p>Our social links are ready for your shop's real profiles before you launch.</p><a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={18} /> Find us on Instagram <ArrowRight size={15} /></a><a className="social-link" href={whatsappHref} target="_blank" rel="noreferrer"><span className="whatsapp-icon">◉</span> Chat with us on WhatsApp <ArrowRight size={15} /></a><p className="demo-caption">Update the placeholder WhatsApp number in <code>src/App.jsx</code>.</p></aside></div>
      <DemoNote />
    </section>
  )
}

function DemoNote() {
  return <p className="demo-site-note">A joyful little demo shop · Products, prices, and customer reviews are sample content.</p>
}

function NotFound() {
  return <section className="container not-found"><span className="eyebrow">A tiny detour</span><h1>This sweet thing wandered off.</h1><p>Let's take you back to something lovely.</p><Link to="/shop" className="button button-dark">Visit the sweet shop <ArrowRight size={16} /></Link></section>
}

function Footer() {
  return (
    <footer className="footer"><div className="footer-main container">
      <div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark"><span>n</span><i>✦</i></span><span className="brand-name">NCANEE'S<span>CANDY SHOP</span></span></Link><p>A little happy, delivered one sweet thing at a time.</p></div>
      <div className="footer-links"><div><span className="footer-label">Have a look</span><Link to="/shop">Shop all treats</Link><Link to="/about">Our story</Link></div><div><span className="footer-label">Here to help</span><Link to="/contact">Contact us</Link><Link to="/cart">Your sweet bag</Link></div></div>
      <div className="footer-signoff"><span>Made with a little extra <Heart size={15} fill="currentColor" /></span><p>and a whole lot of sweetness.</p></div>
    </div><div className="footer-bottom container"><span>© {new Date().getFullYear()} NCANEE'S CANDY SHOP</span><span>Demo store · Prices shown in South African Rand</span></div></footer>
  )
}

export default App
