class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById("particle-canvas");

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 5;

    this.particles = [];
    this.initParticles();

    window.addEventListener("resize", () => this.resize());

    this.animate();
  }

  initParticles() {
    const count = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      colors[i * 3] = 1;
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 2] = Math.random() > 0.5 ? 1 : 0.6;

      this.particles.push({
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        maxLife: Math.random() * 80 + 60
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.mesh = new THREE.Points(geometry, this.material);
    this.scene.add(this.mesh);
  }

  burst() {
    this.material.opacity = 1;
    this.particles.forEach(p => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.08 + 0.02;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.vz = (Math.random() - 0.5) * 0.04;
      p.life = 0;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    let alive = 0;
    const pos = this.mesh.geometry.attributes.position.array;

    this.particles.forEach((p, i) => {
      if (p.life < p.maxLife) {
        pos[i * 3] += p.vx;
        pos[i * 3 + 1] += p.vy;
        pos[i * 3 + 2] += p.vz;
        p.life++;
        alive++;
      }
    });

    this.material.opacity = alive / this.particles.length;
    this.mesh.geometry.attributes.position.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
