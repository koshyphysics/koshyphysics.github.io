Physics(function (world) {

    var viewWidth = window.innerWidth,
        viewHeight = window.innerHeight,
        viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    var renderer = Physics.renderer('canvas', {
        el: 'viewport',
        width: viewWidth,
        height: viewHeight,
        meta: true
    });

    world.add( renderer );

    world.on('step', function () {
        world.render();
    });

    var edgeBounce = Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.99,
        cof: 0.8
    });

    window.addEventListener('resize', function () {
        viewWidth = window.innerWidth;
        viewHeight = window.innerHeight;

        renderer.el.width = viewWidth;
        renderer.el.height = viewHeight;

        viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

        edgeBounce.setAABB(viewportBounds);
    }, true);

    world.add( Physics.body('rectangle', {
        x: viewWidth * 0.4,
        y: viewHeight * 0.3,
        width: 300,
        height: 200,
        vx: 0.3,
        styles: { fillStyle: 'green' }
    }));

    world.add([
        Physics.behavior('constant-acceleration'),
        Physics.behavior('body-impulse-response'),
        edgeBounce
    ]);

    Physics.util.ticker.on(function (time) {
        world.step(time);
    });

    Physics.util.ticker.start();

});