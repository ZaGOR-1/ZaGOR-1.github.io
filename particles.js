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

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    particles.push(new Particle(mouse.x, mouse.y));
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.opacity = 0.3; // Змінено непрозорість
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
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
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

animate();
