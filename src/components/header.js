import profilePic from "../OLI SMOL.jpeg";
import { NavLink } from "react-router-dom";

function Header({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <div className="Header">
        <span id="title">Campus-Chain</span>
        <span>
          <input className="search" placeholder="Search posts"></input>
        </span>
        <img
          src={profilePic}
          alt="Profile"
          className="profile-pic"
          height={50}
          width={50}
        ></img>
        <span id="profile">
          OliverTheGreat <br />
          <span className="balance">
            <img
              src="../melon-icon.png"
              alt="melons"
              width="15px"
              height="15px"
            ></img>
            855{" "}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="Header">
      <NavLink to="/" id="title">
        Campus-Chain
      </NavLink>
      <span>
        <input className="search" placeholder="Search posts"></input>
      </span>
      <NavLink to="/signin" className=" signInButton">
        Sign In
      </NavLink>
    </div>
  );
}

export default Header;
