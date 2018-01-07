import * as PIXI from "pixi.js";

// Import bundle styles
import "../styles/style.css";

// Stetup PIXI application
const setupApplication = () => {
    // Get Canvas to use by PIXI app
    const canvas = document.getElementById("app-canvas") as HTMLCanvasElement;

    // Configure application options
    const appOptions: PIXI.ApplicationOptions = {
        width:  800,
        height: 600,
        antialias: false,
        transparent: false,
        view: canvas,
        resolution: 1,
        backgroundColor: 0xFFFFFF,
        forceCanvas: true,
    };

    const app = new PIXI.Application(appOptions);
    PIXI.utils.sayHello("canvas");

    const text: PIXI.Text = new PIXI.Text("Unknown");
    app.stage.addChild(text);

    app.ticker.add((deltaTime: number): void => {
        text.text = (app.ticker.FPS / deltaTime).toString();
    });

    app.ticker.stop();

    const render = (): void => {
        app.ticker.update(performance.now());
        app.render();

        requestAnimationFrame(render);
    };

    render();
};

setupApplication();
