const assert = require('assert');
const { execSync } = require('child_process');
const path = require('path');

// Test utilities
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ❌ ${name}`);
    console.log(`     ${err.message}`);
    failed++;
  }
}

function testAsync(name, fn) {
  return new Promise(async (resolve) => {
    try {
      await fn();
      console.log(`  ✅ ${name}`);
      passed++;
    } catch (err) {
      console.log(`  ❌ ${name}`);
      console.log(`     ${err.message}`);
      failed++;
    }
    resolve();
  });
}

const CLI = path.join(__dirname, '..', 'bin', 'anti-chaotic.js');

function runCLI(args) {
  return execSync(`node ${CLI} ${args}`, { encoding: 'utf-8' });
}

console.log('\n🧪 Testing CLI Integration\n');

// Test 1: Help command
test('CLI should show help', () => {
  const output = runCLI('--help');
  assert(output.includes('Anti-Chaotic'));
  assert(output.includes('init'));
  assert(output.includes('resolve'));
  assert(output.includes('graph'));
});

// Test 2: Version command
test('CLI should show version', () => {
  const output = runCLI('--version');
  assert(output.includes('2.0.0'));
});

// Test 3: Graph stats command
test('CLI graph --stats should show statistics', () => {
  const output = runCLI('graph --stats');
  assert(output.includes('Total skills'));
  assert(output.includes('Total MOCs'));
});

// Test 4: Graph list command
test('CLI graph --list should list all skills', () => {
  const output = runCLI('graph --list');
  assert(output.includes('frontend-developer'));
  assert(output.includes('ai-engineer'));
});

// Test 5: Graph MOCs command
test('CLI graph --mocs should list MOCs', () => {
  const output = runCLI('graph --mocs');
  assert(output.includes('Maps of Content'));
});

// Test 6: Resolve command
test('CLI resolve should show load order', () => {
  const output = runCLI('resolve prompt-engineer');
  assert(output.includes('Resolution for [[prompt-engineer]]'));
  assert(output.includes('Load Order'));
  assert(output.includes('ai-engineer'));
});

// Test 7: Resolve with suggests (ai-engineer has suggestions)
test('CLI resolve --suggests should include suggestions', () => {
  const output = runCLI('resolve ai-engineer --suggests');
  assert(output.includes('Suggested') || output.includes('💡'));
});

// Test 8: Resolve missing skill (should show error but not crash)
test('CLI resolve should handle missing skill', () => {
  try {
    runCLI('resolve non-existent-skill-xyz');
    assert.fail('Should have thrown');
  } catch (err) {
    // Command throws but we can check stdout or status
    const output = err.stdout || err.stderr || err.message || '';
    assert(output.includes('not found') || err.status !== 0);
  }
});

// Summary
setTimeout(() => {
  console.log('\n' + '═'.repeat(50));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    process.exit(1);
  }
}, 100);
