import { Fruit } from "./Fruit";
import { Snake } from "./Snake";
import { SnakeGameGraphic } from "./SnakeGameGraphic";
import { SnakeGameMap } from "./SnakeGameMap";
import { Position, Vector } from "./utils";

class SnakeGame {
  map: SnakeGameMap;
  snake: Snake;
  graphic: SnakeGameGraphic;
  fruit: Fruit;
  processIntervalRef: number | null = null;
  processInterval: number;
  noAutoMoveDelayRef: number;
  noAutoMoveDelay: number;
  noAutoMove: boolean = false;
  constructor(rootElementId: string, width: number, height: number) {
    this.map = new SnakeGameMap(width, height);
    this.fruit = new Fruit();
    this.snake = new Snake({ map: this.map, fruit: this.fruit });
    this.placeNewFruit();
    const maxCanvasSize = { width: 500, height: 500 };
    this.graphic = new SnakeGameGraphic({
      rootElementId,
      maxCanvasSize,
      map: this.map,
      snake: this.snake,
      fruit: this.fruit,
    });
    this.processInterval = 200;
    this.noAutoMoveDelay = 100;
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.process = this.process.bind(this);
  }
  private startProcess() {
    this.stopProcess();
    this.processIntervalRef = setInterval(this.process, this.processInterval);
    window.addEventListener("keydown", this.handleKeyboard);
  }
  private stopProcess() {
    if (this.processIntervalRef) {
      clearInterval(this.processIntervalRef);
    }
    window.removeEventListener("keydown", this.handleKeyboard);
  }
  private process() {
    if (!this.noAutoMove) {
      this.snake.move();
    }
    if (this.snake.head.isEqualTo(this.fruit.position)) {
      this.placeNewFruit();
    }
    for (let c of this.snake.cells) {
      if (c !== this.snake.head && c.isEqualTo(this.snake.head)) {
        this.snake.die();
        break;
      }
      if (
        c.i < 0 ||
        c.j < 0 ||
        c.i >= this.map.width ||
        c.j >= this.map.height
      ) {
        this.snake.die();
        break;
      }
    }
  }
  private handleKeyboard(e: KeyboardEvent) {
    const v = {
      ArrowUp: Vector.UP,
      ArrowDown: Vector.DOWN,
      ArrowLeft: Vector.LEFT,
      ArrowRight: Vector.RIGHT,
    }[e.key];

    if (v) {
      if (!this.snake.velocity.reverse().isEqualTo(v)) {
        this.snake.velocity = v;
        this.process();
        this.setNoAutoMove();
        this.graphic.refresh();
      }
    }
  }
  private setNoAutoMove() {
    if (this.noAutoMoveDelayRef) {
      clearTimeout(this.noAutoMoveDelayRef);
    }
    this.noAutoMove = true;
    setTimeout(() => {
      this.noAutoMove = false;
    }, this.noAutoMoveDelay);
  }
  private placeNewFruit() {
    let newPos;
    do {
      newPos = Position.random(this.map.width - 1, this.map.height - 1);
    } while (this.snake.cells.find((c) => c.isEqualTo(newPos)));
    this.fruit.position = newPos;
  }
  public run() {
    this.startProcess();
  }
}

const snakeGame = new SnakeGame("snake-game", 20, 20);
snakeGame.run();