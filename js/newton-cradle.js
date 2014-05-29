var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    RenderPixi = Matter.RenderPixi,
    Events = Matter.Events,
    Bounds = Matter.Bounds,
    Vector = Matter.Vector,
    Vertices = Matter.Vertices,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Query = Matter.Query;
 
var engine = Engine.create(document.body, {
    render: {
        options: {
            showAngleIndicator: true,
            wireframes: false,
            showVelocity: true,
            showDebug: true
        }
    }
});
 
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

var cradle = Composites.newtonsCradle(280, 100, 6, 25, 200);
World.add(engine.world, cradle);
Body.translate(cradle.bodies[0], { x: -180, y: -100 });

Engine.run(engine);