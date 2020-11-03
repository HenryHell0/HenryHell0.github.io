// make the engiene and stuff simpler
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Compsite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;


var engine = Engine.create();
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
    	width: 500,
    	height: 500,
    	wireframes: false
    }
 });

var worldBoundaries = [
Bodies.rectangle(250, 490, 500, 20, { isStatic: true }),
Bodies.rectangle(10, 250, 20, 500, { isStatic: true }),
Bodies.rectangle(490, 250, 20, 500, { isStatic: true }),
Bodies.rectangle(250, 10, 500, 20, { isStatic: true }),
];
World.add(engine.world, worldBoundaries);

var stack = Composites.stack(100, 100, 15, 15, 0, 0, function(x, y){
    return Bodies.rectangle(x, y, 20, 20, { friction: 0, mass: 0, restitution: 0 });
});

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

engine.world.gravity.y = -0.1;
World.add(engine.world, [ stack, mouseConstraint ] );
Engine.run(engine);
Render.run(render);
