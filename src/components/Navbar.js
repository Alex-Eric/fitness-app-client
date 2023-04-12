import { NavLink } from "react-router-dom"
function Navbar(){
    return(
    <nav>
        <NavLink to="/">Home  |  </NavLink>
        <NavLink to="/muscles">Muscles  |  </NavLink>
        <NavLink to="/exercises">Exercises  |  </NavLink>
        <NavLink to="/workouts">Workout</NavLink>
    </nav>
    )
}
export default Navbar