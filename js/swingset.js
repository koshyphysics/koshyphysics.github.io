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

    world.add(Physics.body('convex-polygon', {
        x: viewWidth * 0.5,
        y: viewHeight,
        vertices: [{ x: -30, y: 20 }, { x: 100, y: 60 }, {x: 30, y: 250/2}],
        angle: 30,
        restitution: 0,
        treatment: 'static'
    }));

    world.add(Physics.body('rectangle', {
        x: viewWidth * 0.5,
        y: viewHeight * 0.89,
        width: 600,
        height: 20,
        restitution: 0,
        styles: { fillStyle: '#0074D9', angleIndicator: '#3b3e6b' },
        mass: 500
    }));

    world.add(Physics.body('circle', {
        x: viewWidth * 0.65,
        y: viewHeight * 0.25,
        radius: 60,
        mass: 350,
        restitution: 2
    }));

    var c = 5;
    while(c--) {
        world.add(Physics.body('rectangle', {
            x: viewWidth * 0.35,
            y: viewHeight * c/8,
            width: 50,
            height: 50,
            styles: { fillStyle: '#2ECC40', angleIndicator: '#DDDDDD'},
            restitution: 1,
            mass: 5
        }));
    }

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