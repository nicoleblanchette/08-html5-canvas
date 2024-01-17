import './style.css';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55'
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.globalCompositeOperation = 'lighten';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const draw = (e) => {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 75%, 60%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;

  hue++;
  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 12) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
};


const handleMouseDown = (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
};

const main = () => {
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);
};
main();