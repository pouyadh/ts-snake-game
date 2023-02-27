import upURL from "./assets/sounds/up.mp3";
import downURL from "./assets/sounds/down.mp3";
import leftURL from "./assets/sounds/left.mp3";
import rightURL from "./assets/sounds/right.mp3";
import eatURL from "./assets/sounds/eat.ogg";
import deathURL from "./assets/sounds/death.mp3";
export class SoundEffects {
  static up = new Audio();
  static down = new Audio();
  static left = new Audio();
  static right = new Audio();
  static eat = new Audio();
  static death = new Audio();
  static move = new Audio();
  static {
    this.up.src = upURL;
    this.down.src = downURL;
    this.left.src = leftURL;
    this.right.src = rightURL;
    this.eat.src = eatURL;
    this.death.src = deathURL;
    this.up.load();
    this.down.load();
    this.left.load();
    this.right.load();
    this.eat.load();
    this.death.load();
    this.up.volume = 0.2;
    this.down.volume = 0.2;
    this.left.volume = 0.2;
    this.right.volume = 0.2;
  }
}
