// make the engine and stuff simpler(alaises? allies? alliases?????)
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Events = Matter.Events,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Vector = Matter.Vector,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// make the engine and renderer
var engine = Engine.create();
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1000,
        height: 500,
        wireframes: false
    }
});


// get keys and log them
var keys = [];
document.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
});
document.addEventListener("keyup", function(event) {
    keys[event.keyCode] = false;
});




// add the ground/bounds to the world
World.add(engine.world, [
    Bodies.rectangle(render.canvas.width / 2, render.canvas.height - 10, render.canvas.width, 20, {
        isStatic: true
    }),
]);


// make the stuff

// right platform
var platforms = [
    // right thingy ground
    Bodies.rectangle(870, 320, 200, 15, {
        isStatic: true
    }),
    // right thingy left wall
    Bodies.rectangle(777, 275, 15, 100, {
        isStatic: true
    }),
    // right thingy right wall
    Bodies.rectangle(963, 275, 15, 100, {
        isStatic: true
    }),
    //right wall for the circles
    Bodies.rectangle(992, 430, 15, 100, {
        isStatic: true
    }),
    // left angled thingy
    Bodies.rectangle(50, 450, 15, 200, {
        angle: -0.5,
        isStatic: true
    }),
    // right angles thingy
    Bodies.rectangle(250, 450, 15, 200, {
        angle: 0.5,
        isStatic: true
    }),
];

// scoopy stuff
var scoop = Composites.stack(50, 50, 15, 1, 0, 0, function(x, y) {
    return Bodies.circle(x, y, 10);
});

var scoopChain = Composites.chain(scoop, 0, 0, 0, 0, {
    length: 20,
    stiffness: 1
});



var rCircles = Composites.stack(850, 350, 5, 5, 0, 0, function(x, y) {
    return Bodies.circle(x, y, 10);
});

// the stack of stuff on the right
var rStack = Composites.stack(800, 120, 9, 4, 0, 0, function(x, y) {
    let sides = Math.round(Common.random(3, 7));
    return Bodies.polygon(x, y, sides, 10);
});

// pyramid
var pyramid = Composites.pyramid(500, 250, 12, 5, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 30, 45)
});
World.add(engine.world, [rStack, pyramid, rCircles, scoop]);
World.add(engine.world, platforms)


// add mouse control and add it to the world
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {
            visible: false
        }
    }
});


// add stuf to the world that I havent yet
World.add(engine.world, mouseConstraint);
// run the engine and renderer
Engine.run(engine);
Render.run(render);
