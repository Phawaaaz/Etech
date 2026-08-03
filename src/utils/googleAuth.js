const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://etechbackend.onrender.com/api";

export function handleGoogleAuth(navigate) {
  window.location.href = `${BASE_URL}/auth/google`;
}

export async function handleGoogleCallback(code, navigate) {
  const toastId = "google-auth";
  try {
    const res = await fetch(`${BASE_URL}/auth/google/callback?code=${code}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || "Google sign-in failed.");
    }

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      const isNew = data.data.isNewUser;
      if (isNew) {
        localStorage.removeItem("onboarded");
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    }
  } catch (err) {
    throw err;
  }
}
