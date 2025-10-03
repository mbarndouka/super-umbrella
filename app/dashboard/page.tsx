'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { DashboardStats } from '@/types/user';

export default function Dashboard() {
  const router = useRouter();
  const { loading, isAuthenticated, redirectToSignIn } = useAuth();
  const [stats] = useState<DashboardStats>({
    projectCount: 6,
    skillCount: 15,
    experienceCount: 3,
  });

  // Redirect to sign in if not authenticated
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      redirectToSignIn();
    }
  }, [loading, isAuthenticated, redirectToSignIn]);

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
              onClick={() => router.push('/dashboard/profile')}
            >
              Update Profile
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
