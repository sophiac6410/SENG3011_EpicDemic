import { Outlet } from "react-router-dom"

function Destination() {
  return(
    <div>
      <h1>Destination</h1>
      <Outlet></Outlet>
    </div>
  )
}

export default Destination