# Entity Relationship Diagram

Mô tả quan hệ giữa các bảng trong database.

## Database Schema

```
┌─────────────┐
│    users    │
├─────────────┤
│ id (PK)     │
│ name        │
│ email (UK)  │
│ password    │
│ role        │
│ created_at  │
└─────────────┘
       │
       │ (1:N)
       │
       ▼
┌─────────────┐
│  projects   │
├─────────────┤
│ id (PK)     │
│ title       │
│ slug (UK)   │
│ description │
│ location    │
│ price_min   │
│ price_max   │
│ area_min    │
│ area_max    │
│ status      │
│ thumbnail   │
│ gallery     │
│ created_at  │
│ updated_at  │
└─────────────┘
       │
       │ (1:N)
       │
       ▼
┌─────────────┐
│  listings   │
├─────────────┤
│ id (PK)     │
│ project_id  │──┐
│ type        │  │ FK
│ price       │  │
│ area        │  │
│ bedrooms    │  │
│ bathrooms   │  │
│ thumbnail   │  │
│ gallery     │  │
│ description │  │
│ created_at  │  │
└─────────────┘  │
                 │
                 │
┌─────────────┐  │
│   posts     │  │
├─────────────┤  │
│ id (PK)     │  │
│ title       │  │
│ slug (UK)   │  │
│ category    │  │
│ thumbnail   │  │
│ content     │  │
│ created_at  │  │
└─────────────┘  │
                 │
┌─────────────┐  │
│    leads    │  │
├─────────────┤  │
│ id (PK)     │  │
│ name        │  │
│ phone       │  │
│ email       │  │
│ message     │  │
│ source      │  │
│ created_at  │  │
└─────────────┘  │
                 │
┌─────────────┐  │
│    jobs     │  │
├─────────────┤  │
│ id (PK)     │  │
│ title       │  │
│ slug (UK)   │  │
│ location    │  │
│ salary      │  │
│ description │  │
│ requirements│  │
│ created_at  │  │
└─────────────┘  │
```

## Relationships

1. **users** → **projects** (1:N)
   - Một user có thể tạo nhiều projects
   - Hiện tại chưa có foreign key (có thể thêm sau)

2. **projects** → **listings** (1:N)
   - Một project có nhiều listings
   - Foreign key: `listings.project_id` → `projects.id`

## Indexes

- `projects.slug` - Unique index
- `projects.status` - Index for filtering
- `projects.location` - Index for filtering
- `listings.project_id` - Foreign key index
- `posts.slug` - Unique index
- `jobs.slug` - Unique index

