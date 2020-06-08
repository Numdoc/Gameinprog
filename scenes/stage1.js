//hey idiot, remember shift+alt+a comments out blocks


class Stage1 extends Phaser.Scene {
  constructor () {
    super('Stage1');
  }

  preload () {
  this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#ffffff");
this.cameras.main.backgroundcolor = Phaser.Display.Color.HexStringToColor("#ffffff"); 
this.cameras.main.setSize(900, 450);
 
this.load.image('level1tilemap', 'assets/level1tilemap.png')
    {

    }
this.load.spritesheet('mainchar', 'assets/mainchar.png',
    {
      frameWidth: 100,
      frameHeight: 100,

    }
  );
this.load.spritesheet('badguy', 'assets/badguy.png',
{
  frameWidth: 50, 
  frameHeight: 100,
});
this.load.spritesheet('basicbullet', 'assets/basicbullet.png',
{
  frameWidth: 10,
  frameHeight: 6,
  });
}

create () {
  
  
  this.map = this.make.tilemap({ data: maps[0], tileWidth: 25, tileHeight: 25 });
  this.tiles = this.map.addTilesetImage("level1tilemap", null, 25, 25, 0, 0);
  this.layer = this.map.createDynamicLayer(0, this.tiles, 0, 0);
  this.map.setCollision([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,32,34]);
  
  
  
  var r;
  this.shootrdy = 1; 
  this.jumprdy = 1;

    this.badguyhealth = 6; 
    this.badguystatus = 1;
    this.badguy = this.physics.add.sprite(600, 175, 'badguy');
    this.badguy.body.setAllowGravity(true)
    this.badguy.body.setCollideWorldBounds(true);
    this.badguy.setVelocityX(-100);

    this.player = this.physics.add.sprite(100, 175, 'mainchar');
    this.player.body.setAllowGravity(true)
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.badguy, this.layer);

    this.pleasedieblock = this.map.filterTiles(function(tile){
      return (tile.index === 35);
    });
    this.cameras.main.startFollow(this.player);

    //putting second bg create here doesn't work

    this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('mainchar', {start: 11, end: 18}),
    frameRate: 15,
    repeat: -1
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('mainchar', {start: 2, end: 9}),
      framerate: 15,
      repeat: -1
    })
    this.cursors = this.input.keyboard.createCursorKeys(); 
    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.basicbullet = this.physics.add.group({
      defaultKey: 'basicbullet',
      maxSize: 10000000000 //number of copies of bullet
    });
    
    this.anims.create({
      key: 'stop',
      frames: this.anims.generateFrameNumbers('mainchar', {start: 0, end: 0}),
      framerate: 10,
      repeat: -1
  
    })

    this.anims.create({
      key: 'bgleft',
      frames: this.anims.generateFrameNumbers('badguy', {start: 7, end: 12}),
      framerate: 1,
      repeat: -1
    })

    this.anims.create({
      key: 'bgright',
      frames: this.anims.generateFrameNumbers('badguy', {start: 1, end: 6}),
      framerate: 1,
      repeat: -1
    })

    this.anims.create({
      key: 'bgstop',
      frames: this.anims.generateFrameNumbers('badguy', {start: 0, end: 0}),
      framerate: 1,
      repeat: -1
  
    })
    
    /* this.anims.create({
      key: 'jump',
      freames: this.anims.generateFrameNumbers('mainchar', {start: 4, end:4}),
      framerate:10,
      repeat: -1
    }) */

    //&& this.player.body.istouching.floor
  this.ammo = 6 //ammo count var
  this.ammoText = this.add.text(this.player.x - 25, this.player.y + 25, 'ammo:' + this.ammo, {fontsize: '32px', fill: '#000000' }); //Remember, the score text is in black

  
}

/* badguySummon(badguy, bgx, bgy, bggravity, bgcollide, bgvelocity) {
  this.badguy = this.physics.add.sprite(this.bgx, this.bgy, 'badguy');
  this.bgx = 600;
  this.bgy = 175;
  this.badguy.body.setAllowGravity(true);
  this.badguy.body.setCollideWorldBounds(true);
  this.badguy.setVelocityX(-100);
} */
playerDie(){
  this.player.x = 100;
  this.player.y = 175;
  this.badguystatus = 1;
  this.badguyhealth = 6;
  this.badguy.setFrame(0);
  //this.physics.add.existing(new 'badguy'(this, 600, 175));

}
reload (r) {
  if (this.ammo < 6) {
  this.ammo = 6;
  this.ammoText.setText(
    'ammo:' + this.ammo
  );
  }
}



 shoot (space) {
   //this.basicbullet = this.physics.add.sprite(100, 450, 'basicbullet');
  var basicbullet = this.basicbullet.get(this.player.x + 20, this.player.y - 13);
   if (basicbullet) {
    basicbullet.body.setAllowGravity(true);
    basicbullet.setActive(true);
    basicbullet.setVisible(true);
    basicbullet.body.velocity.x = 3000;
    basicbullet = 1;
    this.ammo -= 1;
    this.ammoText.setText(
      'ammo:' + this.ammo
    );
   }
 }
 jump (up) {
   this.player.setVelocityY(-300);
   this.jumprdy = 0;
 }
 
 //bullethit (basicbullet, badguy) {
   //this.badguy.setActive(false);
   //this.badguy.setVisible(false);
 //}
 bghealthminus (badguyhealth) {
    
    if (this.badguyhealth <= 1) {
      
      console.log(this.badguyhealth);
      this.badguy.setFrame(1)
      this.badguystatus = 0;
      this.badguy.destroy();
      /* this.badguy.setActive(false);
   this.badguy.setVisible(false);
       */
    }
    else {
      this.badguyhealth -= 1;
      this.basicbullet.setTrue = false;
    }
  }
 
  update(){
    this.ammoText.x = this.player.x - 25;
    this.ammoText.y = this.player.y + 50;
   if(this.ammo > 0) { 
     if (this.cursors.space.isDown) {
      if (this.shootrdy === 1) {
      this.shoot();
     this.shootrdy = 0;
    }
     }
     else if (this.cursors.space.isUp) {
       this.shootrdy = 1;
       
     }
  }
  if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-350);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(350);
      this.player.anims.play('right', true);
    }
    
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('stop', false);
    }
    
    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
      if (this.jumprdy === 1) {
        this.jump();
        /* this.player.anims.play('jump', true); */
      }
    }
    else if (this.cursors.up.isUp)
    {
      this.jumprdy = 1;
      if (this.cursors.down.isDown)
      {
        this.player.setVelocityY(900)
        
      }
    }
    
    if (this.r.isDown) {this.reload()}
    
   if (this.badguystatus === 1) {
      this.physics.add.overlap(this.player, this.badguy, this.playerDie, null, this);
   }
  
  // if (this.player.x > 600){
    //this.bg1 = new badguySummon(this.physics.add.sprite(this.bgx, this.bgy, 'badguy'), 600, 175, this, this, this);
  // }

 
    
    this.physics.add.overlap(this.basicbullet, this.badguy, this.bghealthminus, null, this);
    this.physics.world.overlapTiles(this.player, this.pleasedieblock, this.playerDie, null, this);


/* if (this.badguystatus === 1){
    if (this.badguy.x < 450) {this.badguy.setVelocityX(100), this.badguy.anims.play('bgright', true);
  }
    else if (this.badguy.x > 750) {this.badguy.setVelocityX(-100), this.badguy.anims.play('bgleft', true);
  }
    } */
   /*  else {
      //this.badguy.setVelocityX(0);
    } */
  }
};  
