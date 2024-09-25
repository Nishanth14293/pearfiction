import * as PIXI from "../lib/pixi.js";
import { DisplayUtil } from "../lib/DisplayUtil.js";
import { EventDispatcher } from "../lib/EventDispatcher.js";
import { SlotEvent } from "../config/slotEvents.js";
import { GameConfig } from "../config/gameConfig.js";
export class BottomBtnView extends PIXI.Container {
    constructor(){
        super();
        this.displayUtil = new DisplayUtil();
        this.createView();
        this.eventDispatcher = new EventDispatcher();
        this.eventDispatcher.addEvenListener(SlotEvent.SHOW_SPINBTN,this.showSpinBtn.bind(this));
    }
    createView(){
        const size = GameConfig.width * 0.1;
        this.spinBtn = this.displayUtil.getSprite("spin_button");
        this.displayUtil.setObjectPosition(this.spinBtn,size * 4.5, size * 3);
        this.spinBtn.width = size;
        this.spinBtn.height = size;
        this.addChild(this.spinBtn);
        this.displayUtil.addInteraction(this.spinBtn,this.spinBtnOnClick.bind(this));
    }
    spinBtnOnClick(){
        this.spinBtn.visible = false;
        this.eventDispatcher.dispatchEvent(SlotEvent.SPIN_REEL);
        this.eventDispatcher.dispatchEvent(SlotEvent.CLEAR_WINTXT);
    }
    showSpinBtn(){
        this.spinBtn.visible = true;
    }
}