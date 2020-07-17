
// set width/height
const MARGIN = { TOP: 0, RIGHT: 40, BOTTOM: 34, LEFT: 80 };
const WIDTH = 1200 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 680 - MARGIN.TOP - MARGIN.BOTTOM;
// define margin
var wineBottle1 = "M62.556,55.251c-0.582-4.41-2.9-10.966-3.395-12.451c-0.495-1.486-3.713-9.795-4.516-14.726  c-0.708-4.354-1.116-15.869-1.161-17.19c-0.003-0.082,0.017-0.161,0.058-0.232l0.042-0.073c0.067-0.117,0.077-0.259,0.026-0.384v0  c-0.053-0.129-0.041-0.275,0.032-0.394l0.351-0.573c0.054-0.088,0.075-0.193,0.059-0.295l-0.141-0.916  c-0.012-0.077-0.044-0.15-0.094-0.21l-0.145-0.178c-0.077-0.095-0.111-0.216-0.094-0.337c0.038-0.281,0.087-0.832-0.03-1.3  c-0.153-0.612-0.306-0.657-0.721-0.922C52.758,5.023,52.676,5,52.593,5h-2.69h-2.497c-0.083,0-0.164,0.023-0.234,0.068  c-0.415,0.266-0.568,0.311-0.721,0.922c-0.117,0.468-0.068,1.019-0.03,1.3c0.017,0.121-0.017,0.243-0.094,0.337l-0.145,0.178  c-0.049,0.061-0.082,0.133-0.094,0.21l-0.141,0.916c-0.016,0.102,0.005,0.207,0.059,0.295L46.357,9.8  c0.073,0.119,0.085,0.265,0.032,0.394c-0.051,0.125-0.042,0.267,0.026,0.384l0.042,0.073c0.041,0.071,0.061,0.151,0.058,0.232  c-0.045,1.321-0.452,12.836-1.161,17.19c-0.802,4.931-4.02,13.241-4.516,14.726c-0.495,1.486-2.813,8.042-3.395,12.451  c-0.606,4.586-0.548,21.464-0.402,24.028c0.108,1.892,0.007,10.13,0.189,12.325c0.089,1.068,0.562,1.801,0.782,2.044  C39.099,94.845,49.878,95,49.878,95s11.022-0.155,12.108-1.352c0.22-0.242,0.693-0.976,0.782-2.044  c0.183-2.195,0.081-10.433,0.189-12.325C63.104,76.715,63.162,59.837,62.556,55.251z M41.565,90.03c-0.001,0-0.001,0-0.002,0  c-0.261,0-0.473-0.211-0.474-0.472l-0.1-24.627c-0.001-0.261,0.21-0.474,0.472-0.476c0.001,0,0.001,0,0.002,0  c0.261,0,0.473,0.211,0.474,0.472l0.1,24.627C42.038,89.816,41.827,90.029,41.565,90.03z M44.316,46.974  c-0.011,0.037-1.142,3.762-1.519,5.807c-0.546,2.966-0.705,7.554-0.706,7.6c-0.009,0.256-0.219,0.458-0.473,0.458  c-0.005,0-0.011,0-0.016,0c-0.261-0.009-0.466-0.228-0.458-0.489c0.006-0.191,0.163-4.705,0.721-7.739  c0.386-2.099,1.497-5.757,1.544-5.912c0.076-0.25,0.341-0.392,0.591-0.315C44.251,46.459,44.392,46.723,44.316,46.974z"
// wine bottle by Fabio Meroni from the Noun Project
let wineBottle2 = "M58.709,48.062c-7.346-13.437-5.094-36.502-5.094-36.502c1.516-0.451,0-2.419,0-2.419c-0.646-0.773-0.097-1.547-0.097-1.547  c0.21-0.715-0.193-1.179-0.814-1.481c0.14-0.045,0.282-0.092,0.427-0.143c0.406-0.155,0.828-0.562,0.896-0.879  c0.252-1.147,0.164-2.366-0.241-3.513c-0.111-0.317-0.565-0.724-0.958-0.879c-2.549-0.932-4.071-0.932-6.618,0  c-0.393,0.155-0.847,0.562-0.959,0.879c-0.405,1.147-0.492,2.366-0.24,3.513c0.067,0.317,0.488,0.724,0.896,0.879  c0.138,0.049,0.273,0.093,0.409,0.137c-0.628,0.301-1.038,0.768-0.828,1.487c0,0,0.55,0.773-0.096,1.547c0,0-1.517,1.968,0,2.419  c0,0,2.251,23.065-5.093,36.502c-3.006,5.497-6.577,10.245-5.609,24.421l1.869,23.907c0,0-0.323,2.964,4.32,3.286  c0,0,3.661,0.323,8.626,0.323c4.964,0,8.625-0.323,8.625-0.323c4.642-0.322,4.318-3.286,4.318-3.286l1.871-23.907  C65.285,58.308,61.713,53.56,58.709,48.062z"

let xScale = d3.scaleLinear()
    .range([0, WIDTH]);

let xAxis = d3.axisBottom(xScale)
    .ticks(10)
    .tickSizeOuter(0);

let emScale = d3.scaleLinear()
    .range([.25, .5]);

let emScale2 = d3.scaleLinear()
    .range([8, 20]);

let colors = d3.scaleOrdinal()
    .domain(["France", "US", "Italy", "europe", "southAmerica", "oceania"])
    .range(['pink', 'red', 'white', 'coral', 'grey', 'tan']);

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
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    .append('g')
    .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);;

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
    emScale2.domain(d3.extent(data, d => +d.price));

    xScale.domain(d3.extent(data, d => +d.points));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT) + ")")
        .call(xAxis);

    let legend = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT - 4)
        .attr("font-family", "PT Sans")
        .attr("font-size", 12)
        .attr("fill", "darkslategray")
        .attr("fill-opacity", 1)
        .attr("class", "legend");

    makeChart(chartState.variable);

    d3.selectAll(".button1").on("click", function () {
        let thisClicked = this.value;
        chartState.variable = thisClicked;
        if (thisClicked == "points") {
            chartState.legend = "Points";
        };
        if (thisClicked == "price") {
            chartState.legend = "Price";
        }
        makeChart(chartState.variable);
    });

    d3.selectAll(".button2").on("click", function () {
        let thisClicked = this.value;
        chartState.scale = thisClicked;
        makeChart(chartState.variable);
    });

    d3.select('#resize').on('click', function () {
        d3.selectAll('.bottle')
            .transition()
            .duration(1200)
            .attr("transform", d => `translate(-1,0) scale(${emScale(d.price)}, ${emScale(d.price)})`)
    })

    d3.selectAll("input").on("change", filter);

    function makeChart(variable) {

        xScale.domain(d3.extent(dataSet, d => +d[variable]));

        let xAxis = d3.axisBottom(xScale)
        // .ticks(10)
        // .tickSizeOuter(0);

        d3.transition(svg).select(".x.axis").transition()
            .delay(900).duration(1000)
            .call(xAxis);

        // define simulation
        let simulation = d3.forceSimulation(dataSet, d => `${d.index}-{d.price}-${d.points}`)
            .force("x", d3.forceX(d => xScale(+d[variable])).strength(2.5))
            .force("y", d3.forceY((HEIGHT / 2)).strength(.25))
            .force("collide", d3.forceCollide(d => emScale2(d.price)))
            .stop();

        // only tick once
        for (let i = 0; i < dataSet.length / 2; ++i) simulation.tick();

        // define circles
        let countriesCircles = svg.selectAll(".countries")
            .data(dataSet, d => `${d.index}-{d.price}-${d.points}`);



        countriesCircles.exit()
            .transition()
            .delay(900)
            .duration(1000)
            .attr('transform', 'translate(10000, 10000)')
            .remove();

        let cEnter = countriesCircles.enter()
            .append('g')
            .attr('class', 'countries')
            .attr('transform', d => {
                return `translate(${d.x}, ${d.y + 1})`
            })

        cEnter.append('path')
            .attr('class', 'bottle')
            .attr("d", wineBottle1)
            .attr("transform", `translate(-1,0) scale(0.2,0.2)`)
            // .attr("transform", d => `translate(-1,0) scale(${emScale(d.price)}, ${emScale(d.price)})`)
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .attr('fill-opacity', .75)
            .attr("fill", d => colors(d.country))


        countriesCircles
            .attr('fill-opacity', .75)
            .attr("fill", d => colors(d.country))
            .merge(cEnter)
            .transition()
            .delay(900)
            .duration(1500)
            .ease(d3.easeBack)
            .attr('transform', d => `translate(${d.x}, ${d.y})`)

        legend.text(chartState.legend);

        d3.selectAll(".bottle").on("mousemove", function (d) {
            d3.select(this)
                .style('stroke', 'black')
                .style('stroke-width', 4)
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
            d3.select(this).style('stroke-width', 2)
            tt.style("opacity", 0);
            xline.attr("opacity", 0);
        });

        d3.selectAll(".x.axis, .legend").on("mousemove", function () {
            tt.html("This axis uses SI prefixes:<br>m: 10<sup>-3</sup><br>k: 10<sup>3</sup><br>M: 10<sup>6</sup>")
                .style('top', d3.event.pageY - 12 + 'px')
                .style('left', d3.event.pageX + 25 + 'px')
                .style("opacity", 0.9);
        }).on("mouseout", d => tt.style("opacity", 0));

        //end of makeChart
    }

    function filter() {

        function getCheckedBoxes(chkboxName) {
            var checkboxes = document.getElementsByName(chkboxName);
            var checkboxesChecked = [];
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxesChecked.push(checkboxes[i].defaultValue);
                }
            }
            return checkboxesChecked.length > 0 ? checkboxesChecked : null;
        }

        let checkedBoxes = getCheckedBoxes("country");

        let newData = [];

        if (checkedBoxes == null) {
            dataSet = newData;
            makeChart();
            return;
        };

        for (let i = 0; i < checkedBoxes.length; i++) {
            let newArray = data.filter(function (d) {
                return d.country == checkedBoxes[i];
            });
            Array.prototype.push.apply(newData, newArray);
        }

        dataSet = newData;

        makeChart(chartState.variable);

        //end of filter
    }

    //end of d3.csv
});
