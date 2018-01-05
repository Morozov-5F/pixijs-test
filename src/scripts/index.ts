import * as PIXI from "pixi.js";

// Import bundle styles
import "../styles/style.css";

// Stetup PIXI application
const setupApplication = () => {
    // Get Canvas to use by PIXI app
    const canvas = document.getElementById("app-canvas") as HTMLCanvasElement;

    // Configure application options
    const appOptions: PIXI.ApplicationOptions = {
        width:  256,
        height: 256,
        antialias: false,
        transparent: false,
        view: canvas,
        resolution: 1,
        backgroundColor: 0x00000000,
        forceCanvas: true,
    };

    const app = new PIXI.Application(appOptions);
    PIXI.utils.sayHello("canvas");
};

setupApplication();
