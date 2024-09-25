import * as PIXI from "./lib/pixi.js";
import { BottomBtnView } from "./views/BottomBtnView.js";
import { EventDispatcher } from "./lib/EventDispatcher.js";
import { ReelsView } from "./views/ReelsView.js";
import { WinView } from "./views/WinView.js";
export class SlotGameContainer extends PIXI.Container{
    constructor(){
        super();
        this.eventDispatcher = new EventDispatcher();        
    }
    initViews(){
        this.reelsView = new ReelsView();
        this.addChild(this.reelsView);
        this.bottomBtnView = new BottomBtnView();
        this.addChild(this.bottomBtnView);
        this.winView = new WinView();
        this.addChild(this.winView);
    }
}