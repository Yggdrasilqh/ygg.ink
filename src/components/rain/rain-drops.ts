const CONFIGS = {
  maxDropNumbers: 30,
  degree: 0,
  stepLength: 20,
  dropMaxSpeed: 5,
};

interface Animator {
  step(): void;
}

class Rain implements Animator {
  x!: number;
  y!: number;
  height!: number;
  width!: number;

  constructor(private canvasHeight: number, private canvasWidth: number) {
    // console.log("init rain");
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

  step() {
    const { stepLength, degree } = CONFIGS;

    this.y += stepLength;
    this.x += Math.floor(stepLength * Math.tan(degree));
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

  step() {
    // TODO:
    const wind = 0;

    const { dropMaxSpeed, stepLength } = CONFIGS;

    // TODO:
    const multiplier = 1;

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

export class RainDrops {
  private context: CanvasRenderingContext2D;
  private rains = new Set<Rain>();
  private drops = new Set<Drop>();
  private dropRemain: Drop[] = [];
  private rainRemain: Rain[] = [];
  private dpr: number;

  constructor(
    private canvas: HTMLCanvasElement,
    private rainShouldSplash?: (x: number, y: number) => boolean
  ) {
    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;

    const dpr = window.devicePixelRatio;
    this.dpr = dpr;

    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = logicalWidth + "px";
    canvas.style.height = logicalHeight + "px";

    canvas.getContext("2d")!;

    this.context = canvas.getContext("2d")!;

    this.context.scale(dpr, dpr);

    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  private fillRains() {
    while (this.rains.size < CONFIGS.maxDropNumbers) {
      let rain =
        this.rainRemain.pop() ??
        new Rain(this.canvas.height, this.canvas.width);
      rain.init();
      this.rains.add(rain);
    }
  }

  private animation() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw rains
    this.context.beginPath();
    this.rains.forEach((rain) => {
      const { degree } = CONFIGS;

      let middleSplash = this.rainShouldSplash?.(rain.x, rain.y + rain.height);

      if (rain.y * this.dpr > this.canvas.height || middleSplash) {
        if (!middleSplash) {
          this.splashRain(rain);
        }

        this.rains.delete(rain);
        this.rainRemain.push(rain);
      }

      rain.step();

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

      drop.step();

      var realX = drop.x - drop.radius;
      var realY = drop.y - drop.radius;

      this.context.drawImage(drop.canvas, realX, realY);
    });

    this.fillRains();
  }

  private splashRain(rain: Rain) {
    for (let i = 0; i < 16; i++) {
      let drop = this.dropRemain.pop() ?? new Drop();
      // console.log(rain.x, rain.y);

      drop.init(rain.x, this.canvas.height / this.dpr);

      this.drops.add(drop);
    }
  }

  run() {
    this.animation();

    requestAnimationFrame(() => {
      this.run();
    });
  }
}

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
