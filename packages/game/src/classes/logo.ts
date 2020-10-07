type LogoConfig = {
	scene: Phaser.Scene;
	x: number;
	y: number;
	frame?: string;

};

export class Logo extends Phaser.GameObjects.Sprite {
	constructor({scene, x, y, frame = 'logo'}: LogoConfig) {
		super(scene, x ,y, 'spritesheet', frame);
		scene.add.existing(this);
	}
}