var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create engine and renderer
var engine = Engine.create();
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

// make the ground and platform
var ground = Bodies.rectangle(395, 600, 815, 50, {
    isStatic: true
});
var platform = Bodies.rectangle(610, 280, 200, 20, {
    isStatic: true
});

// make the pyramids
var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 25, 40);
});
var pyramid2 = Composites.pyramid(520, 0, 5, 10, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 25, 40);
});

// make the rock
var rockOptions = {
    density: 0.004
};
var rock = Bodies.polygon(170, 450, 8, 20, rockOptions);

// make the anchor and sling
var anchor = {
    x: rock.position.x,
    y: rock.position.y
};
var sling = Constraint.create({
    pointA: anchor,
    bodyB: rock,
    stiffness: 0.05
});

// add it to the world
World.add(engine.world, [ground, platform, pyramid2, pyramid, rock, sling]);


// do the slingy stuff
Events.on(engine, 'afterUpdate', function() {
    if (mouseConstraint.mouse.button === -1 && (rock.position.x > anchor.x + 20 || rock.position.y < anchor.y - 20)) {
        rock = Bodies.polygon(170, 450, 8, 20, rockOptions);
        sling.bodyB = rock;
        World.add(engine.world, rock);
    }
});

// add mouse control
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

// add to world and run stuff
World.add(engine.world, mouseConstraint);
Engine.run(engine);
Render.run(render);
