
// set width/height
const WIDTH = 1000;
const HEIGHT = 680;
// define margin
const MARGIN = { TOP: 0, RIGHT: 40, BOTTOM: 34, LEFT: 50 };

let xScale = d3.scaleLinear()
    .range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT]);

let xAxis = d3.axisBottom(xScale)
    .ticks(10)
    .tickSizeOuter(0);

let emScale = d3.scaleLinear()
    .range([6, 35]);

let colors = d3.scaleOrdinal()
    .domain(["France", "US", "Italy", "europe", "southAmerica", "oceania"])
    .range(['pink', 'teal', 'skyblue', 'coral', 'grey', 'tan']);

d3.select("#USColor").style("color", colors("US"));
d3.select("#namericaColor").style("color", colors("Italy"));
d3.select("#samericaColor").style("color", colors("southAmerica"));
d3.select("#FranceColor").style("color", colors("France"));
d3.select("#europeColor").style("color", colors("europe"));
d3.select("#oceaniaColor").style("color", colors("oceania"));

let formatNumber = d3.format(",");

let tt = d3.select("#svganchor").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

let svg = d3.select("#svganchor")
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);

let xline = svg.append("line")
    .attr("stroke", "gray")
    .attr("stroke-dasharray", "1,2");

let chartState = {};

chartState.variable = "points";
chartState.scale = "scaleLinear";
chartState.legend = "Points, in kilotonnes";

d3.csv("bubble_df.csv", function (error, data) {
    if (error) throw error;

    let dataSet = data;

    emScale.domain(d3.extent(data, d => +d.price));

    xScale.domain(d3.extent(data, d => +d.points));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGIN.BOTTOM) + ")")
        .call(xAxis);

    var legend = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT - 4)
        .attr("font-family", "PT Sans")
        .attr("font-size", 12)
        .attr("fill", "darkslategray")
        .attr("fill-opacity", 1)
        .attr("class", "legend");


    const manyBody = d3.forceManyBody().strength(2)
    const center = d3.forceCenter().x((WIDTH / 2)).y((HEIGHT / 2))
    // define force
    var simulation = d3.forceSimulation(dataSet, d => `${d.index}-${d.price}-${d.points}`)
        .force('center', center)
        .force('collision', d3.forceCollide(d => emScale(d.price)))
        .stop()

    for (var i = 0; i < dataSet.length; ++i) {
        simulation.tick();
    }

    // define circles
    var countriesCircles = svg.selectAll(".countries")
        .data(dataSet, d => `${d.index}-${d.price}-${d.points}`); //undo here

    countriesCircles.exit()
        .transition()
        .delay(900)
        .duration(1000)
        .attr("cx", 0)
        .attr("cy", (HEIGHT / 2) - MARGIN.BOTTOM / 2)
        .remove();

    countriesCircles.enter()
        .append("circle")
        .attr("class", "countries")
        .attr("cx", 0)
        .attr("cy", (HEIGHT / 2) - MARGIN.BOTTOM / 2)
        .attr("r", d => emScale(d.price))
        .style('stroke-width', 0)
        .attr('fill-opacity', .85)
        .attr("fill", d => colors(d.country))
        .merge(countriesCircles)
        .transition()
        .delay(900)
        .duration(1500)
        .ease(d3.easeBack)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    console.log('yep')


    // redraw(chartState.variable);

    d3.selectAll(".button1").on("click", function () {
        var thisClicked = this.value;
        chartState.variable = thisClicked;
        if (thisClicked == "points") {
            chartState.legend = "Points";
        };
        if (thisClicked == "price") {
            chartState.legend = "Price";
        }
        redraw(chartState.variable);
    });

    d3.selectAll(".button2").on("click", function () {
        var thisClicked = this.value;
        chartState.scale = thisClicked;
        redraw(chartState.variable);
    });

    d3.selectAll("input").on("change", filter);

    function redraw(variable) {

        console.log('variable',)

        xScale.domain(d3.extent(dataSet, d => +d[variable]));

        var xAxis = d3.axisBottom(xScale)
        // .ticks(10)
        // .tickSizeOuter(0);

        d3.transition(svg).select(".x.axis").transition()
            .delay(900).duration(1000)
            .call(xAxis);

        // define simulation
        var simulation = d3.forceSimulation(dataSet, d => `${d.index}-{d.price}-${d.points}`)
            .force("x", d3.forceX(d => xScale(+d[variable])).strength(2))
            .force("y", d3.forceY((HEIGHT / 2) - MARGIN.BOTTOM / 2))
            .force("collide", d3.forceCollide(d => emScale(d.price)))
            .stop();

        // only tick once
        for (var i = 0; i < dataSet.length / 2; ++i) simulation.tick();

        // define circles
        var countriesCircles = svg.selectAll(".countries")
            .data(dataSet, d => `${d.index}-{d.price}-${d.points}`);

        countriesCircles.exit()
            .transition()
            .delay(900)
            .duration(1000)
            .attr("cx", 0)
            .attr("cy", (HEIGHT / 2) - MARGIN.BOTTOM / 2)
            .remove();

        countriesCircles.enter()
            .append("circle")
            .attr("class", "countries")
            .attr("cx", 0)
            .attr("cy", (HEIGHT / 2) - MARGIN.BOTTOM / 2)
            .attr("r", d => emScale(d.price))
            .attr('fill-opacity', .75)
            .attr("fill", d => colors(d.country))
            .merge(countriesCircles)
            .transition()
            .delay(900)
            .duration(1500)
            .ease(d3.easeBack)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        legend.text(chartState.legend);

        d3.selectAll(".countries").on("mousemove", function (d) {
            d3.select(this)
                .style('stroke', 'black')
                .style('stroke-width', 2)
            tt.html("Winery: <strong>" + d.location + "</strong><br>"
                + chartState.legend.slice(0, chartState.legend.indexOf(",")) +
                ": <strong>" + formatNumber(d[variable]) + "</strong>")
                .style('top', d3.event.pageY - 12 + 'px')
                .style('left', d3.event.pageX + 25 + 'px')
                .style("opacity", 0.9);

            xline.attr("x1", d3.select(this).attr("cx"))
                .attr("y1", d3.select(this).attr("cy"))
                .attr("y2", (HEIGHT - MARGIN.BOTTOM))
                .attr("x2", d3.select(this).attr("cx"))
                .attr("opacity", 1);

        }).on("mouseout", function (d) {
            d3.select(this)
                .style('stroke-width', 0)
            tt.style("opacity", 0);
            xline.attr("opacity", 0);
        });

        d3.selectAll(".x.axis, .legend").on("mousemove", function () {
            tt.html("This axis uses SI prefixes:<br>m: 10<sup>-3</sup><br>k: 10<sup>3</sup><br>M: 10<sup>6</sup>")
                .style('top', d3.event.pageY - 12 + 'px')
                .style('left', d3.event.pageX + 25 + 'px')
                .style("opacity", 0.9);
        }).on("mouseout", d => tt.style("opacity", 0));

        //end of redraw
    }

    function filter() {

        function getCheckedBoxes(chkboxName) {
            var checkboxes = document.getElementsByName(chkboxName);
            var checkboxesChecked = [];
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxesChecked.push(checkboxes[i].defaultValue);
                }
            }
            return checkboxesChecked.length > 0 ? checkboxesChecked : null;
        }

        var checkedBoxes = getCheckedBoxes("country");

        var newData = [];

        if (checkedBoxes == null) {
            dataSet = newData;
            redraw();
            return;
        };

        for (var i = 0; i < checkedBoxes.length; i++) {
            var newArray = data.filter(function (d) {
                return d.country == checkedBoxes[i];
            });
            Array.prototype.push.apply(newData, newArray);
        }

        dataSet = newData;

        redraw(chartState.variable);

        //end of filter
    }

    //end of d3.csv
});
