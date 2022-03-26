
import NavbarComp from './components/Navbar'
import Home from './pages/home'
function App() {
    return(
        <div className="APP">
            <NavbarComp></NavbarComp>
            <div>
                <Home></Home>
            </div>
        </div>
    )
}

export default App