#!/bin/bash

# PrintMaker Forum - GitHub Deployment Script
set -e

echo "🚀 PrintMaker Forum - GitHub Repository Setup"
echo "============================================="

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Please install: https://cli.github.com/"
    echo "   Or manually create repository and push with git commands"
    exit 1
fi

# Check if logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "🔐 Logging into GitHub..."
    gh auth login
fi

echo "📊 Current repository status:"
echo "Branch: $(git branch --show-current)"
echo "Commits: $(git rev-list --count HEAD)"
echo "Files: $(git ls-files | wc -l) tracked files"

echo ""
echo "🎯 Repository Options:"
echo "1. Create new public repository 'PrintMaker-Forum'"
echo "2. Create new private repository 'PrintMaker-Forum'"  
echo "3. Push to existing repository (enter URL)"
echo "4. Show manual git commands and exit"
echo ""

read -p "Choose option (1-4): " choice

case $choice in
    1)
        echo "📁 Creating public repository..."
        gh repo create PrintMaker-Forum --public --description "🎨 Extravagant CAD AI Community Forum - Modern, futuristic forum with AI/CAD-themed design, complete with mock users and pre-filled content" --homepage "https://printmaker-forum.vercel.app"
        
        echo "🔗 Adding remote origin..."
        git remote add origin https://github.com/$(gh api user --jq .login)/PrintMaker-Forum.git
        
        echo "⬆️ Pushing to GitHub..."
        git push -u origin master
        
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 Repository: https://github.com/$(gh api user --jq .login)/PrintMaker-Forum"
        echo "🚀 Deploy to Vercel: https://vercel.com/import"
        ;;
        
    2)
        echo "📁 Creating private repository..."
        gh repo create PrintMaker-Forum --private --description "🎨 Extravagant CAD AI Community Forum - Modern, futuristic forum with AI/CAD-themed design, complete with mock users and pre-filled content"
        
        echo "🔗 Adding remote origin..."
        git remote add origin https://github.com/$(gh api user --jq .login)/PrintMaker-Forum.git
        
        echo "⬆️ Pushing to GitHub..."
        git push -u origin master
        
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 Repository: https://github.com/$(gh api user --jq .login)/PrintMaker-Forum"
        ;;
        
    3)
        read -p "Enter repository URL (https://github.com/username/repo.git): " repo_url
        
        if [[ $repo_url =~ ^https://github.com/.+/.+\.git$ ]]; then
            echo "🔗 Adding remote origin..."
            git remote add origin "$repo_url"
            
            echo "⬆️ Pushing to GitHub..."
            git push -u origin master
            
            echo ""
            echo "✅ Successfully pushed to existing repository!"
            echo "🌐 Repository: ${repo_url%.git}"
        else
            echo "❌ Invalid repository URL format"
            exit 1
        fi
        ;;
        
    4)
        echo ""
        echo "📋 Manual Git Commands:"
        echo "======================"
        echo ""
        echo "# Create repository on GitHub first, then:"
        echo "git remote add origin https://github.com/USERNAME/PrintMaker-Forum.git"
        echo "git push -u origin master"
        echo ""
        echo "# Or push to existing repository:"
        echo "git remote add origin https://github.com/USERNAME/EXISTING-REPO.git"
        echo "git push -u origin master"
        echo ""
        exit 0
        ;;
        
    *)
        echo "❌ Invalid option selected"
        exit 1
        ;;
esac

echo ""
echo "📦 Next Steps:"
echo "=============="
echo "1. 🌐 Deploy to Vercel:"
echo "   - Visit: https://vercel.com/import"
echo "   - Connect your GitHub repository"
echo "   - Add environment variables from .env.example"
echo ""
echo "2. 🚂 Deploy to Railway:"
echo "   - Visit: https://railway.app/"
echo "   - Connect GitHub repository"
echo "   - Add PostgreSQL database service"
echo "   - Configure environment variables"
echo ""
echo "3. 📝 Configure Environment:"
echo "   - Copy .env.example to .env.local"
echo "   - Add your DATABASE_URL"
echo "   - Configure OAuth providers (Google/GitHub)"
echo "   - Add Stripe keys for premium features"
echo ""
echo "4. 🗃️ Database Setup:"
echo "   - npx prisma db push"
echo "   - npm run seed"
echo ""
echo "✅ Your CAD AI Forum is ready to launch! 🚀"