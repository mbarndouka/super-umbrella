"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setLoading(false);
    } else {
      // Redirect to login if no user data found
      router.push("/signin");
    }
  }, [router]);

  if (loading) {
    return <div className="dashboard-loading-content">Loading profile...</div>;
  }

  return (
    <>
      <section className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">Your Profile</h2>
        </div>
        <div className="card-content profile-content">
          <div className="profile-info">
            <div className="profile-field">
              <div className="field-label">Name</div>
              <div className="field-value">{user?.name}</div>
            </div>

            <div className="profile-field">
              <div className="field-label">Email</div>
              <div className="field-value">{user?.email}</div>
            </div>

            <div className="profile-field">
              <div className="field-label">Role</div>
              <div className="field-value">
                <span className="user-role">{user?.role}</span>
              </div>
            </div>

            <div className="profile-field">
              <div className="field-label">Member Since</div>
              <div className="field-value">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">Update Profile</h2>
        </div>
        <div className="card-content">
          <form className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  defaultValue={user?.name || ""}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  defaultValue={user?.email}
                  disabled
                />
                <small className="form-hint">Email cannot be changed</small>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="action-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
