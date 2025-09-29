import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Button from "./Button";
import Checkbox from "./Checkbox";
import ErrorAlert from "./ErrorAlert";
import "./styles/AuthForms.css";

interface SignInFormProps {
  onSuccess?: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          action: "signin",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token based on remember me preference
        if (formData.rememberMe) {
          localStorage.setItem("authToken", data.data.token);
        } else {
          sessionStorage.setItem("authToken", data.data.token);
        }

        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.data.user));

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <ErrorAlert message={error} />

      <div className="form-group">
        <Input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          label="Email address"
          roundedTop
        />

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          roundedBottom
        />
      </div>

      <div className="form-actions">
        <Checkbox
          id="remember-me"
          name="rememberMe"
          label="Remember me"
          checked={formData.rememberMe}
          onChange={handleChange}
        />

        <div className="forgot-password">
          <a href="/auth/forgot-password">Forgot your password?</a>
        </div>
      </div>

      <div className="form-submit">
        <Button type="submit" fullWidth isLoading={loading}>
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
