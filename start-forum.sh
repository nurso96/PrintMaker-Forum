#!/bin/bash

# CAD AI Forum - Development Startup Script
set -e

echo "🚀 Starting CAD AI Forum Development Environment..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Copying from .env.example..."
    cp .env.example .env.local
    echo "✅ Please edit .env.local with your environment variables"
    echo "📝 Required: DATABASE_URL, NEXTAUTH_SECRET, OAuth credentials"
    echo ""
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "📦 Dependencies already installed"
fi

# Check if Prisma client is generated
if [ ! -d "node_modules/.prisma" ]; then
    echo "🔧 Generating Prisma client..."
    npx prisma generate
    echo "✅ Prisma client generated"
fi

# Database setup
echo ""
echo "🗃️  Database Setup"
echo "=================="

# Check if database is accessible
echo "🔍 Checking database connection..."
if npx prisma db pull &> /dev/null; then
    echo "✅ Database connection successful"
else
    echo "⚠️  Database connection failed. Setting up database..."
    
    # Push database schema
    echo "📋 Pushing database schema..."
    npx prisma db push
    
    # Seed database
    echo "🌱 Seeding database with sample data..."
    npm run seed
    
    echo "✅ Database setup complete!"
fi

echo ""
echo "🎨 Forum Features Ready:"
echo "========================"
echo "👥 Mock Users: GeoMetrician, LatheWizard, AI_Architect, PrintSorcerer, BugHunter"
echo "📂 Categories: Welcome, Projects, Tutorials, Feedback, Community"
echo "📝 Welcome Posts: Pre-filled template discussions"
echo "🏅 Badges: Community achievements system"
echo "🎯 Reputation: Gamified user progression"
echo "🌙 Themes: Dark/Light mode with CAD aesthetics"

echo ""
echo "🚀 Starting development server..."
echo "=================================="

# Start the development server
npm run dev &
DEV_PID=$!

echo ""
echo "✅ CAD AI Forum is running!"
echo "🌐 Frontend: http://localhost:3000"
echo "🛠️  Database Studio: npx prisma studio"
echo ""
echo "🔥 Sample Login Credentials:"
echo "Email: geo@cadai.forum (GeoMetrician)"
echo "Email: ai_architect@cadai.forum (AI_Architect - Moderator)"
echo "Email: admin@cadai.forum (ForumAdmin - Admin)"
echo ""
echo "📊 Quick Commands:"
echo "• npm run dev        - Start development server"
echo "• npm run build      - Build for production"
echo "• npm run seed       - Reseed database"
echo "• npx prisma studio  - Open database browser"
echo ""
echo "🎯 Ready to customize!"
echo "Edit the README.md for branding and customization instructions."
echo ""
echo "Press Ctrl+C to stop the development server"

# Handle cleanup on exit
trap "echo 'Stopping development server...'; kill $DEV_PID; exit 0" INT

# Wait for the development server
wait $DEV_PID