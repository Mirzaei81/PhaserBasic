export class Player extends Phaser.Physics.Arcade.Sprite{
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string ,
		frame?: string | number | undefined
	){
		super(scene,x,y,texture,frame)
		scene.add.existing(this)
		scene.physics.add.existing(this)

		this.initPhisics();
		this.animations()
	}
	initPhisics(){
		this.setBounce(0.2)
		this.setGravityY(300)
		this.setCollideWorldBounds(true)
	}
	animations(){
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [ { key: 'dude', frame: 4 } ],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});
	}
	update(cursor:Phaser.Types.Input.Keyboard.CursorKeys): void {
		if(cursor.left.isDown){
			this.setVelocityX(-160)
			this.anims.play('left',true)
		}
		else if(cursor.right.isDown){
			this.setVelocityX(160)
			this.anims.play('right',true)
		}
		else{
			this.setVelocityX(0)
			this.anims.play('turn',true)
		}
		if (cursor.up.isDown && this.body.touching.down){
			this.setVelocityY(-330);
		}
	    
	}
}
