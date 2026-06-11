import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import useLoginForm from "../hooks/useLoginForm";

export default function Login() {
  const handleLoginSuccess = (loginData) => {
    console.log(
      "Authentication pipeline execution payload verified:",
      loginData,
    );
  };

  const {
    loginData,
    emailError,
    handleInputChange,
    handleLoginSubmit,
    isFormValid,
  } = useLoginForm(handleLoginSuccess);

  return (
    <AuthLayout maxWidth="max-w-xl" showCard={true}>
      <LoginForm
        loginData={loginData}
        emailError={emailError}
        handleInputChange={handleInputChange}
        handleLoginSubmit={handleLoginSubmit}
        isFormValid={isFormValid}
      />
    </AuthLayout>
  );
}
