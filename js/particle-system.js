// js/particle-system.js
class ParticleSystem {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('particle-canvas'), alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.particles = [];
    this.initParticles();
    this.camera.position.z = 5;
    this.animate();
  }

  initParticles() {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Random colors: gold, pink, purple
      colors[i * 3] = Math.random() > 0.5 ? 1 : Math.random() * 0.5 + 0.5; // R
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5; // G
      colors[i * 3 + 2] = Math.random() > 0.5 ? 1 : 0.5; // B

      sizes[i] = Math.random() * 3 + 1;
      this.particles.push({
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        vz: (Math.random() - 0.5) * 0.1,
        life: 0,
        maxLife: Math.random() * 100 + 50
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });

    this.particleMesh = new THREE.Points(geometry, material);
    this.scene.add(this.particleMesh);
  }

  burst() {
    this.particleMesh.material.opacity = 1;
    this.particles.forEach((p, i) => {
      const pos = this.particleMesh.geometry.attributes.position.array;
      const dir = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.05 + 0.02;
      p.vx = Math.cos(dir) * speed;
      p.vy = Math.sin(dir) * speed;
      p.vz = (Math.random() - 0.5) * 0.02;
      p.life = 0;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.particles.forEach((p, i) => {
      if (p.life < p.maxLife) {
        const pos = this.particleMesh.geometry.attributes.position.array;
        pos[i * 3] += p.vx;
        pos[i * 3 + 1] += p.vy;
        pos[i * 3 + 2] += p.vz;
        p.life++;
        this.particleMesh.material.opacity = 1 - (p.life / p.maxLife);
      }
    });
    this.particleMesh.geometry.attributes.position.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }

  subtleMotion() {
    // Gentle floating for background
    this.particles.forEach((p, i) => {
      p.vy += 0.0001; // Slow upward drift
      const pos = this.particleMesh.geometry.attributes.position.array;
      pos[i * 3 + 1] += p.vy;
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5;
    });
    this.particleMesh.geometry.attributes.position.needsUpdate = true;
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}