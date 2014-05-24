Physics(function (world) {

    var nav = 91,
        viewWidth = window.innerWidth,
        viewHeight = window.innerHeight - nav,
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
        restitution: 0.5,
        cof: 0.4
    });

    window.addEventListener('resize', function () {

        nav = 91;

        viewWidth = window.innerWidth;
        viewHeight = window.innerHeight - nav;

        renderer.el.width = viewWidth;
        renderer.el.height = viewHeight;

        viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

        edgeBounce.setAABB(viewportBounds);
    }, true);

    world.add( Physics.body('rectangle', {
        x: viewWidth * 0.4,
        y: viewHeight * 0.3,
        width: 100,
        height: 100,
        vx: 0.3,
        styles: { fillStyle: 'green' }
    }));

    world.add( Physics.body('rectangle', {
        x: viewWidth * 0.6,
        y: viewHeight * 0.2,
        width: 100,
        height: 100,
        vx: 0.8,
        styles: { fillStyle: 'red' }
    }));

    var attractor = Physics.behavior('attractor', {
        order: 0,
        strength: 0.002
    });

    world.on({
        'interact:move': function( pos ){
            attractor.position( pos );
        },
        'interact:release': function(){
            world.remove( attractor );
        }
    });

    world.add([
        Physics.behavior('interactive', { el: renderer.el }),
        Physics.behavior('constant-acceleration'),
        Physics.behavior('body-impulse-response'),
        Physics.behavior('body-collision-detection'),
        Physics.behavior('sweep-prune'),
        edgeBounce
    ]);

    Physics.util.ticker.on(function (time) {
        world.step(time);
    });

    Physics.util.ticker.start();

});