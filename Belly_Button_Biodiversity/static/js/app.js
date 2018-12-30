function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var metaUrl = `/metadata/${sample}`;
  d3.json(metaUrl).then(function(response){
  // Use d3 to select the panel with id of `#sample-metadata`
  var sample_metadata = d3.select("#sample-metadata");



    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    var data = Object.entries(response);
    data.forEach(function(obj){
      sample_metadata.append("div").text(obj);
    });
})
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function(response){
    // @TODO: Build a Bubble Chart using the sample data
    var otuIds = response.otu_ids;
    var otuLabels = response.otu_labels;
    var sampleValues = response.sample_values;
    var bubbleChart = {
      mode: 'markers',
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      marker:{
        color:otuIds,
        colorscale:'Viridis',
        size:sampleValues
      }
    };

    var Data = [bubbleChart];

    var layout = {
      
      height: 550,
      width: 1000,
      xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot("bubble",Data,layout);
  })

    // @TODO: Build a Pie Chart
  d3.json(url).then(function(response){
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var topOtuIds = response.otu_ids.slice(0,10);
    var topOtuLables = response.otu_labels.slice(0,10);
    var topsampleValues = response.sample_values.slice(0,10);

    var pData = {
      "lables": topOtuIds,
      "values": topsampleValues,
      "hovertext": topOtuLables,
      "type": "pie"
    };

    var Data = [pData];

    var layout ={
      title: "OTU ID "
    }

  Plotly.newPlot("pie",Data,layout );
});

}
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
