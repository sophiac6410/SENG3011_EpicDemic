
import NavbarComp from './components/Navbar'
import Home from './pages/home'
import Overview from './pages/Overview'
import Travel from './pages/Travel'
import Destination from './pages/Destination'
import Covid from './pages/Covid'
import Book from './pages/Book'

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
              <Route path="/destination" element={<Destination></Destination>}>
                <Route index element={<Overview></Overview>}></Route>
                <Route path="travel" element={<Travel></Travel>}></Route>
                <Route path="covid" element={<Covid></Covid>}></Route>
                <Route path="book" element={<Book></Book>}></Route>
              </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App
