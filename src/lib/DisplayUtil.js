import * as PIXI from "./pixi.js"
export class DisplayUtil{
    constructor() {

    }
    getTexture(name){
        return PIXI.utils.TextureCache[name];
    }
    getSprite(name){
        const texture = this.getTexture(name);
        let sprite;
        if(texture != null){
            sprite = new PIXI.Sprite(texture);
        }
        return sprite;
    }
    getText(style){
        const text = new PIXI.Text("",style);
        return text;
    }
    setObjectPosition(object,x,y) {
        object.position.x = x;
        object.position.y = y;
    }
    getContainer(){
        return new PIXI.Container()
    }
    addInteraction(btn,callback){
        btn.interactive = true;
        btn.on("pointerdown",callback);
    }
    drawRectangle(width,height,color){
        const rect = new PIXI.Graphics();
        rect.beginFill(color);
        rect.drawRect(0,0,width,height);
        return rect;
    }
}

