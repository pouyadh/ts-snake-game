import { Fruit } from "./Fruit";
import { Snake } from "./Snake";
import { SnakeGameMap } from "./SnakeGameMap";
import { Position, RectSize, Vector } from "./utils";

const fruitImageUrl =
  "data:image/png;base64,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";
const extiedImageUrl =
  "data:image/png;base64,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";

export class SnakeGameGraphic {
  static snakeColor = "green";
  static mapColor1 = "#111";
  static mapColor2 = "#222";
  static fruitColor = "cyan";
  static snakeEyeColor = "black";
  static snakeEyeInnerColor = "white";
  private rootElement: HTMLElement;
  private canvas: HTMLCanvasElement;
  private messageElement: HTMLDivElement;
  private containerElement: HTMLDivElement;
  private headerElement: HTMLDivElement;
  private footerElement: HTMLDivElement;
  private context: CanvasRenderingContext2D;
  private refreshInterval: number = 1000;
  private refreshIntervalRef: NodeJS.Timer | null = null;
  private _maxCanvasSize: RectSize = { width: 300, height: 300 };
  private _scale: number = 1;
  private map: SnakeGameMap;
  private snake: Snake;
  private fruit: Fruit;

  private fruitImage: HTMLImageElement = new Image();
  private exitedImage: HTMLImageElement = new Image();

  constructor(c: {
    rootElementId: string;
    maxCanvasSize: RectSize;
    map: SnakeGameMap;
    snake: Snake;
    fruit: Fruit;
  }) {
    this.rootElement = document.querySelector(
      `#${c.rootElementId}`
    ) as HTMLElement;
    this.map = c.map;
    this.snake = c.snake;
    this.fruit = c.fruit;
    this.rootElement.innerHTML = "";
    this.containerElement = document.createElement("div");
    this.canvas = document.createElement("canvas");
    this.messageElement = document.createElement("div");
    this.headerElement = document.createElement("div");
    this.footerElement = document.createElement("div");
    this.messageElement.id = "message";
    this.containerElement.id = "snake-game-container";
    this.containerElement.append(
      this.headerElement,
      this.canvas,
      this.messageElement,
      this.footerElement
    );
    this.headerElement.classList.add("flex");
    this.footerElement.classList.add("flex");
    this.rootElement.append(this.containerElement);
    this.context = this.canvas.getContext("2d")!;
    this.fps = 30;
    this.maxCanvasSize = c.maxCanvasSize;
    this.fruitImage.src = fruitImageUrl;
    this.exitedImage.src = extiedImageUrl;
  }

  set maxCanvasSize(size: RectSize) {
    this._maxCanvasSize = size;
    this.resize();
  }
  private resize() {
    const maxCanvasDimention = Math.min(
      this._maxCanvasSize.width,
      this._maxCanvasSize.height
    );
    const maxMapDimention = Math.max(this.map.width, this.map.height);
    this._scale = Math.floor(maxCanvasDimention / maxMapDimention);
    this.canvas.width = this.map.width * this._scale;
    this.canvas.height = this.map.height * this._scale;
  }

  set fps(fps: number) {
    if (this.refreshIntervalRef) {
      clearInterval(this.refreshIntervalRef);
    }
    this.refreshInterval = 1000 / fps;
    this.refreshIntervalRef = setInterval(
      () => this.refresh(),
      this.refreshInterval
    );
  }

  private clear() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawSquare(s: { i: number; j: number; size: number; color: string }) {
    const s2 = Math.floor(this._scale / 2);
    const ss2 = Math.floor(s.size / 2);
    this.context.fillStyle = s.color;
    this.context.fillRect(
      s.i * this._scale + s2 - ss2,
      s.j * this._scale + s2 - ss2,
      s.size,
      s.size
    );
  }

  private drawCircle(c: { i: number; j: number; size: number; color: string }) {
    const radius = c.size / 2;
    const s2 = Math.floor(this._scale / 2);
    this.context.fillStyle = c.color;
    this.context.beginPath();
    this.context.ellipse(
      c.i * this._scale + s2,
      c.j * this._scale + s2,
      radius,
      radius,
      0,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  private drawImage(c: {
    img: HTMLImageElement;
    i: number;
    j: number;
    size: number;
  }) {
    const s2 = Math.floor(this._scale / 2);
    const ss2 = Math.floor(c.size / 2);
    this.context.drawImage(
      c.img,
      0,
      0,
      c.img.width,
      c.img.height,
      c.i * this._scale + s2 - ss2,
      c.j * this._scale + s2 - ss2,
      c.size,
      c.size
    );
  }

  public refresh() {
    this.clear();
    for (let i = 0; i < this.map.width; i++) {
      for (let j = 0; j < this.map.height; j++) {
        if ((i % 2) - (j % 2)) {
          this.drawSquare({ i, j, color: "#222", size: this._scale - 2 });
        } else {
          this.drawSquare({ i, j, color: "#111", size: this._scale - 2 });
        }
      }
    }

    this.context.strokeStyle = "red";
    this.context.beginPath();
    const head = this.snake.head.multiply(this._scale).add(this._scale / 2);
    const head2 = this.snake.head
      .translate(this.snake.velocity.multiply(0.8))
      .multiply(this._scale)
      .add(this._scale / 2);

    const head4 = this.snake.head
      .translate(this.snake.velocity)
      .add(Position.random(8, 8).multiply(0.1))
      .add(Position.random(-8, -8).multiply(0.1))
      .multiply(this._scale)
      .add(this._scale / 2);
    this.context.moveTo(head.i, head.j);
    this.context.bezierCurveTo(
      head2.i,
      head2.j,
      head2.i,
      head2.j,
      head4.i,
      head4.j
    );
    this.context.stroke();

    this.snake.cells.forEach((c, index) => {
      const { i, j } = c;
      this.drawCircle({ i, j, color: "green", size: this._scale - 2 });
    });

    const a = this.snake.head.to(this.fruit.position).limitByRadius(0.1);
    const ec1 = this.snake.head.translate(new Vector(-0.3, 0));
    const ec2 = this.snake.head.translate(new Vector(0.3, 0));
    const e1 = ec1.translate(a);
    const e2 = ec2.translate(a);
    const isNearFruit = this.snake.head.calcDistance(this.fruit.position) <= 1;
    if (isNearFruit) {
      this.drawCircle({
        i: ec1.i,
        j: ec1.j,
        color: SnakeGameGraphic.snakeEyeInnerColor,
        size: this._scale * 0.7,
      });

      this.drawCircle({
        i: ec2.i,
        j: ec2.j,
        color: SnakeGameGraphic.snakeEyeInnerColor,
        size: this._scale * 0.7,
      });
      this.drawImage({ img: this.exitedImage, i: e1.i, j: e1.j, size: 10 });
      this.drawImage({ img: this.exitedImage, i: e2.i, j: e2.j, size: 10 });
    } else {
      this.drawCircle({
        i: ec1.i,
        j: ec1.j,
        color: SnakeGameGraphic.snakeEyeInnerColor,
        size: this._scale * 0.7,
      });

      this.drawCircle({
        i: ec2.i,
        j: ec2.j,
        color: SnakeGameGraphic.snakeEyeInnerColor,
        size: this._scale * 0.7,
      });
      this.drawCircle({
        i: e1.i,
        j: e1.j,
        color: SnakeGameGraphic.snakeEyeColor,
        size: this._scale * 0.4,
      });
      this.drawCircle({
        i: e2.i,
        j: e2.j,
        color: SnakeGameGraphic.snakeEyeColor,
        size: this._scale * 0.4,
      });
    }

    this.drawImage({
      img: this.fruitImage,
      i: this.fruit.position.i,
      j: this.fruit.position.j,
      size: this._scale - 2,
    });
  }
  showMessage(message: string) {
    this.messageElement.classList.add("show");
    this.messageElement.innerHTML = message;
  }
  hideMessage() {
    this.messageElement.classList.remove("show");
  }
  get IsMessageVisible() {
    return this.messageElement.classList.contains("show");
  }
}
