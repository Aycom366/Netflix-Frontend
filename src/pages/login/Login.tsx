import React, { useState } from "react";
import instance from "../../utils/axiosInstance";
import "./login.scss";
import { useAppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../utils/PageWrapper";
import { motion } from "framer-motion";
import { buttonVariants } from "../../utils/framer";

const Login = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return alert("email or password is empty");
    }

    try {
      const { data } = await instance.post("/api/auth/login", formData);
      localStorage.setItem("userToken", data.data.token);
      setUser({
        email: data.data.email,
        userName: data.data.userName,
        profilePic: data.data.profilePic,
        isFirst: true,
      });
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.msg);
      //console.log(error.response.data.msg);
    }
  };

  return (
    <PageWrapper>
      <section className="login">
        <div className="top">
          <div className="wrapper">
            <div className="logo-container">
              <img
                src="https://img.search.brave.com/QKL5iIp3UEtzFJ6eLDT4pK7gmHssVNnR9quqZBSB-6A/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zZW5z/aWJseXNhcmEuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE0/LzA3L05ldGZsaXhf/TG9nb19QcmludF9G/b3VyQ29sb3JDTVlL/LnBuZw"
                alt="Netflix"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <form>
            <h1>Sign In</h1>
            <input
              name="email"
              type="email"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
            <input
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              type="password"
              placeholder="password"
            />
            <motion.button
              variants={buttonVariants}
              whileTap="whileTap"
              whileHover="whileHover"
              type="submit"
              onClick={(e: React.FormEvent) => handleSubmit(e)}
              className="loginButton"
            >
              Sign In
            </motion.button>

            <span>
              New to Netflix?{" "}
              <b>
                <span
                  style={{ cursor: "pointer" }}
                  role="button"
                  onClick={() => navigate("/register")}
                >
                  Sign up now.
                </span>
              </b>
            </span>
            <small>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <b>Learn more.</b>
            </small>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Login;
