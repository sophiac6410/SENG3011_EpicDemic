
import NavbarComp from './components/Navbar'
import Home from './pages/home'
function App() {
    return(
        <div className="APP">
            <NavbarComp></NavbarComp>
            <div className='content p-3'>
                <Home></Home>
            </div>
        </div>
    )
}

export default App