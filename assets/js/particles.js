const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const maxParticles = 80;

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 0.5;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.4 + 0.1;
}

Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) this.size -= 0.03;
    this.opacity *= 0.99;
};

Particle.prototype.draw = function () {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                const alpha = 0.08 * (1 - distance / 120);
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function createParticles(e) {
    const xPos = e.clientX;
    const yPos = e.clientY;
    for (let i = 0; i < 3; i++) {
        if (particles.length < maxParticles) {
            particles.push(new Particle(xPos, yPos));
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    connectParticles();
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.1) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('mousemove', createParticles);
animateParticles();
