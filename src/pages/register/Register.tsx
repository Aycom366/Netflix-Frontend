import React, { useRef, useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../utils/PageWrapper";
import { motion } from "framer-motion";
import { buttonVariants } from "../../utils/framer";
import instance from "../../utils/axiosInstance";
import { useAppContext } from "../../AppContext";

const Register = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleStart = () => {
    setEmail(emailRef.current?.value!);
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordRef.current?.value || !userNameRef.current?.value)
      return alert("Password is empty");

    try {
      const { data } = await instance.post("/api/auth/register", {
        userName: userNameRef.current?.value,
        email: email,
        password: passwordRef.current?.value,
      });
      localStorage.setItem("userToken", data.data.token);
      setUser({
        email: data.data.email,
        userName: data.data.userName,
        profilePic: data.data.profilePic,
      });
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.msg);
    }
  };

  return (
    <PageWrapper>
      <section className="register">
        <div className="top">
          <div className="wrapper">
            <div
              onClick={() => window.location.reload()}
              className="logo-container"
            >
              <img
                src="https://img.search.brave.com/QKL5iIp3UEtzFJ6eLDT4pK7gmHssVNnR9quqZBSB-6A/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zZW5z/aWJseXNhcmEuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE0/LzA3L05ldGZsaXhf/TG9nb19QcmludF9G/b3VyQ29sb3JDTVlL/LnBuZw"
                alt="Netflix"
              />
            </div>

            <motion.button
              variants={buttonVariants}
              whileHover="whileHover"
              whileTap="whileTap"
              onClick={() => navigate("/login")}
              className="loginButton"
            >
              Sign In
            </motion.button>
          </div>
        </div>
        <div className="container">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          {!email ? (
            <div className="input">
              <input ref={emailRef} type="email" placeholder="Email address" />
              <motion.button
                variants={buttonVariants}
                whileHover="whileHover"
                whileTap="whileTap"
                onClick={handleStart}
                className="registerButton"
              >
                Get Started
              </motion.button>
            </div>
          ) : (
            <form className="input">
              <input ref={userNameRef} type="text" placeholder="Username" />
              <input ref={passwordRef} type="password" placeholder="Password" />
              <motion.button
                variants={buttonVariants}
                whileTap="whileTap"
                whileHover="whileHover"
                onClick={(e: React.FormEvent) => handleFinish(e)}
                className="registerButton"
              >
                Start
              </motion.button>
            </form>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Register;
