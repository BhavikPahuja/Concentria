import React, { useState, type ChangeEvent, type FormEvent } from "react";
import NeonInput from "./NeonInput";
import GlowButton from "./GlowButton";

type AuthType = "login" | "register";
type Fields = {
  email: string;
  password: string;
  confirm: string;
  firstName?: string;
  lastName?: string;
};
type Props = {
  type?: AuthType;
  onSubmit?: (fields: Fields) => void;
  setIsLoggedIn?: (value: boolean) => void;
};

const API_URL = "http://localhost:3000/auth";

const AuthForm: React.FC<Props> = ({
  type = "login",
  onSubmit,
  setIsLoggedIn,
}) => {
  const [fields, setFields] = useState<Fields>({
    email: "",
    password: "",
    confirm: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !fields.email ||
      !fields.password ||
      (type === "register" &&
        (!fields.confirm || !fields.firstName || !fields.lastName))
    ) {
      setError("All fields are required.");
      return;
    }
    if (type === "register" && fields.password !== fields.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    try {
      if (type === "register") {
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: fields.email,
            password: fields.password,
            firstName: fields.firstName,
            lastName: fields.lastName,
          }),
        });
        let data = {};
        try {
          data = await res.json();
        } catch {
          setError("Server error: invalid response.");
          return;
        }
        if (!res.ok) {
          setError((data as any).message || "Registration failed.");
          return;
        }
        setIsLoggedIn && setIsLoggedIn(true);
      } else {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: fields.email,
            password: fields.password,
          }),
        });
        let data = {};
        try {
          data = await res.json();
        } catch {
          setError("Server error: invalid response.");
          return;
        }
        if (!res.ok) {
          setError((data as any).message || "Login failed.");
          return;
        }
        // Store JWT token
        if ((data as any).token) {
          localStorage.setItem("token", (data as any).token);
          setIsLoggedIn && setIsLoggedIn(true);
        } else {
          setError("No token received from server.");
          return;
        }
      }
      onSubmit && onSubmit(fields);
    } catch (err: any) {
      setError("Network error or server unavailable.");
      console.log("Auth error:", err);
    }
  };

  return (
    <form className="w-full animate-slideUp" onSubmit={handleSubmit}>
      {type === "register" && (
        <div className="grid grid-cols-2 gap-4">
          <NeonInput
            label="First Name"
            name="firstName"
            type="text"
            value={fields.firstName}
            onChange={handleChange}
          />
          <NeonInput
            label="Last Name"
            name="lastName"
            type="text"
            value={fields.lastName}
            onChange={handleChange}
          />
        </div>
      )}
      <NeonInput
        label="Email"
        name="email"
        type="email"
        value={fields.email}
        onChange={handleChange}
      />
      <div className={type == "register" ? "grid grid-cols-2 gap-4" : ""}>
        <NeonInput
          label="Password"
          name="password"
          type="password"
          value={fields.password}
          onChange={handleChange}
        />
        {type === "register" && (
          <NeonInput
            label="Confirm Password"
            name="confirm"
            type="password"
            value={fields.confirm}
            onChange={handleChange}
          />
        )}
      </div>
      {error && <div className="mb-2 text-xs text-pink-400">{error}</div>}
      <GlowButton>{type === "login" ? "Login" : "Register"}</GlowButton>
    </form>
  );
};

export default AuthForm;
