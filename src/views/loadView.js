import * as PIXI from '../lib/pixi.js';
import { DisplayUtil } from '../lib/DisplayUtil.js';
import { GameConfig } from '../config/gameConfig.js';
import { StyleConfig } from '../config/styleConfig.js';
export class LoadView extends PIXI.Container{
    constructor(){
        super();
        this.displayUtil = new DisplayUtil();
        this.createUI();
    }
    createUI(){
        this.loaderTxt = this.displayUtil.getText(StyleConfig.loaderTxtStyle);
        this.displayUtil.setObjectPosition(this.loaderTxt,GameConfig.width/2,GameConfig.height/2);
        this.addChild(this.loaderTxt);
    }
    updateText(txt){
        this.loaderTxt.text = txt;
        this.loaderTxt.pivot.set(this.loaderTxt.width / 2, this.loaderTxt.height / 2);
    }
}