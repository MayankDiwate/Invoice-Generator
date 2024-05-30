import { SignInType } from "./pages/SignIn";
import { SignUpType } from "./pages/SignUp";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const signUp = async (formData: SignUpType) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.message);
  }
};

export const signIn = async (formData: SignInType) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Token invalid");
  }
  return res.json();
};

export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.message);
  }

  return resBody;
};
