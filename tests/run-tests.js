#!/usr/bin/env node
/**
 * Test Runner for Anti-Chaotic CLI
 * Usage: node tests/run-tests.js
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('\n' + '═'.repeat(60));
console.log('🧪 Anti-Chaotic CLI Test Suite');
console.log('═'.repeat(60));

const tests = [
  { name: 'Resolver', file: 'resolver.test.js' },
  { name: 'Detector', file: 'detector.test.js' },
  { name: 'Integration', file: 'integration.test.js' }
];

let totalPassed = 0;
let totalFailed = 0;

for (const test of tests) {
  console.log(`\n📦 Running ${test.name} Tests...\n`);
  try {
    const output = execSync(`node ${path.join(__dirname, test.file)}`, {
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    console.log(output);
    
    // Parse results from output
    const match = output.match(/Results: (\d+) passed, (\d+) failed/);
    if (match) {
      totalPassed += parseInt(match[1]);
      totalFailed += parseInt(match[2]);
    }
  } catch (err) {
    console.log(err.stdout || err.message);
    totalFailed++;
  }
}

console.log('\n' + '═'.repeat(60));
console.log('📊 FINAL RESULTS');
console.log('═'.repeat(60));
console.log(`  Total Passed: ${totalPassed}`);
console.log(`  Total Failed: ${totalFailed}`);

if (totalFailed > 0) {
  console.log('\n  ❌ Some tests failed');
  process.exit(1);
} else {
  console.log('\n  ✅ All tests passed!');
}
