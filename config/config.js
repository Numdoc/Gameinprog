let config =  {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 10000,
  height: 450,
  physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 500} //TODO: turn on for player, but not for bullets
        }
    },
  scene:[Stage1, Story1]
};
