import { Outlet } from 'react-router-dom'
import TopBar from './Component/NavBars/TopBar'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-800 text-white">
        <TopBar />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default App