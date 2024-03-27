import Phaser, { Scale } from 'phaser'

import {MainScene} from './scenes/MainScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	pixelArt:true,
	scale:{
		autoCenter:Scale.CENTER_BOTH,
	},
	physics:{
		default:'arcade',
		arcade:{
			gravity:{y:20},
			debug:false
		},
		
	},
	scene: [MainScene],
}

export default new Phaser.Game(config)
