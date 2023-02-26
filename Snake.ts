import { Fruit } from "./Fruit";
import { SnakeGameMap } from "./SnakeGameMap";
import { Position, Vector } from "./utils";

export class Snake {
  cells: Position[] = [];
  velocity: Vector = Vector.LEFT;
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
  }
  public grow() {
    const lastCell = this.cells.length - 1;
    this.cells.push(this.cells[lastCell].translate(this.velocity));
  }
  public die() {
    this.cells = [Position.random(this.map.width - 1, this.map.height - 1)];
    this.velocity = Vector.STILL;
  }
}
