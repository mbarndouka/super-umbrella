import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "./Input";
import Button from "./Button";
import Checkbox from "./Checkbox";
import ErrorAlert from "./ErrorAlert";
import "./styles/AuthForms.css";

interface SignUpFormProps {
  onSuccess?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          action: "signup",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("authToken", data.data.token);

        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.data.user));

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }

        // Redirect to dashboard after successful registration
        router.push("/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <ErrorAlert message={error} />

      <div className="form-group">
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
          label="Full Name"
          roundedTop
        />

        <Input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          label="Email Address"
        />

        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
          label="Password"
        />

        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          roundedBottom
        />
      </div>

      <div className="form-terms">
        <Checkbox
          id="agree-terms"
          name="agreeToTerms"
          label={
            <>
              I agree to the{" "}
              <Link href="/terms" className="terms-link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="terms-link">
                Privacy Policy
              </Link>
            </>
          }
          checked={formData.agreeToTerms}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-submit">
        <Button type="submit" fullWidth isLoading={loading}>
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
