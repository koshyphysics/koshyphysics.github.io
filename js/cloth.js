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

    world.add(renderer);

    world.on('step', function () {
        world.render();
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

    var rigidConstraints = Physics.behavior('verlet-constraints', {
        iterations: 1
    });

    function createCloth(rigidConstraints, cloth, num, color) {
        for (var row = 0, l = 20; row < l; ++row) {
            for (var col = 0, lcol = 15; col < lcol; ++col) {
                cloth.push(
                    Physics.body('circle', {
                        x: 8 * col + (viewWidth - l * 8) / num,
                        y: 8 * row + (viewHeight / 2 - 200),
                        radius: 4,
                        hidden: true
                    })
                );

                if (col > 0) rigidConstraints.distanceConstraint(cloth[lcol * row + col - 1], cloth[lcol * row + col], 0.4);

                if (row > 0) {
                    rigidConstraints.distanceConstraint(cloth[lcol * row + col], cloth[lcol * (row - 1) + col], 0.5, 8);
                } else {

                    cloth[lcol * row + col].treatment = 'static';
                }
            }
        }

        world.on('integrate:positions', function () {
            var constraints = rigidConstraints.getConstraints().distanceConstraints,
                c,
                threshold = 60,
                scratch = Physics.scratchpad(),
                v = scratch.vector(),
                len;

            for (var i = 0, l = constraints.length; i < l; ++i) {
                c = constraints[i];
                len = v.clone(c.bodyB.state.pos).vsub(c.bodyA.state.pos).norm();
                if ((c.bodyA.treatment !== 'static' && c.bodyB.treatment !== 'static') && (len - c.targetLength) > threshold) {
                    rigidConstraints.remove(c);
                }
            }
            scratch.done();
        }, null, 100);

        var clothStyles = {
            strokeStyle: '#0074D9',
            lineWidth: 0.8
        };
        world.on('render', function (data) {
            var renderer = data.renderer,
                constraints = rigidConstraints.getConstraints().distanceConstraints,
                c,
                ctx = renderer.ctx,
                t = data.meta.interpolateTime || 0;

            ctx.beginPath();
            ctx.strokeStyle = clothStyles.strokeStyle;
            ctx.lineWidth = clothStyles.lineWidth;
            for (var i = 0, l = constraints.length; i < l; ++i) {

                c = constraints[i];
                ctx.moveTo(c.bodyA.state.pos.x + c.bodyA.state.vel.x * t, c.bodyA.state.pos.y + c.bodyA.state.vel.y * t);
                ctx.lineTo(c.bodyB.state.pos.x + c.bodyB.state.vel.x * t, c.bodyB.state.pos.y + c.bodyB.state.vel.y * t);
            }
            ctx.stroke();
        });

        world.add(cloth);
        world.add(rigidConstraints);
    }

    createCloth(rigidConstraints, [], 2);
    createCloth(rigidConstraints, [], 3);
    createCloth(rigidConstraints, [], 1.5);

    var attractor = Physics.behavior('attractor', {
        order: 0,
        strength: 0.002
    });

    world.on({
        'interact:move': function (pos) {
            attractor.position(pos);
        },
        'interact:release': function () {
            world.remove(attractor);
        }
    });

    world.add([
        Physics.behavior('interactive', {
            el: renderer.el,
            moveThrottle: 5
        }),
        Physics.behavior('constant-acceleration')
    ]);

    Physics.util.ticker.on(function (time) {
        world.step(time);
    });

    Physics.util.ticker.start();

});