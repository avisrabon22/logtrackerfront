import { Outlet } from 'react-router-dom'
import TopBar from './Component/NavBars/TopBar'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>
      <div className="flex-grow mt-16">
        <Outlet />
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default App