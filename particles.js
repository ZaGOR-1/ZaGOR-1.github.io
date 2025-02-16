const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const particles = [];
const mouse = { x: null, y: null };
const MAX_PARTICLES = 300; // Ліміт частинок

window.addEventListener("resize", () => {
    requestAnimationFrame(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 3; i++) { // Додаємо кілька частинок для ефекту
        particles.push(new Particle(mouse.x, mouse.y));
    }
    if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
    }
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.005; // Більш плавне зникнення
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    particles.forEach(p => p.draw());
    particles.filter(p => p.opacity > 0); // Оптимізоване видалення частинок
    requestAnimationFrame(animate);
}

animate();
