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

// makes some ground and walls and boundaries
var worldBoundaries = [
Bodies.rectangle(250, 490, 500, 20, { isStatic: true }),
Bodies.rectangle(10, 250, 20, 500, { isStatic: true }),
Bodies.rectangle(490, 250, 20, 500, { isStatic: true }),
Bodies.rectangle(250, 10, 500, 20, { isStatic: true }),
];
World.add(engine.world, worldBoundaries);

var stack = Composites.stack(200, 100, 10, 10, 1, 1, function(x, y){
    // let sides = Math.round(Common.random(2, 8));
    // return Bodies.polygon(x, y, sides, Common.random(20, 50), { restitution: 1 });
    // return Bodies.rectangle(x, y, 80, 80, { restitution: 1.5, friction: 0 });
    return Bodies.circle(x, y, 5, { restitution: 1.3});
})

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		render: { visible: false }
	}
});

World.add(engine.world, [ stack, mouseConstraint ] );
Engine.run(engine);
Render.run(render);
