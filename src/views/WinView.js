import * as PIXI from "../lib/pixi.js";
import { DisplayUtil } from "../lib/DisplayUtil.js";
import { StyleConfig } from "../config/styleConfig.js";
import { GameConfig } from "../config/gameConfig.js";
import { EventDispatcher } from "../lib/EventDispatcher.js";
import { SlotEvent } from "../config/slotEvents.js";
export class WinView extends PIXI.Container{
    constructor(){
        super();
        this.displayUtil = new DisplayUtil();
        this.eventDispatcher = new EventDispatcher();
        this.eventDispatcher.addEvenListener(SlotEvent.UPDATE_WINTXT,this.updateWinTxt.bind(this));
        this.eventDispatcher.addEvenListener(SlotEvent.CLEAR_WINTXT,this.clearWinTxt.bind(this));
        this.createUI();
    }
    createUI(){
        this.winText = this.displayUtil.getText(StyleConfig.winTxtStyle);
        this.addChild(this.winText);
        this.displayUtil.setObjectPosition(this.winText,GameConfig.width/4,GameConfig.width/3);
    }
    updateWinTxt(text){
        this.winText.text = "";
        this.winText.text = text.detail.text;
    }
    clearWinTxt(){
        this.winText.text = "";
    }
}