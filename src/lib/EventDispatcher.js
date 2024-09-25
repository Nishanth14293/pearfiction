export class EventDispatcher 
{
    constructor(){
        
    }
    addEvenListener(eventName,callback){
        document.addEventListener(eventName, callback);
    }
    dispatchEvent(eventName, param){
        const event = new CustomEvent(eventName, {detail: param});
        document.dispatchEvent(event);
    }    
}