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
 
var rec = Bodies.rectangle(engine.render.options.width * 0.4, engine.render.options.height * 0.6, 120, 80, { friction: 0.03, force: {x: -0.1306, y: 0} });
 
World.add(engine.world, [
    Bodies.rectangle(engine.render.options.width * 0.7, engine.render.options.height * 0.9, 3000, 20, { isStatic: true, angle: Math.PI / 9 }),
    rec
]);
 
var offset = 5;
World.add(engine.world, [
    Bodies.rectangle(engine.render.options.width / 2, -offset, engine.render.options.width + 2 * offset, 50, {
        isStatic: true
    }),
    Bodies.rectangle(engine.render.options.width / 2, engine.render.options.height + offset, engine.render.options.width + 2 * offset, 50, {
        isStatic: true
    }),
    Bodies.rectangle(engine.render.options.width + offset, engine.render.options.height / 2, 50, engine.render.options.height + 2 * offset, {
        isStatic: true
    }),
    Bodies.rectangle(-offset, engine.render.options.height / 2, 50, engine.render.options.height + 2 * offset, {
        isStatic: true
    })
]);
 
Engine.run(engine);