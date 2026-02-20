# Three.js & React Three Fiber

3D graphics and WebGL development for React applications.

## When to Use

Use this capability when:
- Building 3D product configurators or viewers
- Creating interactive 3D visualizations
- Adding immersive experiences to web apps
- Working with WebGL in React

## Installation

```bash
npm install three @react-three/fiber @react-three/drei
```

## Core Concepts

### Scene Setup (R3F)
```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Mesh />
      <OrbitControls />
    </Canvas>
  );
}

function Mesh() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
```

### Performance Tips

| Technique | Implementation |
|:----------|:---------------|
| Instancing | Use `<Instances>` for repeated objects |
| LOD | Level of Detail for distant objects |
| Texture compression | Use KTX2, WebP formats |
| Shadow optimization | Use baked shadows when possible |
| Frustum culling | Let R3F handle automatically |

### Loading 3D Models
```tsx
import { useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Preload for better UX
useGLTF.preload('/model.glb');
```

## Integration with Next.js

```tsx
// Use dynamic import for SSR compatibility
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function Page() {
  return <Scene />;
}
```

## Best Practices

- Always use `drei` helpers (they're optimized)
- Implement loading states for large models
- Use `Suspense` for progressive loading
- Optimize geometries and textures
- Consider mobile performance (reduce polygon count)
