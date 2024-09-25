import * as PIXI from "./lib/pixi.js";
import { SlotGameContainer } from "./SlotGameContainer.js";
import { EventDispatcher } from "./lib/EventDispatcher.js";
import { DisplayUtil } from "./lib/DisplayUtil.js";
import { GameConfig } from "./config/gameConfig.js";
import { LoadView } from "./views/loadView.js";
export class App {
    constructor(width, height, backgroundColor){
        this.height = height;
        this.width = width;
        this.backgroundColor = backgroundColor;
        this.eventDispatcher = new EventDispatcher();
        this.displayUtil = new DisplayUtil();
        this.app = new PIXI.Application({
            width: this.width,
            height: this.height,
            backgroundColor: this.backgroundColor
        });
        GameConfig.appTicker = this.app.ticker;
        document.getElementById("gameDiv").appendChild(this.app.view);
    }
    loadAssets(assets, path){
        this.loadView = new LoadView();
        this.app.stage.addChild(this.loadView);
        assets.forEach(img => 
            this.app.loader.add(img.name,path + img.fileName)
        );
        this.app.loader.onProgress.add((loader) => {
            this.loadView.updateText(`Loading... ${Math.round(loader.progress)}%`);
        });
        this.app.loader.onError.add((error) => {
            console.error('Asset failed to load:', error);
        });
        this.app.loader.load(this.createSlotGame.bind(this));
    }
    createSlotGame(){
        this.app.stage.removeChild(this.loadView);
        this.slotGameContainer = new SlotGameContainer();
        this.slotGameContainer.initViews();
        this.displayUtil.setObjectPosition(this.slotGameContainer,0,GameConfig.height * 0.15);
        this.app.stage.addChild(this.slotGameContainer);
    }
    resizeApp() {
        let width = 0;
        let height = 0;
        let scalX = 0;
        let scalY = 0;
        if(GameConfig.width < window.innerWidth)
        {
            width = GameConfig.width;
            height = GameConfig.height;
            scalX = 1;
            scalY = 1;
        } else {
            width = window.innerWidth * 0.6;
            height = window.innerHeight * 0.4;
            scalX = 0.5;
            scalY = 0.5;
        }
        this.app.renderer.resize(width,height);
        this.resizeContainer(this.slotGameContainer,width,height,scalX,scalY);
    }
    resizeContainer(container,width,height,scalX,scalY) {
        container.scale.set(scalX, scalY);
        this.displayUtil.setObjectPosition(container,0,height * 0.15);
    }
}