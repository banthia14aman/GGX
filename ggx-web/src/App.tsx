import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { BottomTabs, CartDrawer, Footer, KillFeed, Toast, TopBar } from './components'
import { StoreProvider } from './store'
import Home from './pages/Home'
import Market from './pages/Market'
import ItemPage from './pages/Item'
import Checkout from './pages/Checkout'
import OrderPage from './pages/Order'
import { Arena, Tournament } from './pages/Arena'
import Squad from './pages/Squad'
import Me from './pages/Me'
import Sell from './pages/Sell'
import SkinLab from './pages/SkinLab'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Remount per item so buy/rent state resets when jumping between listings
function ItemRoute() {
  const { id } = useParams()
  return <ItemPage key={id} />
}

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <div className="display text-[10rem] text-red glow-text">404</div>
      <p className="text-lg">Respawn point not found.</p>
      <Link to="/" className="btn btn-red mt-6">Back to base</Link>
    </div>
  )
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollTop />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-red focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>
        <TopBar onCart={() => setCartOpen(true)} />
        <KillFeed />
        <main id="main" className="min-h-[60vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/item/:id" element={<ItemRoute />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/arena" element={<Arena />} />
            <Route path="/arena/:id" element={<Tournament />} />
            <Route path="/squad" element={<Squad />} />
            <Route path="/me" element={<Me />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/skin-lab" element={<SkinLab />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BottomTabs />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        <Toast />
      </BrowserRouter>
    </StoreProvider>
  )
}
