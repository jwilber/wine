let svg = d3.select("#chart1");


class StateTween {
    constructor(opts) {
        const that = this;
        this.svg = opts.svg;
        this.data = opts.data;
        this.path = svg.append("path")
            .style('stroke', 'black')
            .style('stroke-width', 5)

        d3.json(this.data, function (err, topo) {
            that.states = topojson.feature(topo, topo.objects.states)
                .features.map(d => d.geometry.coordinates[0]);

            that.ca = that.states[0].slice(0);
            that.wa = that.states[1].slice(0);
            that.ma = that.states[2].slice(0);
            that.makeState('ca', 'ca');
        })

    }

    addPoints(ring, numPoints) {

        let desiredLength = ring.length + numPoints,
            step = d3.polygonLength(ring) / numPoints;

        let i = 0,
            cursor = 0,
            insertAt = step / 2;

        do {

            let a = ring[i];
            let b = ring[(i + 1) % ring.length];

            let segment = this.distanceBetween(a, b);

            if (insertAt <= cursor + segment) {
                ring.splice(i + 1, 0, this.pointBetween(a, b, (insertAt - cursor) / segment));
                insertAt += step;
                continue;
            }

            cursor += segment;
            i++;

        } while (ring.length < desiredLength);

    }

    pointBetween(a, b, pct) {

        let point = [
            a[0] + (b[0] - a[0]) * pct,
            a[1] + (b[1] - a[1]) * pct
        ];

        point.added = true;
        return point;

    }

    distanceBetween(a, b) {
        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    }

    makeState(nState, pState) {

        console.log('yessir')
        console.log('nState', nState)
        console.log('pState', pState)
        const that = this;

        const newState = that[nState];
        const prevState = that[pState];

        let join = d => { return "M" + d.join("L") + "Z"; }

        // Same number of points on each ring
        if (newState.length < prevState.length) {
            that.addPoints(newState, prevState.length - newState.length);
        } else if (prevState.length < newState.length) {
            that.addPoints(prevState, newState.length - prevState.length);
        }

        let t = d3.transition()
            .duration(800);

        that.path.transition(t)
            .attr("d", d => join(newState))
    }
}

