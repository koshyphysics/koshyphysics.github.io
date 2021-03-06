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
            wireframes: false,
            hasBounds: true,
            showDebug: true,
            showBroadphase: true,
            showBounds: true,
            showVelocity: true,
            showCollisions: true,
            showAxes: true,
            showPositions: true,
            showAngleIndicator: true,
            showIds: true,
            showShadows: true
        }
    }
});

var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

World.add(engine.world, Bodies.circle(engine.render.options.width * 0.3, engine.render.options.height * 0.8, 50));

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