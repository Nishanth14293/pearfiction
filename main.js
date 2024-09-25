import {assetConfig} from "./src/config/assetConfig.js";
import { GameConfig } from "./src/config/gameConfig.js";
window.onload = ()=>{
    import("./src/app.js").then(({App}) => {
        const imgPath = GameConfig.assetBaseURL;
        const height = GameConfig.height;
        const width = GameConfig.width;
        const gameApp = new App(width,height,GameConfig.AppBGColor);
        gameApp.loadAssets(assetConfig.img, imgPath);
        window.addEventListener('resize', () => {
            gameApp.resizeApp();
        }).bind(this);
    }).catch(error => {
        console.log("Error on pixi app module", error);
    });
}
