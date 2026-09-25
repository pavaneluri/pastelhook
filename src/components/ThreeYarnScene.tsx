import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeYarnSceneProps {
  className?: string;
  cameraDistance?: number;
  height?: string | number;
}

export const ThreeYarnScene: React.FC<ThreeYarnSceneProps> = ({
  className = 'w-full h-full',
  cameraDistance = 9,
  height = '100%'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, cameraDistance);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting: Soft studio pastel ambiance
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const blueRim = new THREE.PointLight(0x87ceeb, 2.5, 20);
    blueRim.position.set(-6, -3, 4);
    scene.add(blueRim);

    const pinkRim = new THREE.PointLight(0xf8c8dc, 2.5, 20);
    pinkRim.position.set(6, 4, 3);
    scene.add(pinkRim);

    // Master Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Centerpiece: Realistic Stylized Crochet Yarn Ball
    const yarnBallGroup = new THREE.Group();
    mainGroup.add(yarnBallGroup);

    // Core sphere of the yarn ball
    const coreGeo = new THREE.SphereGeometry(1.65, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf7d6e0,
      roughness: 0.85,
      metalness: 0.05
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    yarnBallGroup.add(coreMesh);

    // Wrapped yarn strands around the ball (toruses and rings)
    const yarnColors = [0x87ceeb, 0xf8c8dc, 0xc8b6e2, 0xfbe7c6, 0xe2c2ff];
    for (let i = 0; i < 24; i++) {
      const strandRadius = 1.66 + Math.sin(i * 1.3) * 0.04;
      const tubeRadius = 0.065 + (i % 3) * 0.015;
      const strandGeo = new THREE.TorusGeometry(strandRadius, tubeRadius, 10, 48);
      const col = yarnColors[i % yarnColors.length];
      const strandMat = new THREE.MeshLambertMaterial({ color: col });
      const strandMesh = new THREE.Mesh(strandGeo, strandMat);

      strandMesh.rotation.x = i * 0.38 + Math.sin(i);
      strandMesh.rotation.y = i * 0.52;
      strandMesh.rotation.z = i * 0.25 + Math.cos(i);
      yarnBallGroup.add(strandMesh);
    }

    // 2. Trailing Loose Crochet Yarn Thread (Curved spiral out)
    const curvePoints: THREE.Vector3[] = [];
    for (let t = 0; t <= 40; t++) {
      const theta = t * 0.22;
      const rad = 1.7 + t * 0.08;
      const x = Math.cos(theta) * rad;
      const y = -1.2 - t * 0.07 + Math.sin(t * 0.5) * 0.2;
      const z = Math.sin(theta) * rad * 0.6;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const yarnCurve = new THREE.CatmullRomCurve3(curvePoints);
    const threadGeo = new THREE.TubeGeometry(yarnCurve, 60, 0.05, 8, false);
    const threadMat = new THREE.MeshLambertMaterial({ color: 0x87ceeb });
    const threadMesh = new THREE.Mesh(threadGeo, threadMat);
    yarnBallGroup.add(threadMesh);

    // 3. Floating 3D Crochet Petals / Flowers
    function createCrochetFlower(centerColor: number, petalColor: number, scale = 1) {
      const flowerGroup = new THREE.Group();

      // Center pistil
      const centerGeo = new THREE.SphereGeometry(0.24 * scale, 16, 16);
      const centerMat = new THREE.MeshStandardMaterial({ color: centerColor, roughness: 0.7 });
      const center = new THREE.Mesh(centerGeo, centerMat);
      flowerGroup.add(center);

      // 5 Crochet Petals
      const numPetals = 5;
      for (let p = 0; p < numPetals; p++) {
        const angle = (p / numPetals) * Math.PI * 2;
        const petalGeo = new THREE.SphereGeometry(0.26 * scale, 12, 12);
        petalGeo.scale(1.2, 0.5, 0.7);
        const petalMat = new THREE.MeshStandardMaterial({ color: petalColor, roughness: 0.6 });
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.position.x = Math.cos(angle) * (0.34 * scale);
        petal.position.y = Math.sin(angle) * (0.34 * scale);
        petal.rotation.z = angle;
        flowerGroup.add(petal);
      }
      return flowerGroup;
    }

    const flowers = [
      { f: createCrochetFlower(0xffe494, 0xc8b6e2, 1.1), pos: [-2.6, 1.8, 1.2], speed: 0.009, rotSpeed: 0.012 },
      { f: createCrochetFlower(0xffe494, 0xf8c8dc, 0.95), pos: [2.8, 1.4, 0.8], speed: 0.007, rotSpeed: -0.014 },
      { f: createCrochetFlower(0xffdfba, 0x87ceeb, 1.2), pos: [2.4, -2.0, 1.5], speed: 0.011, rotSpeed: 0.01 },
      { f: createCrochetFlower(0xffe494, 0xf8c8dc, 0.8), pos: [-2.4, -1.9, 0.5], speed: 0.008, rotSpeed: 0.016 },
      { f: createCrochetFlower(0xffd1dc, 0xc8b6e2, 0.7), pos: [-0.5, 2.5, -0.5], speed: 0.01, rotSpeed: -0.008 }
    ];

    flowers.forEach(item => {
      item.f.position.set(item.pos[0], item.pos[1], item.pos[2]);
      mainGroup.add(item.f);
    });

    // 4. Soft Pastel Floating Dream Orbs (Wool Bobbles)
    const bobbles: { mesh: THREE.Mesh; basePy: number; phase: number; speed: number }[] = [];
    const bobbleGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const bobbleColors = [0x87ceeb, 0xf8c8dc, 0xc8b6e2, 0xfff9f5];
    for (let b = 0; b < 28; b++) {
      const bMat = new THREE.MeshStandardMaterial({
        color: bobbleColors[b % bobbleColors.length],
        roughness: 0.5,
        transparent: true,
        opacity: 0.85
      });
      const bobble = new THREE.Mesh(bobbleGeo, bMat);
      const px = (Math.random() - 0.5) * 8.5;
      const py = (Math.random() - 0.5) * 6.5;
      const pz = (Math.random() - 0.5) * 4.0;
      bobble.position.set(px, py, pz);
      const sc = 0.5 + Math.random() * 0.9;
      bobble.scale.set(sc, sc, sc);
      mainGroup.add(bobble);
      bobbles.push({
        mesh: bobble,
        basePy: py,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.02
      });
    }

    // Mouse interactive rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseX = (clientX / rect.width) * 2 - 1;
      mouseY = -(clientY / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX * 0.5 - targetX) * 0.05;
      targetY += (mouseY * 0.5 - targetY) * 0.05;

      // Gentle yarn ball rotation
      yarnBallGroup.rotation.y = elapsedTime * 0.35 + targetX * 0.8;
      yarnBallGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + targetY * 0.8;
      yarnBallGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.18;

      // Animate floating flowers
      flowers.forEach((item, idx) => {
        item.f.rotation.z += item.rotSpeed;
        item.f.rotation.x = Math.sin(elapsedTime * 1.2 + idx) * 0.25;
        item.f.position.y = item.pos[1] + Math.sin(elapsedTime * 1.4 + idx * 1.5) * 0.22;
      });

      // Animate floating yarn bobbles
      bobbles.forEach(b => {
        b.mesh.position.y = b.basePy + Math.sin(elapsedTime * 1.2 + b.phase) * 0.35;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraDistance]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height }} />;
};
