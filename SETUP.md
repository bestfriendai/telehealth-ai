# TeleHealth AI - Setup Guide

## Prerequisites

1. **Node.js** (v18+)
2. **Expo CLI**: `npm install -g expo-cli`
3. **Apple Developer Account** (for App Store submission)
4. **RevenueCat Account**: https://revenuecat.com

## Installation

```bash
# Navigate to app directory
cd telehealth-ai

# Install dependencies
npm install

# Start development server
npx expo start
```

## RevenueCat Setup

### Step 1: Create RevenueCat Account
1. Go to [revenuecat.com](https://revenuecat.com)
2. Sign up for free account
3. Create new project: "TeleHealth AI"

### Step 2: Configure Products
In RevenueCat Dashboard:

1. **Monthly Subscription**
   - Product ID: `telehealth_premium_monthly`
   - Price: $9.99/month
   - Platform: iOS (App Store Connect)

2. **Annual Subscription**
   - Product ID: `telehealth_premium_annual`
   - Price: $49.99/year
   - Platform: iOS (App Store Connect)

### Step 3: Get API Keys
- Copy your **Project API Key** from RevenueCat
- Add to `.env` file:
```
REVENUECAT_API_KEY=your_api_key_here
```

### Step 4: Integrate SDK
The app already includes RevenueCat integration in `src/services/purchases.ts`. 
Install the package:
```bash
npm install @revenuecat/purchases
```

## App Store Connect Setup

### Step 1: Create App
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new iOS app:
   - Name: TeleHealth AI
   - Bundle ID: com.telehealthai.app
   - Platform: iOS

### Step 2: Configure Products
1. Go to **My Apps > TeleHealth AI > In-App Purchases**
2. Create Subscription products matching RevenueCat IDs

### Step 3: Upload Build
```bash
# Build for iOS
eas build --platform ios

# Or use Expo
npx expo prebuild --platform ios
```

## EAS Build Commands

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for development
eas build --profile development --platform ios

# Build for production
eas build --profile production --platform ios
```

## Submission Checklist

- [ ] RevenueCat products configured and tested
- [ ] App Store Connect app created
- [ ] Bundle ID registered
- [ ] Subscription products created in App Store Connect
- [ ] Privacy Policy URL ready
- [ ] App icons (1024x1024) ready
- [ ] Screenshots (various iPhone sizes) ready
- [ ] Build uploaded via EAS or Xcode
- [ ] App Store metadata completed

## Testing RevenueCat

### Sandbox Testing
1. Enable **Sandbox Testing** in RevenueCat
2. Create Sandbox Tester in App Store Connect
3. Test purchases in sandbox environment

### RevenueCat Debug View
Use RevenueCat's debug view to verify:
- Entitlements active
- Product IDs matching
- Purchase flow working

## Troubleshooting

### Common Issues

**RevenueCat not initializing:**
- Check API key is correct
- Verify entitlements configured

**Products not showing:**
- Confirm products created in both RevenueCat AND App Store Connect
- Check product IDs match exactly

**Build fails:**
- Run `expo doctor` to check for issues
- Verify CocoaPods installed: `cd ios && pod install`

## Support

- RevenueCat Docs: https://docs.revenuecat.com
- Expo EAS: https://docs.expo.dev/eas/
