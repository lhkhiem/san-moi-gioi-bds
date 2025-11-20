#!/bin/bash

echo "🗄️  Setting up database..."

# Check if database exists
if psql -lqt | cut -d \| -f 1 | grep -qw inland_realestate; then
    echo "Database 'inland_realestate' already exists"
    read -p "Do you want to recreate it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        dropdb inland_realestate
        createdb inland_realestate
        echo "✅ Database recreated"
    fi
else
    createdb inland_realestate
    echo "✅ Database created"
fi

# Run migration
echo "Running migration..."
cd ../../projects/public-backend
npm run migrate

echo "✅ Database setup complete!"

