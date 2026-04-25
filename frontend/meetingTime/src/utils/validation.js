import { LANGUAGE_TO_FLAG } from "../constant/constData";

LANGUAGE_TO_FLAG

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return null; // ✅ all emails allowed (including Gmail)
};

export const validateName = (name) => {
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!name) return "Name is required";

  if (!nameRegex.test(name)) {
    return "Name should contain only letters";
  }

  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Must include at least one uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Must include at least one lowercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Must include at least one number";
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return "Must include at least one special character";
  }

  return null;
};

