# 🚀 GitHub Pages Deployment Guide for SkyCast Weather App

## 📋 Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git Installed**: Have Git installed on your computer
3. **Node.js**: Version 16 or higher

## 🔧 Step-by-Step Deployment Instructions

### 1. **Create GitHub Repository**

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it `skycast-weather-app` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. Don't initialize with README, .gitignore, or license (we already have these)

### 2. **Update Configuration**

Before pushing to GitHub, your homepage URL is already configured in `package.json`:

```json
"homepage": "https://rishikkumar84a.github.io/skycast-weather-app"
```

This is already set up for your GitHub username: **rishikkumar84a**

### 3. **Initialize Git and Push to GitHub**

Open terminal in your project directory and run:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - SkyCast Weather Dashboard"

# Add your GitHub repository as remote origin
git remote add origin https://github.com/rishikkumar84a/skycast-weather-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. **Manual Deployment (Option 1)**

Run the deployment command:

```bash
npm run deploy
```

This will:
- Build the production version
- Deploy to GitHub Pages
- Create a `gh-pages` branch automatically

### 5. **Automatic Deployment with GitHub Actions (Option 2)**

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** tab
   - Scroll to **Pages** section
   - Under **Source**, select **GitHub Actions**

2. **The workflow will automatically**:
   - Build the app when you push to `main` branch
   - Deploy to GitHub Pages
   - Update your live site

### 6. **Access Your Deployed App**

After successful deployment, your app will be available at:
```
https://rishikkumar84a.github.io/skycast-weather-app
```

## 🌐 Environment Variables (Important!)

⚠️ **Security Note**: Your OpenWeatherMap API key is currently hardcoded in the source code. For production deployment, consider:

### Option 1: Environment Variables (Recommended)
1. Create a `.env` file:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

2. Update `src/constants/config.js`:
```javascript
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '0d55c6079668bbd19a583d32ed066a16';
```

3. Add the API key to GitHub Secrets:
   - Go to repository **Settings** → **Secrets and variables** → **Actions**
   - Add new secret: `VITE_WEATHER_API_KEY`

### Option 2: Keep Current Setup
The current API key will work fine for demonstration purposes.

## 🛠️ Build Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Deploy**: `npm run deploy`

## 🔧 Troubleshooting

### Common Issues:

1. **404 Error**: Make sure the `base` path in `vite.config.js` matches your repository name

2. **Blank Page**: Check browser console for errors, usually related to incorrect base path

3. **API Not Working**: Verify your OpenWeatherMap API key is valid

4. **Build Fails**: Run `npm run build` locally first to check for errors

## 📱 Features Included

✅ Real-time weather data  
✅ City search functionality  
✅ 7-day forecast  
✅ Responsive design  
✅ Dark/Light mode  
✅ Temperature unit conversion  
✅ Air quality information  

## 🌟 Example Live Deployment

Once deployed, your SkyCast app will be a fully functional weather dashboard accessible worldwide!

## 📞 Support

If you encounter any issues during deployment:
1. Check the GitHub Actions logs for build errors
2. Verify all configuration files are correct
3. Make sure your GitHub repository is public
4. Check GitHub Pages settings in repository settings

---

**Happy Deploying! 🎉**
