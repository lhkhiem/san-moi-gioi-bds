# Database Schema Documentation

## Overview

Database schema cho Inland Real Estate project.

## Tables

### users
Quản lý admin và sales users.

**Columns:**
- `id` (UUID) - Primary key
- `name` (VARCHAR) - User name
- `email` (VARCHAR) - Unique email
- `password_hash` (VARCHAR) - Hashed password
- `role` (VARCHAR) - 'admin' or 'sale'
- `created_at` (TIMESTAMP) - Creation timestamp

### projects
Dự án bất động sản.

**Columns:**
- `id` (UUID) - Primary key
- `title` (VARCHAR) - Project title
- `slug` (VARCHAR) - Unique slug for URL
- `description` (TEXT) - Project description
- `location` (VARCHAR) - Location
- `price_min` (BIGINT) - Minimum price
- `price_max` (BIGINT) - Maximum price
- `area_min` (NUMERIC) - Minimum area
- `area_max` (NUMERIC) - Maximum area
- `status` (VARCHAR) - 'dang-mo-ban', 'sap-mo-ban', 'da-ban'
- `thumbnail_url` (TEXT) - Thumbnail image URL
- `gallery` (JSONB) - Array of image URLs
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Update timestamp

### listings
Sản phẩm/căn hộ cụ thể.

**Columns:**
- `id` (UUID) - Primary key
- `project_id` (UUID) - Foreign key to projects
- `type` (VARCHAR) - 'can-ho', 'nha-pho', 'dat-nen', 'biet-thu', 'shophouse'
- `price` (BIGINT) - Price
- `area` (NUMERIC) - Area
- `bedrooms` (INTEGER) - Number of bedrooms
- `bathrooms` (INTEGER) - Number of bathrooms
- `thumbnail_url` (TEXT) - Thumbnail image URL
- `gallery` (JSONB) - Array of image URLs
- `description` (TEXT) - Description
- `created_at` (TIMESTAMP) - Creation timestamp

### posts
Blog/news articles.

**Columns:**
- `id` (UUID) - Primary key
- `title` (VARCHAR) - Post title
- `slug` (VARCHAR) - Unique slug
- `category` (VARCHAR) - Category
- `thumbnail_url` (TEXT) - Thumbnail image URL
- `content` (TEXT) - Post content
- `created_at` (TIMESTAMP) - Creation timestamp

### leads
Customer inquiries.

**Columns:**
- `id` (UUID) - Primary key
- `name` (VARCHAR) - Customer name
- `phone` (VARCHAR) - Phone number
- `email` (VARCHAR) - Email
- `message` (TEXT) - Message
- `source` (VARCHAR) - 'homepage', 'project', 'contact'
- `created_at` (TIMESTAMP) - Creation timestamp

### jobs
Job postings.

**Columns:**
- `id` (UUID) - Primary key
- `title` (VARCHAR) - Job title
- `slug` (VARCHAR) - Unique slug
- `location` (VARCHAR) - Location
- `salary_range` (VARCHAR) - Salary range
- `description` (TEXT) - Job description
- `requirements` (TEXT) - Requirements
- `created_at` (TIMESTAMP) - Creation timestamp

## Indexes

- `idx_projects_status` - On projects.status
- `idx_projects_slug` - On projects.slug
- `idx_projects_location` - On projects.location
- `idx_listings_project_id` - On listings.project_id
- `idx_listings_type` - On listings.type
- `idx_posts_slug` - On posts.slug
- `idx_posts_category` - On posts.category
- `idx_leads_created_at` - On leads.created_at
- `idx_jobs_slug` - On jobs.slug

## Relationships

- `listings.project_id` → `projects.id` (CASCADE DELETE)

