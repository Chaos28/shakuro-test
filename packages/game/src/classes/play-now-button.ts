import {Button} from './button';

type ButtonConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  frame?: string;
  isPulsed?: boolean;
};

export class PlayNowButton extends Button {

  constructor({scene, x, y, frame, isPulsed}: ButtonConfig) {
		super({scene, x, y, frame, isPulsed});
  }
}