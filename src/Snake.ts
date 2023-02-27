import { Fruit } from "./Fruit";
import { SnakeGameMap } from "./SnakeGameMap";
import { SoundEffects } from "./SoundEffects";
import { Position, Vector } from "./utils";

export class Snake {
  cells: Position[] = [];
  velocity: Vector = Vector.STILL;
  map: SnakeGameMap;
  fruit: Fruit;
  constructor(c: { map: SnakeGameMap; fruit: Fruit }) {
    this.map = c.map;
    this.fruit = c.fruit;
    this.cells = [Position.random(this.map.width - 1, this.map.height - 1)];
  }
  public get head() {
    return this.cells[this.cells.length - 1];
  }
  public move() {
    const lastCell = this.cells.length - 1;
    this.cells.push(this.cells[lastCell].translate(this.velocity));
    if (!this.head.isEqualTo(this.fruit.position)) {
      this.cells.shift();
    }
    for (let c of this.cells) {
      if (c !== this.head && c.isEqualTo(this.head)) {
        this.die();
        break;
      }
      if (
        c.i < 0 ||
        c.j < 0 ||
        c.i >= this.map.width ||
        c.j >= this.map.height
      ) {
        this.die();
        break;
      }
    }
  }
  public grow() {
    const lastCell = this.cells.length - 1;
    this.cells.push(this.cells[lastCell].translate(this.velocity));
  }
  public die() {
    this.cells = [Position.random(this.map.width - 1, this.map.height - 1)];
    this.velocity = Vector.STILL;
    SoundEffects.death.play();
  }
}
