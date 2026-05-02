# Database Setup Guide - Phase 1

This guide walks you through setting up the PostgreSQL database for your portfolio application.

## Prerequisites

- Node.js installed
- PostgreSQL database (local or cloud)
- npm or yarn

## Option 1: Local PostgreSQL Setup

### Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

**Windows:**
Download and install from https://www.postgresql.org/download/windows/

### Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE portfolio_db;

# Create user (optional)
CREATE USER portfolio_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;

# Exit
\q
```

## Option 2: Cloud PostgreSQL (Recommended for Quick Setup)

You can use one of these free PostgreSQL hosting services:

1. **Supabase** - https://supabase.com (Free tier available)
2. **Neon** - https://neon.tech (Free tier available)
3. **Railway** - https://railway.app (Free tier available)
4. **ElephantSQL** - https://www.elephantsql.com (Free tier available)

After creating a database, copy the connection string.

## Configuration

### 1. Set up Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and update the `DATABASE_URL` with your PostgreSQL connection string:

**For local database:**
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio_db"
```

**For cloud database:**
```
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

Also set a secure JWT secret (at least 32 characters):
```
JWT_SECRET="your-super-secret-jwt-key-at-least-32-characters-long"
```

### 2. Generate Prisma Client

```bash
npm run db:generate
```

### 3. Push Schema to Database

This will create all the tables in your database:
```bash
npm run db:push
```

### 4. Seed the Database

Populate your database with initial data (projects, skills, blog posts, etc.):
```bash
npm run db:seed
```

## Verification

### Check Database with Prisma Studio

Launch Prisma Studio to visually browse your database:
```bash
npm run db:studio
```

This will open a browser window at http://localhost:5555 where you can view and edit your data.

### Admin Credentials

After seeding, you can login to the dashboard with:
- **Email:** admin@portfolio.com
- **Password:** admin123

⚠️ **Important:** Change these credentials in production!

## Database Schema Overview

Your database now includes these tables:

- **User** - Admin users for dashboard access
- **Project** - Portfolio projects
- **SkillCategory** - Skill categories (Frontend, Backend, etc.)
- **Skill** - Individual skills
- **Qualification** - Education and work experience
- **BlogPost** - Blog articles
- **Tag** - Tags for projects and blog posts
- **ContactMessage** - Messages from the contact form

## Useful Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed database with initial data
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## Troubleshooting

### Connection Error

If you get a connection error:
1. Check that PostgreSQL is running
2. Verify your DATABASE_URL is correct
3. Ensure the database exists
4. Check firewall/security group settings (for cloud databases)

### SSL Certificate Error

For cloud databases, you may need to add `?sslmode=require` to your connection string:
```
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

### Migration Issues

If you need to reset your database:
```bash
# WARNING: This will delete all data
npx prisma migrate reset
```

## Next Steps

After successful database setup:
1. ✅ Phase 1 Complete - Database Integration
2. ⬜ Phase 2 - Authentication & Security
3. ⬜ Phase 3 - Backend API (CRUD)
4. ⬜ Phase 4 - Admin Dashboard Implementation
5. ⬜ Phase 5 - Frontend Dynamic Integration

---

For questions or issues, refer to the [Prisma documentation](https://www.prisma.io/docs).
