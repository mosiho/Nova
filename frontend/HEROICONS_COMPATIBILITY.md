# Heroicons Compatibility Fixes

## Background

The project is using Heroicons v1.0.6 but some components were trying to use icon components from Heroicons v2. This caused TypeScript errors because the v2 icons weren't available in the installed package.

## Issues Fixed

1. **Import Path Issues**:
   - Heroicons v2 uses different import paths (`@heroicons/react/24/outline` instead of `@heroicons/react/outline`)
   - Our app is using v1.0.6 import structure

2. **Icon Name Changes**:
   - Several icons have been renamed between v1 and v2:
     - `ChatBubbleLeftIcon` → `ChatAltIcon`
     - `ArrowPathIcon` → `RefreshIcon`
     - `DevicePhoneMobileIcon` → `DeviceMobileIcon`
     - `SunIcon` → using `LightBulbIcon` as fallback

3. **Import Location Changes**:
   - Some icons moved between variants (outline/solid):
     - Fixed `MoonIcon` import in AccessibilityControls.tsx to only use the solid variant

## Solutions Implemented

1. **Manual Fixes**:
   - Fixed AccessibilityControls.tsx by removing the incorrect MoonIcon import from outline
   - Fixed BottomNav.tsx by using ChatIcon as a replacement for ChatAltIconSolid

2. **Automated Script**:
   - Created `fix-heroicons.js` script to automatically replace v2 icon imports with v1 equivalents across the codebase
   - Script recursively searches all TypeScript/JavaScript files for icon references and replaces them

## How to Upgrade to Heroicons v2 (Future)

If you want to upgrade to Heroicons v2 in the future:

1. Update the dependency: `npm install @heroicons/react@latest`
2. Update import paths:
   - Change `@heroicons/react/outline` to `@heroicons/react/24/outline`
   - Change `@heroicons/react/solid` to `@heroicons/react/24/solid`
3. Rename icon components according to the v2 naming scheme
4. Review the Heroicons documentation for any other changes

## Reference

- [Heroicons Documentation](https://heroicons.com/)
- [Heroicons GitHub Repository](https://github.com/tailwindlabs/heroicons) 