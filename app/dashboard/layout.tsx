"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for authentication on client side
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const userInfo = localStorage.getItem("user");

    if (!token) {
      router.push("/signin");
      return;
    }

    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (e) {
        console.error("Failed to parse user info:", e);
        localStorage.removeItem("user");
        router.push("/signin");
      }
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirect to signin page
    router.push("/signin");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="/dashboard" className="nav-link active">
                Overview
              </a>
            </li>
            <li>
              <a href="/dashboard/profile" className="nav-link">
                Profile
              </a>
            </li>
            <li>
              <a href="/dashboard/settings" className="nav-link">
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {user?.name || "User"}</h1>
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </div>
        </header>
        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
}
