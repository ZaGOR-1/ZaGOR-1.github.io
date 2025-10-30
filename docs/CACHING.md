# Site Caching Implementation

This document describes the comprehensive caching strategy implemented for improved site performance.

## Overview

The caching implementation includes multiple layers:

1. **Service Worker (PWA)** - Client-side caching for offline support
2. **HTTP Cache Headers** - Server-side caching directives
3. **Build Optimization** - Asset bundling and code splitting
4. **React Memoization** - Component-level performance optimization

## Service Worker

### Location
`/public/service-worker.js`

### Features
- **Cache-First Strategy** for static assets (JS, CSS, fonts, images)
- **Network-First Strategy** for API calls and JSON
- **Offline Support** - Fallback to cached content when offline
- **Automatic Updates** - New versions detected and installed automatically
- **Cache Size Limits** - Prevents unlimited cache growth

### Cache Types
- **Static Cache** (`static-v1.0.0`) - HTML, core JS/CSS
- **Dynamic Cache** (`dynamic-v1.0.0`) - Dynamically loaded resources (max 50 items)
- **Image Cache** (`images-v1.0.0`) - Images and media files (max 30 items)

### Configuration
To update cache version (forces cache refresh), edit `CACHE_VERSION` in `service-worker.js`:
```javascript
const CACHE_VERSION = 'v1.0.0'; // Increment for cache invalidation
```

### Management
The service worker automatically:
- Clears old cache versions on activation
- Limits cache size to prevent excessive storage use
- Skips waiting when new version is available

## HTTP Cache Headers

### Deployment Platforms

#### Netlify (`netlify.toml`)
- **Static Assets**: `max-age=31536000` (1 year) with `immutable`
- **HTML/Service Worker**: `max-age=0, must-revalidate`
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, etc.

#### Vercel (`vercel.json`)
- Similar caching strategy as Netlify
- Comprehensive header configuration for all asset types

#### Apache/GitHub Pages (`.htaccess`)
- **GZIP Compression** enabled for text resources
- **Brotli Compression** when available
- **Expires Headers** set for optimal caching
- **Cache-Control** headers with immutable flag for versioned assets

### Cache Duration Strategy

| Resource Type | Cache Duration | Immutable | Reasoning |
|--------------|----------------|-----------|-----------|
| JS/CSS with hash | 1 year | Yes | Content-addressed, safe to cache forever |
| Images | 1 year | Yes | Rarely change, versioned URLs |
| Fonts | 1 year | Yes | Static resources |
| HTML | 0 | No | Always check for updates |
| Service Worker | 0 | No | Must check for updates |
| Manifest | 0 | No | May contain dynamic data |

## Build Optimization

### Vite Configuration (`vite.config.js`)

#### Code Splitting
- **react-vendor**: React and ReactDOM
- **framer-motion**: Animation library
- **lucide**: Icon library
- **vendor**: Other node_modules
- **core**: Critical components (Header, Hero, etc.)
- **components**: Lazy-loaded components

#### Asset Optimization
- **Inline Limit**: 4KB - Small assets inlined as base64
- **Asset Hashing**: All assets have content hash in filename
- **CSS Code Splitting**: Separate CSS files per chunk
- **Module Preload Polyfill**: Enabled for better browser support

#### Minification
- **JavaScript**: ESBuild minification
- **CSS**: Enabled
- **Console/Debugger**: Removed in production
- **Legal Comments**: Removed

## React Performance Optimization

### Memoized Components
The following components use `React.memo` to prevent unnecessary re-renders:

- `Header` - Navigation and theme controls
- `Hero` - Landing section
- `BackToTop` - Scroll-to-top button
- `LoadingSpinner` - Loading state
- `AnimatedBackground` - Canvas animation

### Hooks Used
- `useMemo` - Memoize expensive calculations
- `useCallback` - Memoize callback functions
- `lazy` - Code splitting for route components

### Best Practices
- Props are kept stable where possible
- Callbacks wrapped with `useCallback`
- Complex computations wrapped with `useMemo`

## Performance Metrics

### Expected Improvements

1. **First Load**
   - Service Worker registration and caching
   - All assets cached for subsequent visits

2. **Repeat Visits**
   - Instant load from cache (< 100ms)
   - Network calls only for cache validation

3. **Offline Support**
   - Full functionality when offline
   - Graceful degradation for dynamic content

4. **Bundle Size**
   - Code splitting reduces initial load
   - Vendor chunks cached separately
   - Tree shaking removes unused code

## Testing

### Check Service Worker
1. Open DevTools → Application → Service Workers
2. Verify service worker is registered and active
3. Check Cache Storage for cached resources

### Verify Caching
1. Load site with network throttling
2. Disable network (offline mode)
3. Verify site still loads and functions

### Performance Audit
```bash
# Build the project
npm run build

# Preview production build
npm run preview

# Run Lighthouse audit in Chrome DevTools
```

### Clear Cache
To manually clear all caches:
```javascript
// In browser console
navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
```

## Monitoring

### Browser Support
- Modern browsers: Full support
- Legacy browsers: Graceful degradation (no service worker)

### Cache Invalidation
Cache is automatically invalidated when:
1. Service worker version changes
2. Asset content changes (hash in filename changes)
3. Manual cache clear is triggered

## Troubleshooting

### Service Worker Not Updating
1. Increment `CACHE_VERSION` in service-worker.js
2. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
3. Unregister service worker manually in DevTools

### Assets Not Caching
1. Check Network tab for cache headers
2. Verify service worker is active
3. Check Cache Storage in DevTools

### Performance Issues
1. Run Lighthouse audit to identify issues
2. Check bundle sizes in build output
3. Verify code splitting is working
4. Monitor React DevTools Profiler

## Maintenance

### Regular Tasks
1. **Monitor cache sizes** - Ensure limits are appropriate
2. **Update cache version** - When making breaking changes
3. **Audit performance** - Monthly Lighthouse checks
4. **Review analytics** - Check cache hit rates if available

### When to Invalidate Cache
- Major version releases
- Critical bug fixes
- Breaking changes to data structures
- Security updates

## Additional Resources

- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Vite Build Optimization](https://vitejs.dev/guide/build.html)
- [React Performance](https://react.dev/reference/react/memo)
