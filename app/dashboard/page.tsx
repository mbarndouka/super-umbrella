"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardStats } from "@/types/user";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    projectCount: 0,
    skillCount: 0,
    experienceCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from local storage
    const userData = localStorage.getItem("user");
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (userData) {
      // User data loaded from localStorage
    }

    if (!token) {
      router.push("/signin");
      return;
    }

    // Fetch user profile data from the API
    async function fetchUserProfile() {
      try {
        const response = await fetch("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Update stats from real API data
          setStats({
            projectCount: data.data.stats.projectCount || 0,
            skillCount: data.data.stats.skillCount || 0,
            experienceCount: data.data.stats.experienceCount || 0,
          });

          // Update user data with fresh data from the server
          localStorage.setItem("user", JSON.stringify(data.data.user));
        } else if (response.status === 401) {
          // Token is invalid or expired, redirect to login
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("authToken");
          router.push("/signin");
          return;
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="dashboard-loading-content">Loading dashboard data...</div>
    );
  }

  return (
    <>
      <section className="dashboard-overview">
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-label">Total Projects</div>
            <div className="stat-value">{stats.projectCount}</div>
            <div className="stat-description">Projects in your portfolio</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Skills</div>
            <div className="stat-value">{stats.skillCount}</div>
            <div className="stat-description">Skills in your profile</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Experience</div>
            <div className="stat-value">{stats.experienceCount}</div>
            <div className="stat-description">Work experiences listed</div>
          </div>
        </div>
      </section>

      <section className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">Recent Activity</h2>
        </div>
        <div className="card-content">
          <p>
            Your account was created recently. Start by adding your skills and
            projects!
          </p>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <div className="activity-title">Account Created</div>
                <div className="activity-time">Just now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div className="card-content">
          <div className="action-buttons">
            <button
              className="action-button"
              onClick={() => router.push("/dashboard/profile")}
            >
              Update Profile
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
