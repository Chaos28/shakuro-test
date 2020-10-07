import { EVENTS_NAME } from '../consts';
import { Enemy } from '../classes/enemy';
import { Button } from '../classes/button';

import { throws } from 'assert';

export class MainScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;
  private sceneContainer!: Phaser.GameObjects.Container;
  private enemy!: Enemy;
  private attackBtn!: Button;

  private resizeHandler: () => void;

  constructor() {
    super('main-scene');

    this.resizeHandler = () => {
      this.resize();
      this.changePositions();
    };
  }

  create(): void {
    this.sceneContainer = this.add.container(this.game.scale.width / 2, 0);

    this.background = this.add.image(0, 0, 'background');

    this.initEnemy();
    this.initAttackButton();

    this.sceneContainer.add([this.background, this.enemy, this.attackBtn]);

    this.resize();
    this.changePositions();

    this.initEvents();
  }

  // Initializations

  private initEnemy(): void {
    this.enemy = new Enemy({ scene: this, x: 0, y: 0 }).setScale(2);
  }

  private initAttackButton(): void {
    this.attackBtn = new Button({
      scene: this,
      x: 0,
      y: this.enemy.getBounds().bottom,
    }).setInteractive();
    this.attackBtn.on('pointerdown', () => {
      this.enemy.attacksThePlayer();
      console.log('Working!');
    });
  }

  private initEvents(): void {
    this.game.scale.addListener(EVENTS_NAME.resize, this.resizeHandler);
  }

  // Resize

  private resize(): void {
    this.updateSceneContainerSize();
  }

  private updateSceneContainerSize() {
    const scaleX = this.game.scale.width / this.background.width;
    const scaleY = this.game.scale.height / this.background.height;
    const scale = Math.max(scaleX, scaleY);

    this.sceneContainer.setScale(scale);
  }

  private changePositions(): void {
    this.sceneContainer.setPosition(this.game.scale.width / 2, this.game.scale.height / 2);
  }
}
