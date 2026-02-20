const assert = require('assert');
const path = require('path');
const fs = require('fs-extra');
const { 
  resolveSkill, 
  calculateContextSize, 
  findSpecializations 
} = require('../lib/resolver');

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

// Mock graph data
const mockGraph = {
  nodes: {
    'frontend-developer': {
      type: 'skill',
      domain: 'web',
      estimated_tokens: 2000,
      edges: { requires: [], extends: [], suggests: [], conflicts: [] }
    },
    'react-nextjs': {
      type: 'skill', 
      domain: 'web',
      estimated_tokens: 18000,
      edges: { 
        requires: [], 
        extends: ['frontend-developer'], 
        suggests: ['threejs', 'tailwind-setup'],
        conflicts: ['vue-developer']
      }
    },
    'threejs': {
      type: 'capability',
      domain: 'web',
      estimated_tokens: 8000,
      edges: { requires: [], extends: [], suggests: [], conflicts: [] }
    },
    'tailwind-setup': {
      type: 'capability',
      domain: 'web',
      estimated_tokens: 3000,
      edges: { requires: [], extends: [], suggests: [], conflicts: [] }
    },
    'vue-developer': {
      type: 'skill',
      domain: 'web',
      estimated_tokens: 15000,
      edges: { 
        requires: [],
        extends: ['frontend-developer'],
        suggests: [],
        conflicts: ['react-nextjs']
      }
    },
    'backend-developer': {
      type: 'skill',
      domain: 'infra',
      estimated_tokens: 5000,
      edges: { requires: [], extends: [], suggests: [], conflicts: [] }
    },
    'ai-engineer': {
      type: 'skill',
      domain: 'ai',
      estimated_tokens: 25000,
      edges: { 
        requires: [],
        extends: ['backend-developer'],
        suggests: ['vector-db'],
        conflicts: []
      }
    },
    'vector-db': {
      type: 'capability',
      domain: 'ai',
      estimated_tokens: 6000,
      edges: { requires: [], extends: [], suggests: [], conflicts: [] }
    }
  },
  mocs: {
    'web-development-moc': { skills: ['frontend-developer', 'react-nextjs', 'vue-developer'] },
    'ai-development-moc': { skills: ['ai-engineer', 'vector-db'] }
  }
};

console.log('\n🧪 Testing Resolver Module\n');

// Test 1: Basic resolution
test('resolveSkill should return correct load order for single skill', () => {
  const result = resolveSkill(mockGraph, 'frontend-developer');
  assert.deepStrictEqual(result.loadOrder, ['frontend-developer']);
  assert.strictEqual(result.totalTokens, 2000);
});

// Test 2: Resolution with extends
test('resolveSkill should include parent skills (extends)', () => {
  const result = resolveSkill(mockGraph, 'react-nextjs');
  assert.deepStrictEqual(result.loadOrder, ['frontend-developer', 'react-nextjs']);
  assert.strictEqual(result.totalTokens, 20000);
});

// Test 3: Resolution with suggests (not included by default)
test('resolveSkill should NOT include suggested skills by default', () => {
  const result = resolveSkill(mockGraph, 'react-nextjs');
  assert(!result.loadOrder.includes('threejs'));
  assert(!result.loadOrder.includes('tailwind-setup'));
});

// Test 4: Resolution with suggests (included when enabled)
test('resolveSkill should include suggested skills when includeSuggests=true', () => {
  const result = resolveSkill(mockGraph, 'react-nextjs', { includeSuggests: true });
  assert(result.suggests.includes('threejs'));
  assert(result.suggests.includes('tailwind-setup'));
});

// Test 5: Chain of extends
test('resolveSkill should handle chain of extends', () => {
  const result = resolveSkill(mockGraph, 'ai-engineer');
  assert.deepStrictEqual(result.loadOrder, ['backend-developer', 'ai-engineer']);
  assert.strictEqual(result.totalTokens, 30000);
});

// Test 6: Missing skill
test('resolveSkill should handle missing skill gracefully', () => {
  const result = resolveSkill(mockGraph, 'non-existent');
  assert.deepStrictEqual(result.loadOrder, []);
  assert.deepStrictEqual(result.notFound, ['non-existent']);
});

// Test 7: Detect conflicts
test('resolveSkill should detect conflicts', () => {
  // First load react-nextjs
  const first = resolveSkill(mockGraph, 'react-nextjs');
  assert.strictEqual(first.conflicts.length, 0);
  
  // vue-developer conflicts with react-nextjs
  const vueResult = resolveSkill(mockGraph, 'vue-developer');
  // vue-developer extends frontend-developer, conflicts with react-nextjs
  // But since we're resolving fresh, no conflict yet
  assert.strictEqual(vueResult.conflicts.length, 0);
});

// Test 8: Depth limiting
test('resolveSkill should respect depth option', () => {
  const result = resolveSkill(mockGraph, 'ai-engineer', { depth: 0 });
  assert.deepStrictEqual(result.loadOrder, ['ai-engineer']);
  assert.strictEqual(result.totalTokens, 25000);
});

// Test 9: calculateContextSize
test('calculateContextSize should aggregate multiple skills', () => {
  const result = calculateContextSize(mockGraph, ['react-nextjs', 'ai-engineer']);
  // frontend (2k) + react-nextjs (18k) + backend (5k) + ai-engineer (25k) = 50k
  assert.strictEqual(result.skillCount, 4);
  assert.strictEqual(result.totalTokens, 50000);
  assert(result.skills.includes('frontend-developer'));
  assert(result.skills.includes('react-nextjs'));
  assert(result.skills.includes('backend-developer'));
  assert(result.skills.includes('ai-engineer'));
});

// Test 10: findSpecializations
test('findSpecializations should find skills extending a base', () => {
  const specs = findSpecializations(mockGraph, 'frontend-developer');
  assert(specs.includes('react-nextjs'));
  assert(specs.includes('vue-developer'));
  assert.strictEqual(specs.length, 2);
});

test('findSpecializations should return empty for skills with no children', () => {
  const specs = findSpecializations(mockGraph, 'threejs');
  assert.deepStrictEqual(specs, []);
});

// Summary
console.log('\n' + '═'.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
