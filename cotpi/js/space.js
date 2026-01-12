const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* Stars */
const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5
}));

let angle = 0;

function drawStars() {
    ctx.fillStyle = "#fff";
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    });
}

function planet(size, orbit, speed, color) {
    const x = canvas.width / 2 + Math.cos(angle * speed) * orbit;
    const y = canvas.height / 2 + Math.sin(angle * speed) * orbit;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();

    planet(6, 120, 0.4, "#cccccc"); // moon
    planet(10, 200, 0.25, "#4da6ff");
    planet(8, 280, 0.18, "#ffa500");

    angle += 0.002;
    requestAnimationFrame(animate);
}

animate();
