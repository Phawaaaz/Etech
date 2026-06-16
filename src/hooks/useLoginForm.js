import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useLoginForm(onSubmit) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");

  const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isEmailValid = validateEmailFormat(loginData.email);
  const isFormComplete =
    loginData.email.trim() !== "" && loginData.password.trim() !== "";
  const isFormValid = isFormComplete && isEmailValid;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (value.trim() === "" || validateEmailFormat(value)) {
        setEmailError("");
      } else {
        setEmailError("Invalid email structure (e.g., name@domain.com)");
      }
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      setEmailError(
        "Please enter a valid email address containing '@' and standard domain extension",
      );
      return;
    }

    fetch("https://etechbackend.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginData.email, password: loginData.password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || "Incorrect email or password.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          if (onSubmit) onSubmit(data.data);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return {
    loginData,
    emailError,
    setEmailError,
    handleInputChange,
    handleLoginSubmit,
    isFormValid,
    isEmailValid,
  };
}
