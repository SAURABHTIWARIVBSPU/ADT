import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { useFilter } from "../../context/FilterContext"; // ✅ Fixed import path

import {
  useUser,
  UserButton,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import "../../styles/components/BookingHeader.css";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaHeart,
  FaSuitcase,
  FaComments,
  FaBell,
  FaGlobe,
  FaQuestionCircle,
  FaHandshake,
} from "react-icons/fa";

function BookingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { setActiveFilter } = useFilter();
  const { isSignedIn, user } = useUser();

  const tabToType = {
    Air: "Air Tour",
    Water: "Water Sports",
    Land: "Land Adventure",
  };

  return (
    <header className="booking-header">
      {/* Left: Logo */}
      <div className="booking-header-logo">
        <Link to="/">
          <img src="/logo.png" alt="Adventure Triangle Logo" />
        </Link>
      </div>

      {/* Center: Tabs */}
      <nav className="booking-header-nav">
        <div className="booking-nav-bar">
          {Object.keys(tabToType).map((tab) => (
            <button
              key={tab}
              className="booking-nav-item"
              onClick={() => setActiveFilter(tabToType[tab])}
            >
              <FaGlobe />
              <span>{tab}</span>
            </button>
          ))}
          <button
            className="booking-nav-item"
            onClick={() => setActiveFilter("All")}
          >
            <FaGlobe />
            <span>All</span>
          </button>
        </div>
      </nav>

      {/* Right: User Auth / Menu */}
      <div className="booking-header-profile">
        {isSignedIn ? (
          <>
            <UserButton />
            <button onClick={toggleMenu} className="booking-header-menu-btn">
              <HiOutlineMenu />
            </button>
            {menuOpen && (
              <div className="booking-header-dropdown">
                <ul className="booking-header-dropdown-list">
                  <li>
                    <Link to="/my-bookings">
                      <FaSuitcase /> My Bookings
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist">
                      <FaHeart /> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="/support">
                      <FaComments /> Support
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <FaHandshake /> Contact
                    </Link>
                  </li>
                  <li>
                    <SignOutButton />
                  </li>
                </ul>
                <p className="booking-header-user-email">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            )}
          </>
        ) : (
          <SignInButton>
            <button className="booking-header-signin-btn">
              <FaUserCircle />
            </button>
          </SignInButton>
        )}
      </div>
    </header>
  );
}

export default BookingHeader;
