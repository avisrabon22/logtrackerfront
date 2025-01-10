import { NavLink } from 'react-router-dom';
const TopBar=()=>{

    return(
        <div className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">IIMI Log Tracker</div>
                <nav className="flex space-x-4">
                    <NavLink to="/" className="text-gray-300 hover:text-white" activeClassName="text-white">Home</NavLink>
                    <NavLink to="/about" className="text-gray-300 hover:text-white" activeClassName="text-white">About</NavLink>
                    <NavLink to="/contact" className="text-gray-300 hover:text-white" activeClassName="text-white">Contact</NavLink>
                </nav>
            </div>
        </div>
    )
}
export default TopBar