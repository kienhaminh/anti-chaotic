const assert = require('assert');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { detectTechStack, generateRecommendationMessage } = require('../lib/detector');

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

async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ❌ ${name}`);
    console.log(`     ${err.message}`);
    failed++;
  }
}

// Create temp project helper
async function createTempProject(packageJson = {}) {
  const tmpDir = path.join(os.tmpdir(), `anti-chaotic-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  await fs.ensureDir(tmpDir);
  if (Object.keys(packageJson).length > 0) {
    await fs.writeJson(path.join(tmpDir, 'package.json'), packageJson, { spaces: 2 });
  }
  return tmpDir;
}

async function cleanup(dir) {
  await fs.remove(dir);
}

console.log('\n🧪 Testing Detector Module\n');

// Test 1: Empty project
(async () => {
  const tmpDir = await createTempProject({});
  
  await testAsync('detectTechStack should handle empty package.json', async () => {
    const detected = await detectTechStack(tmpDir);
    assert.deepStrictEqual(detected.frameworks, []);
    assert.deepStrictEqual(detected.suggestedSkills, []);
    assert.strictEqual(detected.suggestedProfile, null);
  });
  
  await cleanup(tmpDir);
})();

// Test 2: React project
(async () => {
  const tmpDir = await createTempProject({
    dependencies: { react: '^18.2.0' }
  });
  
  await testAsync('detectTechStack should detect React', async () => {
    const detected = await detectTechStack(tmpDir);
    assert(detected.frameworks.includes('React'));
    assert(detected.suggestedSkills.includes('frontend-developer'));
  });
  
  await cleanup(tmpDir);
})();

// Test 3: Next.js project
(async () => {
  const tmpDir = await createTempProject({
    dependencies: { next: '^14.0.0', react: '^18.2.0' }
  });
  
  await testAsync('detectTechStack should detect Next.js', async () => {
    const detected = await detectTechStack(tmpDir);
    assert(detected.frameworks.includes('Next.js'));
    assert(detected.suggestedSkills.includes('react-nextjs'));
    assert.strictEqual(detected.suggestedProfile, 'frontend-developer');
  });
  
  await cleanup(tmpDir);
})();

// Test 4: Expo/Mobile project
(async () => {
  const tmpDir = await createTempProject({
    dependencies: { expo: '^50.0.0', 'expo-router': '~3.0.0' }
  });
  
  await testAsync('detectTechStack should detect Expo mobile project', async () => {
    const detected = await detectTechStack(tmpDir);
    assert(detected.frameworks.includes('Expo'));
    assert(detected.platforms.includes('mobile'));
    assert(detected.suggestedSkills.includes('mobile-developer'));
    assert.strictEqual(detected.suggestedProfile, 'mobile-developer');
  });
  
  await cleanup(tmpDir);
})();

// Test 5: Remotion project
(async () => {
  const tmpDir = await createTempProject({
    dependencies: { remotion: '^4.0.0' }
  });
  
  await testAsync('detectTechStack should detect Remotion', async () => {
    const detected = await detectTechStack(tmpDir);
    assert(detected.frameworks.includes('Remotion'));
    assert(detected.features.includes('video'));
    assert(detected.suggestedSkills.includes('remotion-best-practices'));
  });
  
  await cleanup(tmpDir);
})();

// Test 6: AI/LLM project
(async () => {
  const tmpDir = await createTempProject({
    dependencies: { openai: '^4.0.0', langchain: '^0.1.0' }
  });
  
  await testAsync('detectTechStack should detect AI project', async () => {
    const detected = await detectTechStack(tmpDir);
    assert(detected.features.includes('AI/LLM'));
    assert(detected.suggestedSkills.includes('ai-engineer'));
    assert.strictEqual(detected.suggestedProfile, 'ai-engineer');
  });
  
  await cleanup(tmpDir);
})();

// Test 7: Fullstack SaaS (Next.js + backend)
(async () => {
  const tmpDir = await createTempProject({
    dependencies: { 
      next: '^14.0.0',
      prisma: '^5.0.0',
      '@prisma/client': '^5.0.0'
    }
  });
  
  await testAsync('detectTechStack should detect Fullstack SaaS', async () => {
    const detected = await detectTechStack(tmpDir);
    assert(detected.frameworks.includes('Next.js'));
    assert(detected.features.includes('database'));
    assert(detected.suggestedSkills.includes('react-nextjs'));
    assert(detected.suggestedSkills.includes('backend-developer'));
    assert.strictEqual(detected.suggestedProfile, 'fullstack-saas');
  });
  
  await cleanup(tmpDir);
})();

// Test 8: Three.js project
(async () => {
  const tmpDir = await createTempProject({
    dependencies: { three: '^0.160.0', '@react-three/fiber': '^8.0.0' }
  });
  
  await testAsync('detectTechStack should detect Three.js', async () => {
    const detected = await detectTechStack(tmpDir);
    assert(detected.features.includes('3D'));
    assert(detected.suggestedSkills.includes('threejs'));
  });
  
  await cleanup(tmpDir);
})();

// Test 9: TypeScript detection
(async () => {
  const tmpDir = await createTempProject({
    devDependencies: { typescript: '^5.0.0' }
  });
  
  await testAsync('detectTechStack should detect TypeScript', async () => {
    const detected = await detectTechStack(tmpDir);
    assert(detected.languages.includes('TypeScript'));
  });
  
  await cleanup(tmpDir);
})();

// Test 10: Output message generation
test('generateRecommendationMessage should format output', () => {
  const detected = {
    frameworks: ['Next.js', 'React'],
    languages: ['TypeScript'],
    features: ['Tailwind CSS'],
    platforms: [],
    suggestedSkills: ['react-nextjs'],
    suggestedProfile: 'frontend-developer'
  };
  
  const message = generateRecommendationMessage(detected);
  assert(message.includes('Next.js'));
  assert(message.includes('React'));
  assert(message.includes('frontend-developer'));
  assert(message.includes('📊'));
});

test('generateRecommendationMessage should handle empty detection', () => {
  const detected = {
    frameworks: [],
    languages: [],
    features: [],
    platforms: [],
    suggestedSkills: [],
    suggestedProfile: null
  };
  
  const message = generateRecommendationMessage(detected);
  assert(message.includes('📊'));
});

// Wait for async tests to complete
setTimeout(() => {
  console.log('\n' + '═'.repeat(50));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    process.exit(1);
  }
}, 1000);
