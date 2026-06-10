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

    if (onSubmit) {
      onSubmit(loginData);
      navigate("/dashboard");
    }
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
