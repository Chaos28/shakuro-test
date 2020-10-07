import { EVENTS_NAME } from '../consts';
import { PlayNowButton } from '../classes/play-now-button';
import { Logo } from '../classes/logo';

export class OverlayScene extends Phaser.Scene {
  private resizeHandler!: () => void;
  private playNowButton!: PlayNowButton;
  private logo!: Logo;
  private scenePlayMarketContainer!: Phaser.GameObjects.Container;

  constructor() {
    super('overlay-scene');

    this.resizeHandler = () => {
      this.updateChildrensPosition();
    };
  }

  create(): void {
    this.game.scale.addListener(EVENTS_NAME.resize, this.resizeHandler);
    this.scenePlayMarketContainer = this.add.container(
      this.game.scale.width,
      this.game.scale.height,
    );

    this.initPlayNowButton();
    this.initLogo();
    this.scenePlayMarketContainer.add([this.playNowButton, this.logo]);
    this.updateChildrensPosition();
    this.scale.on('orientationchange', this.checkOriention, this);
  }

  private initPlayNowButton(): void {
    this.playNowButton = new PlayNowButton({
      scene: this,
      x: -200,
      y: -100,
      frame: 'btn-play-now',
      isPulsed: true,
    }).setInteractive();
    this.playNowButton.on('pointerdown', () => {
      window.location.href = 'http://play.google.com/store/apps/';
    });
  }

  private initLogo(): void {
    this.logo = new Logo({
      scene: this,
      x: -140,
      y: -300,
      frame: 'logo',
    });
  }

  private updateChildrensPosition(): void {
    const centerX = this.game.scale.width;
    const centerY = this.game.scale.height;

    this.logo.x = -centerX + this.logo.width + 16;
    this.logo.y = -centerY + this.logo.height + 16;

    this.checkOriention();
    this.scenePlayMarketContainer.setPosition(centerX, centerY);
  }

  private checkOriention(): void {
    if (this.scale.isPortrait) {
      this.logo.x = -this.game.scale.width / 2;
      this.logo.y = -this.game.scale.height + this.logo.height + 16;
    } else if (this.scale.isLandscape) {
      this.logo.x = -this.game.scale.width + this.logo.width + 16;
      this.logo.y = -this.game.scale.height + this.logo.height + 16;
    }
  }
}
