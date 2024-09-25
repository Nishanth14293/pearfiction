import * as PIXI from '../lib/pixi.js';
import { DisplayUtil } from '../lib/DisplayUtil.js';
import { GameConfig } from '../config/gameConfig.js';
import { EventDispatcher } from '../lib/EventDispatcher.js';
import { SlotEvent } from '../config/slotEvents.js';
import { SlotConfig } from '../config/slotConfig.js';
import gsap from '../lib/gsap.js';
export class ReelsView extends PIXI.Container {
    constructor(app) {
        super();
        this.displayUtil = new DisplayUtil();
        this.eventDispatcher = new EventDispatcher();
        this.app = app;
        this.eventDispatcher.addEvenListener(SlotEvent.SPIN_REEL, this.spinReels.bind(this));
        this.symbolArr = [];
        this.reelSetArr = [];
        this.blinkRectArr = [];
        this.reelBands = SlotConfig.reelBands;
        this.positionCount = 0;
        this.currentPayLine = 0;
        this.totalWinAmt = 0;
        this.payLineTxt = "";
        this.updateSpinner = {};
        this.initReels();
        this.setupSlot(SlotConfig.positions.position0);
    }
    initReels() {
        const setPosX = GameConfig.width / 4;
        const symbolSize = GameConfig.width * 0.1;
        this.blinkRectContainer = this.displayUtil.getContainer();
        this.addChild(this.blinkRectContainer);
        this.slotMachine = this.displayUtil.getContainer();
        this.slotMachine.name = "slotMachine";
        this.addChild(this.slotMachine);
        for (let i = 0; i < 5; i++) {
            this["reelSet" + i] = this.displayUtil.getContainer();
            this["reelSet" + i].name = "reelSet" + i;
            this.slotMachine.addChild(this["reelSet" + i]);
            for (let j = 0; j < 4; j++) {
                const blinkRect = this.displayUtil.drawRectangle(symbolSize, symbolSize, 0x1099bb);
                this.displayUtil.setObjectPosition(blinkRect, setPosX + (blinkRect.width * i), blinkRect.height * j);
                blinkRect.customParam = {
                    col: j,
                    row: i,
                    posX: blinkRect.x,
                    posY: blinkRect.y
                }
                this.blinkRectContainer.addChild(blinkRect);
                this.blinkRectArr.push(blinkRect);
                const symbol = this.displayUtil.getSprite("lv3_symbol");
                symbol.name = "Col: " + j + " Row: " + i;
                symbol.width = symbolSize;
                symbol.height = symbolSize;
                this.displayUtil.setObjectPosition(symbol, setPosX + (symbol.width * i), symbol.height * j);
                symbol.customParam = {
                    col: j,
                    row: i,
                    symbol: "",
                    posX: symbol.x,
                    posY: symbol.y
                }
                this["reelSet" + i].addChild(symbol);
                this.symbolArr.push(symbol);
            }
        }
        
        const rectMaskTop = this.displayUtil.drawRectangle(symbolSize * 5, symbolSize, 0x1099bb);
        this.addChild(rectMaskTop);
        this.displayUtil.setObjectPosition(rectMaskTop, setPosX, symbolSize*-1);
        const rectMaskBottom = this.displayUtil.drawRectangle(symbolSize * 5, symbolSize, 0x1099bb);
        this.addChild(rectMaskBottom);
        this.displayUtil.setObjectPosition(rectMaskBottom, setPosX, symbolSize * 3);
        const lineTop = new PIXI.Graphics();
        lineTop.lineStyle(1, 0x000000, 0.5);
        lineTop.moveTo(symbolSize * 5, 0);
        lineTop.lineTo(0, 0);
        this.displayUtil.setObjectPosition(lineTop, setPosX, 0);
        this.addChild(lineTop);
        const lineBottom = new PIXI.Graphics();
        lineBottom.lineStyle(1, 0x000000, 0.5);
        lineBottom.moveTo(symbolSize * 5, 0);
        lineBottom.lineTo(0, 0);
        this.displayUtil.setObjectPosition(lineBottom, setPosX, symbolSize * 3);
        this.addChild(lineBottom);
    }
    blinkRectangleColor(rect) {
        gsap.to(rect, {
            tint: 0xff0000,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
            onComplete: () => {
                console.log("Completed")
            }
        });
    }
    setupSlot(reelPositions) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 5; j++) {
                const indexToCheck = reelPositions[i][j];
                let sympolName = "";
                const tempReelBands = this.reelBands[j];
                if (indexToCheck >= 0 && indexToCheck < tempReelBands.length) {
                    sympolName = tempReelBands[indexToCheck];
                } else {
                    sympolName = tempReelBands[reelPositions[0]];
                }
                const symbol = this.getSymbol(i, j);
                symbol.texture = this.displayUtil.getTexture(sympolName);
                symbol.customParam.symbol = sympolName;
            }
        }
    }
    getSymbol(col, row) {
        const symbol = this.symbolArr.filter((element) => element.customParam.col === col && element.customParam.row === row);
        return symbol[0];
    }
    getBlinkRect(col, row) {
        const rect = this.blinkRectArr.filter((element) => element.customParam.col === col && element.customParam.row === row);
        return rect[0];
    }
    spinReels() {
        const baseSpeed = 500;
        this.moveMax = this.getSymbol(3, 0).y;
        let delay = 100;
        let reel1SpinCount = 0;
        let reel2SpinCount = 0;
        let reel3SpinCount = 0;
        let reel4SpinCount = 0;
        let reel5SpinCount = 0;
        const maxReelSpin = SlotConfig.maxReelSpin;
        this.updateSpinner = (delta) => {
            delay += baseSpeed * delta * (1 / 60);
            if (delay > 250 && reel1SpinCount < maxReelSpin) {
                for (let j = 0; j < this.slotMachine.children[0].children.length; j++) {
                    const symbol = this.slotMachine.children[0].children[j];
                    const moveSpeed = baseSpeed * delta * (1 / 60);
                    symbol.y += moveSpeed;
                    if (symbol.y > this.moveMax) {
                        symbol.y = ((symbol.height - 10) * -1);
                        if (symbol.customParam.col == 0) {
                            reel1SpinCount += 1;
                            if (reel1SpinCount == maxReelSpin) {
                                this.stopReelAnimation(0);
                            }
                        }
                    }
                }
            }
            if (delay > 500 && reel2SpinCount < maxReelSpin) {
                for (let j = 0; j < this.slotMachine.children[1].children.length; j++) {
                    const symbol = this.slotMachine.children[1].children[j];
                    const moveSpeed = baseSpeed * delta * (1 / 60);
                    symbol.y += moveSpeed;
                    if (symbol.y > this.moveMax) {
                        symbol.y = ((symbol.height - 10) * -1);
                        if (symbol.customParam.col == 0) {
                            reel2SpinCount += 1;
                            if (reel2SpinCount == maxReelSpin) {
                                this.stopReelAnimation(1);
                            }
                        }
                    }
                }
            }
            if (delay > 750 && reel3SpinCount < maxReelSpin) {
                for (let j = 0; j < this.slotMachine.children[2].children.length; j++) {
                    const symbol = this.slotMachine.children[2].children[j];
                    const moveSpeed = baseSpeed * delta * (1 / 60);
                    symbol.y += moveSpeed;
                    if (symbol.y > this.moveMax) {
                        symbol.y = ((symbol.height - 10) * -1);
                        if (symbol.customParam.col == 0) {
                            reel3SpinCount += 1;
                            if (reel3SpinCount == maxReelSpin) {
                                this.stopReelAnimation(2);
                            }
                        }
                    }

                }
            }
            if (delay > 1000 && reel4SpinCount < maxReelSpin) {
                for (let j = 0; j < this.slotMachine.children[3].children.length; j++) {
                    const symbol = this.slotMachine.children[3].children[j];
                    const moveSpeed = baseSpeed * delta * (1 / 60);
                    symbol.y += moveSpeed;
                    if (symbol.y > this.moveMax) {
                        symbol.y = ((symbol.height - 10) * -1);
                        if (symbol.customParam.col == 0) {
                            reel4SpinCount += 1;
                            if (reel4SpinCount == maxReelSpin) {
                                this.stopReelAnimation(3);
                            }
                        }
                    }
                }
            }
            if (delay > 1250 && reel5SpinCount < maxReelSpin) {
                for (let j = 0; j < this.slotMachine.children[4].children.length; j++) {
                    const symbol = this.slotMachine.children[4].children[j];
                    const moveSpeed = baseSpeed * delta * (1 / 60);
                    symbol.y += moveSpeed;
                    if (symbol.y > this.moveMax) {
                        symbol.y = ((symbol.height - 10) * -1);
                        if (symbol.customParam.col == 0) {
                            reel5SpinCount += 1;
                            if (reel5SpinCount == 2) {
                                this.positionCount += 1;
                                if (this.positionCount == 3) {
                                    this.positionCount = 0;
                                }
                                this.setupSlot(SlotConfig.positions["position" + this.positionCount]);
                            }
                            if (reel5SpinCount == maxReelSpin) {
                                this.stopReelAnimation(4);
                                GameConfig.appTicker.remove(this.updateFunction);
                                setTimeout(this.checkPayLine.bind(this),1500);
                            }
                        }
                    }
                }
            }
        }
        GameConfig.appTicker.add(this.updateSpinner.bind(this));
    }
    stopReelAnimation(reelNo) {
        for (let j = 0; j < this.slotMachine.children[reelNo].children.length; j++) {
            const symbol = this.slotMachine.children[reelNo].children[j]
            gsap.to(symbol, {
                x: symbol.customParam.posX,
                y: symbol.customParam.posY,
                duration: 1,
                ease: 'power2.out'
            })
        }
    }
    checkPayLine() {
        this.currentPayLine += 1;
        switch (this.currentPayLine) {
            case 1:
                this.payLine(1,true);
                break;
            case 2:
                this.payLine(2,true);
                break;
            case 3:
                this.payLine(3,true);
                break;
            case 4:
                this.payLine(4,true);
                break;
            case 5:
                this.payLine(5,true);
                break;
            case 6:
                this.payLine(6,true);
                break;
            case 7:
                this.payLine(7,false);
                this.resetSlot();
                break;
        }
    }
    payLine(currentPayLine, checkNext) {
        const payLineSymArr = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 5; j++) {
                if (SlotConfig.payLines["payLines" + currentPayLine][i][j] == 1) {
                    const symbol = this.getSymbol(i, j);
                    payLineSymArr.push(symbol.customParam);
                }
            }
        }
        let totalWin = 0;
        let payLineTxt = "";
        for (let i = 0; i < SlotConfig.symbolTypes.length; i++) {
            const symbolCount = payLineSymArr.filter((symDetail) => symDetail.symbol === SlotConfig.symbolTypes[i]).length;
            if (symbolCount > 2) {
                const blinkData = payLineSymArr.filter((symDetail) => symDetail.symbol === SlotConfig.symbolTypes[i]);
                this.blinkRectAnim(blinkData);
                totalWin += SlotConfig.payTable[SlotConfig.symbolTypes[i]]["_" + symbolCount + "OfAKind"];
                payLineTxt = "- payline " + currentPayLine + ", " + SlotConfig.symbolTypes[i].replace("_symbol", "") + " x" + symbolCount + ", " + totalWin+"\n ";
                this.totalWinAmt += totalWin;
                this.payLineTxt += payLineTxt;
            }
        }
        if(totalWin>0){
            let totalWinTxt = `Total wins: ${this.totalWinAmt} \n ${this.payLineTxt}`;
            this.eventDispatcher.dispatchEvent(SlotEvent.UPDATE_WINTXT,{text:totalWinTxt});
        }
        if(checkNext != false){
            if(totalWin>0){
                setTimeout(this.checkPayLine.bind(this),1000);
            } else {
                this.checkPayLine();
            }
        }
    }
    blinkRectAnim(symArr) {
        for (let i = 0; i < symArr.length; i++) {
            const blinkRect = this.getBlinkRect(symArr[i].col, symArr[i].row);
            this.blinkRectangleColor(blinkRect);
        }
    }
    resetSlot() {
        this.currentPayLine = 0;
        this.totalWinAmt = 0;
        this.payLineTxt = "";
        this.eventDispatcher.dispatchEvent(SlotEvent.SHOW_SPINBTN);
    }
}
