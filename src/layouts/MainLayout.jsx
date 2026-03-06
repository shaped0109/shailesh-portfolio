import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * Root layout wrapping all pages — Navbar + page content + Footer.
 * Light mode by default; dark: prefix activates dark mode colors.
 */
const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-light-base dark:bg-dark-base text-gray-900 dark:text-ink-primary font-body">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default MainLayout
