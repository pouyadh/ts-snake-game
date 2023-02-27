import { Fruit } from "./Fruit";
import { Snake } from "./Snake";
import { SnakeGameGraphic } from "./SnakeGameGraphic";
import { SnakeGameMap } from "./SnakeGameMap";
import { Position, Vector } from "./utils";
import { SoundEffects } from "./SoundEffects";

class SnakeGame {
  map: SnakeGameMap;
  snake: Snake;
  graphic: SnakeGameGraphic;
  fruit: Fruit;
  processIntervalRef: NodeJS.Timer | null = null;
  processInterval: number;
  noAutoMoveDelayRef: NodeJS.Timeout | null = null;
  noAutoMoveDelay: number;
  noAutoMove: boolean = false;
  constructor(rootElementId: string, width: number, height: number) {
    this.map = new SnakeGameMap(width, height);
    this.fruit = new Fruit();
    this.snake = new Snake({ map: this.map, fruit: this.fruit });
    this.placeNewFruit();
    const maxCanvasSize = {
      width: innerWidth * 0.8,
      height: innerHeight * 0.8,
    };
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
    this.graphic.showMessage(
      "Press one of the arrow keys to start!</br></br>(&uarr;  &darr;  &larr;  &rarr;)"
    );
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
      SoundEffects.eat.play();
    }
  }
  private handleKeyboard(e: KeyboardEvent) {
    const k = {
      ArrowUp: { v: Vector.UP, audio: SoundEffects.up },
      ArrowDown: { v: Vector.DOWN, audio: SoundEffects.down },
      ArrowLeft: { v: Vector.LEFT, audio: SoundEffects.left },
      ArrowRight: { v: Vector.RIGHT, audio: SoundEffects.right },
    }[e.key];

    if (k) {
      if (!this.snake.velocity.reverse().isEqualTo(k.v)) {
        this.snake.velocity = k.v;
        this.process();
        this.setNoAutoMove();
        this.graphic.refresh();
        k.audio.play();
        if (this.graphic.IsMessageVisible) {
          this.graphic.hideMessage();
        }
      }
    }
  }
  private setNoAutoMove() {
    if (this.noAutoMoveDelayRef) {
      clearTimeout(this.noAutoMoveDelayRef);
    }
    this.noAutoMove = true;
    this.noAutoMoveDelayRef = setTimeout(() => {
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
