import { Outlet } from 'react-router-dom'
import TopBar from './Component/NavBars/TopBar'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-800 text-white">
        <TopBar />
      </div>
      <h1 className="text-4xl font-bold text-center my-8">Welcome To IIMI</h1>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  )
}

export default App