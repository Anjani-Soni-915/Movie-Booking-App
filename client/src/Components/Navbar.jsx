import React, { useState, useEffect } from "react";
import Logo from "/spotLyte.jpg";
import Search from "./Search";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

function Navbar() {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);

  const toggleLocationDropdown = () => {
    setShowLocationDropdown((prev) => !prev);
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
    setShowLocationDropdown(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const openRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const openLoginForm = () => {
    setShowLoginForm(true);
    setShowRegistrationForm(false);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleRegistrationSuccess = (responseData) => {
    if (
      responseData &&
      responseData.data &&
      responseData.data.id &&
      responseData.data.name
    ) {
      const { id, name, email, phoneNumber } = responseData.data;
      const token = responseData.token;

      localStorage.setItem(
        "user",
        JSON.stringify({ id, name, email, phoneNumber })
      );
      localStorage.setItem("token", token);

      setUser({ id, name, email, phoneNumber });

      setShowRegistrationForm(false);
    } else {
      console.error("Unexpected responseData format:", responseData);
    }
  };

  const handleLoginSuccess = (responseData) => {
    if (responseData && responseData.id && responseData.name) {
      const { id, name, email, googleId } = responseData;
      const token = responseData.token;

      // localStorage.setItem('user', JSON.stringify({ id, name, email, googleId }));
      // localStorage.setItem('token', token);

      setUser({ id, name, email, googleId });

      setShowRegistrationForm(false);
    } else {
      console.error("Unexpected responseData format:", responseData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setShowProfileDropdown(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">
            <img src={Logo} alt="Book My Show Logo" />
          </a>
        </div>
        <Search onSearch={handleSearch} />
        <div className="navbar-account">
          <div className="location-selector" onClick={toggleLocationDropdown}>
            <a href="#" className="location-link">
              📍Location
            </a>

            {showLocationDropdown && (
              <ul className="dropdown">
                <li>
                  <a href="#">Indore</a>
                </li>
                <li>
                  <a href="#">Bhopal</a>
                </li>
                <li>
                  <a href="#">Jabalpur</a>
                </li>
                <li>
                  <a href="#">Ujjain</a>
                </li>
              </ul>
            )}
          </div>
          <div className="login-signup">
            {user ? (
              <div className="profile">
                <span onClick={toggleProfileDropdown}>👤 {user.name}</span>
                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    <ul>
                      <li>
                        <a href="/bookingDetails">🔖Bookings</a>
                      </li>
                      <li>
                        <a href="/help">🙂‍↔️Help</a>
                      </li>
                      <li>
                        <button id="logout" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button id="signup" onClick={openRegistrationForm}>
                Sign Up
              </button>
            )}
          </div>
        </div>
      </nav>
      <nav>
        <div className="links">
          <ul className="navbar-links">
            <li>
              <a href="/movies">Movies</a>
            </li>
            <li>
              <a href="/plays">Plays</a>
            </li>
            <li>
              <a href="/movies">Events</a>
            </li>
            <li>
              <a href="/plays">Streams</a>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
          <ul className="nav-links">
            <li>
              <a href="#">Offers</a>
            </li>
            <li>
              <a href="#">Gift Cards</a>
            </li>
          </ul>
        </div>
      </nav>

      <RegistrationForm
        show={showRegistrationForm}
        handleClose={closeRegistrationForm}
        onRegistrationSuccess={handleRegistrationSuccess}
        onLoginSuccess={handleLoginSuccess}
        openLoginForm={openLoginForm}
      />

      <LoginForm
        show={showLoginForm}
        handleClose={closeLoginForm}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default Navbar;
