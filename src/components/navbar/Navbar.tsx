import "./navbar.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { setUser, user } = useAppContext();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //handle window scroll
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogOut = async () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/login");
  };

  const handleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <nav className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://img.search.brave.com/QKL5iIp3UEtzFJ6eLDT4pK7gmHssVNnR9quqZBSB-6A/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zZW5z/aWJseXNhcmEuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE0/LzA3L05ldGZsaXhf/TG9nb19QcmludF9G/b3VyQ29sb3JDTVlL/LnBuZw"
            alt="Netflix"
          />
          {(isNavOpen || innerWidth > 500) && (
            <motion.div
              initial={{
                y: -100,
                opacity: 0,
                visibility: "hidden",
              }}
              animate={{
                y: 0,
                opacity: 1,
                visibility: "visible",
                transition: { delay: 0.5 },
              }}
              className="left-container"
            >
              <Link to="/">HomePage</Link>
              <Link to="/series">Series</Link>
              <Link to="/movies">Movies</Link>
            </motion.div>
          )}
        </div>
        <div className="right">
          <AiOutlineSearch className="icon" />
          <span style={{ marginRight: "10px" }}>{user.userName}</span>
          <div className="profile">
            <img
              src="https://image.shutterstock.com/image-vector/person-vector-icon-on-white-600w-1639832836.jpg"
              alt="MyPics"
            />
            <div className="options">
              <span>Settings</span>
              <span role={"button"} onClick={handleLogOut}>
                Logout
              </span>
            </div>
          </div>
          <div onClick={handleNav} className="harmburger">
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
      <div
        className={`overlay ${isNavOpen && "show"}`}
        onClick={() => setIsNavOpen(false)}
      ></div>
    </nav>
  );
};

export default Navbar;
