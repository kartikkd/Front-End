
var list = [{"text":"NordStorm","size":2007},{"text":"Neiman","size":2300},{"text":"Bloomingdales","size":9000},{"text":"Barneys","size":4400},{"text":"Saks","size":7200},{"text":"Berdorf","size":1000},{"text":"NordStorm","size":2700},{"text":"Neiman","size":2300},{"text":"Bloomingdales","size":9000},{"text":"Barneys","size":4004},{"text":"Saks","size":7002},{"text":"Berdorf","size":1600}];
var width = 900;
var height = 500;
var color = d3.scale.linear().range([10,100]);
    //         .domain([0,1,2,3,4,5])
    //         .range(["red", "green", "blue", "black", "purple", "orange"]);
var fill=d3.scale.category20();
// d3.csv("data.csv",function(data) {                                          /* TO IMPORT DATA FROM data.csv
//     var leaders=data
//         .map(function(d) { return { text: d.Retailer, size: d.count }; })
//         .sort(function(a,b) { return d3.descending(a.size,b.size);});
//          //.slice(0,100);                                                    */
    color.domain([
        d3.min(list, function(d) { return d.size; }),
        d3.max(list, function(d) { return d.size; })
        ]);

    d3.layout.cloud().size([width, height])
            .words(list)
            .padding(3)
           // .rotate(function() { return ~~(Math.random() * 2) * 90;})
           .rotate(0)
            .font("Impact")
            .fontSize(function(d) { return color(d.size); })
            .on("end", draw)
            .start();
//});
    function draw(words) {
        d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "word-cloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate("+(width/2)+","+(height/2)+")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                //.style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }