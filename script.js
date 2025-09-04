// Canvas Setup
const loveCanvas = document.getElementById("love-particles");
const loveCtx = loveCanvas.getContext("2d");

const starCanvas = document.getElementById("star-title");
const starCtx = starCanvas.getContext("2d");

loveCanvas.width = starCanvas.width = window.innerWidth;
loveCanvas.height = starCanvas.height = window.innerHeight;

// ========================
// Bintang Judul "LOFYU MYOW"
// ========================
const titleText = "LOFYU MYOW";
let starParticles = [];

function createStarParticles() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  starParticles = [];

  starCtx.font = "bold 60px Times New Roman";
  starCtx.fillStyle = "white";
  starCtx.textAlign = "center";
  starCtx.fillText(titleText, starCanvas.width / 2, 100);

  const imageData = starCtx.getImageData(0, 0, starCanvas.width, 200);
  for (let y = 0; y < imageData.height; y += 6) {
    for (let x = 0; x < imageData.width; x += 6) {
      const index = (y * imageData.width + x) * 4;
      if (imageData.data[index + 3] > 128) {
        starParticles.push({
          x: x,
          y: y,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.5
        });
      }
    }
  }
}

function drawStarParticles() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  starParticles.forEach(p => {
    starCtx.beginPath();
    starCtx.fillStyle = `rgba(173, 216, 230, ${p.opacity})`;
    starCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    starCtx.fill();
  });
  requestAnimationFrame(drawStarParticles);
}

createStarParticles();
drawStarParticles();

// ========================
// Love Particle dari Bawah
// ========================
let loveParticles = [];

function createLoveParticles() {
  for (let i = 0; i < 100; i++) {
    loveParticles.push({
      x: Math.random() * loveCanvas.width,
      y: loveCanvas.height + Math.random() * 100,
      size: 15 + Math.random() * 5,
      speed: 1 + Math.random() * 2,
      opacity: 1,
    });
  }
}

function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(
    x, y,
    x - size / 2, y,
    x - size / 2, y + topCurveHeight
  );
  ctx.bezierCurveTo(
    x - size / 2, y + (size + topCurveHeight) / 2,
    x, y + (size + topCurveHeight) / 2,
    x, y + size
  );
  ctx.bezierCurveTo(
    x, y + (size + topCurveHeight) / 2,
    x + size / 2, y + (size + topCurveHeight) / 2,
    x + size / 2, y + topCurveHeight
  );
  ctx.bezierCurveTo(
    x + size / 2, y,
    x, y,
    x, y + topCurveHeight
  );
  ctx.closePath();
  ctx.fillStyle = `rgba(255,105,180,0.7)`;
  ctx.fill();
}

function animateLoveParticles() {
  loveCtx.clearRect(0, 0, loveCanvas.width, loveCanvas.height);
  loveParticles.forEach((p, i) => {
    p.y -= p.speed;
    p.opacity -= 0.0010;
    if (p.opacity <= 0) {
      loveParticles.splice(i, 1);
    } else {
      drawHeart(loveCtx, p.x, p.y, p.size);
    }
  });
  requestAnimationFrame(animateLoveParticles);
}

// ========================
// Event Handling
// ========================
const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");
const message = document.getElementById("message");

function showLoveParticles() {
  createLoveParticles();
  animateLoveParticles();
}

btn1.addEventListener("click", () => {
  showLoveParticles();
  setTimeout(() => {
    btn1.classList.add("hidden");
    btn2.classList.remove("hidden");
  }, 2000);
});

btn2.addEventListener("click", () => {
  showLoveParticles();
  btn2.classList.add("hidden");
  message.classList.remove("hidden");
  message.innerText =
    "I LOVE YOU PEGA DARI BLIAN, BLIAN CUMA BISA KASI INI YA UNTUK SEMENTARA HEHE, DOAIN YANG TERBAIK YA BUAT DIRIMU SENDIRI, BUAT KELUARGA MU, BUAT TEMAN-TEMAN BAIK MU, BUAT SEMUA ORANG BAIK, DAN BUAT AKU YA BUBB WKWK, KAMU  DISANA BELAJAR YANG BENAR YA SERIUS, LALU JAN LUPA JAGA KESEHATAN DAN JAGA DIRI YA, BLIAN DISINI JUGA GITU KOK WKWK DUHAI UDH ITU AJA YA PESAN KU HAPPY BIRTHDAY MYSWITIHONYECUTIEPATOOTIEMWHLFY";
  setTimeout(() => {
    btn3.classList.remove("hidden");
  }, 3000);
});

btn3.addEventListener("click", () => {
  showLoveParticles();
  message.classList.add("hidden");
  btn3.classList.add("hidden");
  btn1.classList.remove("hidden");
});
