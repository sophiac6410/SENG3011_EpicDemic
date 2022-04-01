
import NavbarComp from './components/Navbar'
import Home from './pages/home'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";

function App() {
    return(
      <div>
        <NavbarComp></NavbarComp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>}>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App