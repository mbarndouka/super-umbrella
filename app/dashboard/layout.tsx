'use client';
import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import './dashboard.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();

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
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {user?.name || 'User'}</h1>
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
              <span className="user-role">
                {(user as { role?: string } | null)?.role || 'user'}
              </span>
            </div>
          </div>
        </header>
        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
}
