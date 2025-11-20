# Database Migrations Guide

Hướng dẫn sử dụng migrations.

## Migration Files

Migrations được lưu trong `shared/database/migrations/`:
- `001_initial_schema.sql` - Tạo tất cả tables
- `002_add_indexes.sql` - Thêm indexes

## Running Migrations

### Option 1: Run All Migrations
```bash
# From project root
psql -d inland_realestate -f shared/database/migrations/001_initial_schema.sql
psql -d inland_realestate -f shared/database/migrations/002_add_indexes.sql
psql -d inland_realestate -f shared/database/seeds/sample_data.sql
```

### Option 2: Use Full Schema
```bash
# Run complete schema (includes migrations + seeds)
psql -d inland_realestate -f shared/database/schema.sql
```

### Option 3: Use Migration Script
```bash
cd projects/public-backend
npm run migrate
```

## Creating New Migrations

1. Create new file: `shared/database/migrations/003_description.sql`
2. Write migration SQL
3. Update migration script if needed
4. Test migration
5. Commit to version control

## Migration Best Practices

- Always backup before migration
- Test on development first
- Use transactions when possible
- Document breaking changes
- Version control all migrations

