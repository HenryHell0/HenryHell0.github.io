// make the engiene and stuff simpler
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events,
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


// cloth
// useful for collision filters

// collision filter part to remember
var group = /* FUNCTION TO REMEMBER HOW WORKS --> */Body.nextGroup(true);
var particleOptions = { friction: 0.00001, collisionFilter: { /*  IMPORTANT PART AHEAD --> */group: group }, render: { visible: false }};

// constraint options for optimal c l o t h
var constraintOptions = { stiffness: 0.06, render: { strokeStyle: "lightBlue" } };

// make the cloth using a softbody
var cloth = Composites.softBody(10, 100, 20, 10, 5, 5, false, 10, particleOptions, constraintOptions);

// make the top bits solid to that it floats
for (var i = 0; i < 20; i++) {
    cloth.bodies[i].isStatic = true;
}

var worldBodies = [


// non-static circle and rectnagle
Bodies.circle(250, 400, 40),
Bodies.rectangle(400, 400, 70, 70),
// static circle and rectangle
Bodies.circle(350, 350, 40, { isStatic: true }),
Bodies.rectangle(150, 380, 100, 80, { isStatic: true }),
// ground
Bodies.rectangle(250, 490, 500, 20, { isStatic: true })

];

World.add(engine.world, cloth);
World.add(engine.world, worldBodies);

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		render: { visible: false }
	}
});


World.add(engine.world, [ mouseConstraint ]);
Engine.run(engine);
Render.run(render);

