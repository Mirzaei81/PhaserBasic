interface Sobject {
	scene: Phaser.Scene,
	 x: number,
	 y: number,
	 texture: string | Phaser.Textures.Texture,
	 frame?: string | number | undefined
}

export default class SObject implements Sobject{
	constructor()
}
