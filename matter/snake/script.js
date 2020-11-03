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
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
    	width: 500,
    	height: 500,
    	wireframes: false
    }
 });

var worldCircles = [

Bodies.circle(250, 10, 10, { restitution: 0})

];

var worldBodies = [

Bodies.rectangle(250, 490, 500, 20, {isStatic: true}),

];

var worldConstraints = [

// a seperate array for constraints that have to refernece bodies
];

// make a line of objects
for (let y = 20; y < 480; y += 20){
    worldCircles.unshift(Bodies.circle(250, y, 10, { restitution: 0}));
}

for (let i = 0; i < worldCircles.length - 1; i++){
    worldConstraints[i] = (Constraint.create({
        bodyA: worldCircles[i],
        bodyB: worldCircles[i + 1],
        length: worldCircles[i].circleRadius * 2,
        stiffness: 1,
        render: { visible: false }
    }));
}


var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		render: { visible: false }
	}
});


World.add(engine.world, worldCircles );
World.add(engine.world, worldBodies );
World.add(engine.world, worldConstraints);
World.add(engine.world, [ mouseConstraint ]);
Engine.run(engine);
Render.run(render);