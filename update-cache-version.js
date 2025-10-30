#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const SERVICE_WORKER_PATH = join(process.cwd(), 'public', 'service-worker.js');

function updateCacheVersion() {
  try {
    const content = readFileSync(SERVICE_WORKER_PATH, 'utf-8');
    
    const versionMatch = content.match(/const CACHE_VERSION = '(v\d+\.\d+\.\d+)'/);
    
    if (!versionMatch) {
      console.error('❌ Could not find CACHE_VERSION in service-worker.js');
      process.exit(1);
    }
    
    const currentVersion = versionMatch[1];
    const [, major, minor, patch] = currentVersion.match(/v(\d+)\.(\d+)\.(\d+)/);
    
    const newPatch = parseInt(patch) + 1;
    const newVersion = `v${major}.${minor}.${newPatch}`;
    
    const updatedContent = content.replace(
      /const CACHE_VERSION = 'v\d+\.\d+\.\d+'/,
      `const CACHE_VERSION = '${newVersion}'`
    );
    
    writeFileSync(SERVICE_WORKER_PATH, updatedContent, 'utf-8');
    
    console.log(`✅ Cache version updated: ${currentVersion} → ${newVersion}`);
    console.log('');
    console.log('📝 Next steps:');
    console.log('   1. Test the changes locally');
    console.log('   2. Rebuild: npm run build');
    console.log('   3. Deploy to production');
    console.log('');
    console.log('💡 Users will receive the update automatically on next visit');
    
  } catch (error) {
    console.error('❌ Error updating cache version:', error.message);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Cache Version Update Script
===========================

Usage: node update-cache-version.js [options]

Options:
  --help, -h    Show this help message

Description:
  Automatically increments the patch version of the service worker cache.
  This forces all clients to update their cached assets on next visit.

Example:
  $ node update-cache-version.js
  ✅ Cache version updated: v1.0.0 → v1.0.1

When to use:
  - After deploying bug fixes
  - When assets have changed
  - To force cache refresh for all users
  `);
  process.exit(0);
}

updateCacheVersion();
