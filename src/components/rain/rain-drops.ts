const CONFIGS = {
  maxDropNumbers: 60,
  degree: 0,
  stepLength: 20,
  dropMaxSpeed: 5,
};

export class RainDrops {
  private context: CanvasRenderingContext2D;
  private rains = new Set<Rain>();
  private drops = new Set<Drop>();
  private dropRemain: Drop[] = [];
  private rainRemain: Rain[] = [];
  private dpr: number = 1;
  private lastTimestamp: number = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    private rainShouldSplash?: (x: number, y: number) => boolean
  ) {
    this.context = canvas.getContext("2d")!;
    this.resetSize();

    this.context.clearRect(0, 0, canvas.width, canvas.height);

    window.addEventListener("resize", () => {
      this.resetSize();
    });
  }

  private resetSize() {
    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;

    const dpr = window.devicePixelRatio;
    this.dpr = dpr;

    const canvas = this.canvas;
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = logicalWidth + "px";
    canvas.style.height = logicalHeight + "px";

    this.context.scale(dpr, dpr);
  }

  private fillRains() {
    while (this.rains.size < CONFIGS.maxDropNumbers) {
      let rain = this.rainRemain.pop() ?? new Rain(this.canvas);
      rain.init();
      this.rains.add(rain);
    }
  }

  private animation(timestamp: number) {
    this.context.clearRect(
      0,
      0,
      this.canvas.width * this.dpr,
      this.canvas.height * this.dpr
    );

    // draw rains
    this.context.beginPath();
    this.rains.forEach((rain) => {
      const { degree } = CONFIGS;

      let middleSplash = this.rainShouldSplash?.(
        rain.x,
        rain.y + rain.height
      );

      if (rain.y * this.dpr > this.canvas.height || middleSplash) {
        if (!middleSplash) {
          this.splashRain(rain);
        }

        this.rains.delete(rain);
        this.rainRemain.push(rain);
      }

      rain.step(timestamp);

      this.context.moveTo(rain.x, rain.y);
      this.context.lineTo(
        rain.x - Math.sin(degree) * rain.height,
        rain.y + rain.height
      );
    });

    this.context.lineWidth = 2;
    this.context.stroke();

    // draw drops
    this.drops.forEach((drop) => {
      if (drop.y * this.dpr > this.canvas.height + drop.radius) {
        this.drops.delete(drop);
        this.dropRemain.push(drop);
      }

      drop.step(timestamp);

      var realX = drop.x - drop.radius;
      var realY = drop.y - drop.radius;

      this.context.drawImage(drop.canvas, realX, realY);
    });

    this.fillRains();
  }

  private splashRain(rain: Rain) {
    for (let i = 0; i < getRandomArbitrary(6, 16); i++) {
      let drop = this.dropRemain.pop() ?? new Drop();

      drop.init(rain.x, this.canvas.height / this.dpr);

      this.drops.add(drop);
    }
  }

  run() {
    requestAnimationFrame((timestamp) => {
      let frameTime = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      this.animation(frameTime);
      this.run();
    });
  }
}

interface Animator {
  step(timestamp: number): void;
}

class Rain implements Animator {
  x!: number;
  y!: number;
  height!: number;
  width!: number;
  speed: number = CONFIGS.stepLength;
  deep: number = getRandomArbitrary(0, 10);

  get canvasHeight(): number {
    return this.canvas.height;
  }

  get canvasWidth(): number {
    return this.canvas.width;
  }

  constructor(private canvas: HTMLCanvasElement) {
    // console.log("init rain");
    this.speed -= this.deep;
  }

  init() {
    this.x = getRandomArbitrary(
      -this.canvasHeight * Math.tan(CONFIGS.degree),
      this.canvasWidth
    );
    this.y = Math.floor(Math.random() * -this.canvasHeight);
    this.width = 2;
    this.height = getRandomArbitrary(20, 40);
  }

  step(timestamp: number) {
    const { degree } = CONFIGS;

    this.y += this.speed * (timestamp / 16.67);
    this.x += Math.floor(this.speed * Math.tan(degree));
  }
}

class Drop implements Animator {
  x!: number;
  y!: number;

  radius!: number;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  private speedX!: number;
  private speedY!: number;

  constructor() {
    // console.log("init drop");
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;

    var angle = Math.random() * Math.PI - Math.PI * 0.5;
    var speed = Math.random() * CONFIGS.dropMaxSpeed;
    this.speedX = Math.sin(angle) * speed;
    this.speedY = -Math.cos(angle) * speed;

    this.radius = Math.round(Math.random() * 2 + 1);

    // render once and cache
    var diameter = this.radius * 2;
    this.canvas.width = diameter;
    this.canvas.height = diameter;

    var grd = this.context.createRadialGradient(
      this.radius,
      this.radius,
      1,
      this.radius,
      this.radius,
      this.radius
    );
    grd.addColorStop(0, "rgba(0, 0, 0)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0)");
    this.context.fillStyle = grd;
    this.context.fillRect(0, 0, diameter, diameter);
  }

  init(x: number, canvasHeight: number) {
    this.x = x;
    this.y = canvasHeight;

    var angle = Math.random() * Math.PI - Math.PI * 0.5;
    var speed = Math.random() * CONFIGS.dropMaxSpeed;
    this.speedX = Math.sin(angle) * speed;
    this.speedY = -Math.cos(angle) * speed;
  }

  step(timestamp: number) {
    // TODO:
    const wind = 0;

    const { dropMaxSpeed, stepLength } = CONFIGS;

    // TODO:
    const multiplier = 1 * (timestamp / 16.67);

    this.x += this.speedX * multiplier;
    this.y += this.speedY * multiplier;
    // apply gravity - magic number 0.3 represents a faked gravity constant
    this.speedY += 0.3 * multiplier;
    // apply wind (but scale back the force)
    this.speedX += (wind / 25) * multiplier;
    if (this.speedX < -dropMaxSpeed) {
      this.speedX = -dropMaxSpeed;
    } else if (this.speedX > dropMaxSpeed) {
      this.speedX = dropMaxSpeed;
    }
  }
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
