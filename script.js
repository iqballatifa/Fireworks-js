const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const projectiles = [];
const particles = [];

class Particle {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.velocityX = Math.random() * 3 - 1.5;
    this.velocityY = Math.random() * 3 - 1.5;
    this.radius = Math.random() * 6 + 3;
    this.color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  }
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.radius -= 0.04;
    this.draw();
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 360);
    ctx.fill();
  }
}

class Projectile {
  constructor(x) {
    this.x = x;
    this.y = canvas.height - 40;
    this.radius = 6;
  }
  update() {
    this.y -= 5;
    this.radius -= 0.03;
    this.draw();
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 360);
    ctx.fill();
  }
}

canvas.addEventListener("click", function(event) {
  let projectile = new Projectile(event.x);
  projectiles.push(projectile);
})

function loopHandler() {
  for (let i = 0; i < projectiles.length; i++) {
    if (projectiles[i].y < Math.random() * 10 + 100) {
      console.log(Math.random());
      for (let j = 0; j < 80; j++) {
        particles.push(new Particle(projectiles[i].x, projectiles[i].y));
      }
      projectiles.splice(i, 1);
  
    } else {
      projectiles[i].update();
    }
  }
  let prtcls = particles.filter(object=>object.radius > 1);
  prtcls.forEach(object=>object.update());
}

function run() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  loopHandler();
  requestAnimationFrame(run);
}

run()