// make the engiene and stuff simpler
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Mouse = Matter.Mouse,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint;


var engine = Engine.create();
engine.world.gravity.y = 0;
engine.world.gravity.x = 0;
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
    	width: 500,
    	height: 500,
    	wireframes: false
    }
 });


var stack = Composites.stack(150, 150, 5, 5, 0, 0, function(x, y){
    return Bodies.rectangle(x, y, 40, 40, { restitution: 0, mass: 0 });
});

var worldBodies = [

// gorund
Bodies.rectangle(250, 490, 500, 20, {isStatic: true}),

];

var worldConstraints = [

// a seperate array for constraints that have to refernece bodies
// Constraint.create({
//     bodyA: worldBodies[0],
//     bodyB: worldBodies[1],
//     length: 200,
//     stiffness: 0.01
// })
];

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		render: { visible: false }
	}
});


World.add(engine.world, worldBodies );
World.add(engine.world, stack );
World.add(engine.world, worldConstraints);
World.add(engine.world, [ mouseConstraint ]);
Engine.run(engine);
Render.run(render);
