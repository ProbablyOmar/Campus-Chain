import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div className="navBar">
        <NavLink exact to="/" className="navitems">
          Home
        </NavLink>
        <NavLink to="/profile" className="navitems">
          {" "}
          Profile
        </NavLink>
        <NavLink to="/myquestions" className="navitems">
          {" "}
          My Questions
        </NavLink>
        <NavLink to="/signin" className="navitems">
          Sign in
        </NavLink>
      </div>
    </nav>
  );
}
export default NavBar;
