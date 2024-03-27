import {GameObjects, Scene,}from "phaser";
import {Player} from "../Objects/Player"

export class MainScene extends Scene{
	player!:Player
	stars!:Phaser.Physics.Arcade.Group
	bombs!:Phaser.Physics.Arcade.Group
	score:number=0
	cursor!:Phaser.Types.Input.Keyboard.CursorKeys
	scoreText!:GameObjects.Text
	starsPos=[[172,444],
		[474,292],
		[631,120],
		[130,159]]
	bombPos= [[456, 789], [123, 456], [321, 654], [234, 567], [345, 678], [567, 890], [678, 901], [789, 123], [890, 234], [901, 345]]
	constructor(){
		super("MainScene")
	}
	preload(){
		this.load.image('sky', '/images/sky.png');
		this.load.image('ground', '/images/platform.png');
		this.load.image('star', '/images/star.png');
		this.load.image('bomb', '/images/bomb.png');
		this.load.spritesheet('dude', 
			'/images/dude.png',
			{ frameWidth: 32, frameHeight: 48 }
		)
	}
	create(){
		this.add.image(0,0,'sky').setOrigin(0,0)
		this.stars = this.physics.add.group({
			classType:GameObjects.Image,
			allowGravity:false
		});

		this.starsPos.forEach((pos)=>{
			this.stars.create(pos[0],pos[1],'star')
		})
		this.bombs= this.physics.add.group({
			classType:GameObjects.Image,
			allowGravity:false
		});

		this.bombPos.forEach((pos)=>{
			this.stars.create(pos[0],pos[1],'bomb')
		})
		let platforms = this.physics.add.staticGroup();
		platforms.create(400, 568, 'ground').setScale(2).refreshBody();
		platforms.create(600, 400, 'ground');
		platforms.create(50, 250, 'ground');
		platforms.create(750, 220, 'ground');
		this.player = new Player(this,100,450,'dude')
		this.physics.add.collider(this.player,platforms)
		this.scoreText = this.add.text(16, 16, 'score: 0',{ fontSize: '32px', fill: '#000' });
	    this.cursor = this.input.keyboard.createCursorKeys();
		this.bombs.children.iterate((star)=>{
			this.physics.add.overlap(this.player,star,this.overlapped,undefined,this)
			this.tweens.add({
				targets:star,
				y: star.y + 10,
				duration: 1000,
				ease: "Linear",
				yoyo: true,
				repeat: -1

			})
		})
		this.stars.children.iterate((star)=>{
			this.physics.add.overlap(this.player,star,this.overlapped,undefined,this)
			this.tweens.add({
				targets:star,
				y: star.y + 10,
				duration: 1000,
				ease: "Linear",
				yoyo: true,
				repeat: -1

			})
		})
	}
	public overlapped:ArcadePhysicsCallback = (_player:GameObjects.GameObject,star:GameObjects.GameObject,)=>{
		star.destroy();
		this.score+=10
		this.scoreText.setText("Score: " + this.score)
	}
	update(): void {
		this.player.update(this.cursor)
	}
}
