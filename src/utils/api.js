const BASE_URL = "https://etechbackend.onrender.com/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    // If unauthorized, redirect to login
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}
