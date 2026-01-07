import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 bg-gray-50">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout

