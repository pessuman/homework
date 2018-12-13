// from data.js
var tableData = data;

// selecting the 'tbody' in the html.
var tbody = d3.select("tbody");

// creating a function that appends the data for each row into the html table created.
function outputTable() {
tableData.forEach((Report) => {
 var row = tbody.append("tr");
 Object.entries(Report).forEach(([key, value]) => {
   var cell = tbody.append("td");
   cell.text(value);
 });
});
};

outputTable();

// Select the submit button
var submit = d3.select("#filter-btn");
// creating a function attached to "submit" that will filter and give out the desired output.
submit.on("click", function() {

// Prevent the page from refreshing
 d3.event.preventDefault();
// removing the original data so that we can append the filtered data
d3.select("tbody").remove();



// Select the input element and get the raw HTML node
var inputDate = d3.select("#datetime");

// Get the value property of the input element
var valueDate = inputDate.property("value").toLowerCase();

// print output to the console
console.log(valueDate);

// Select the input element and get the raw HTML node for city,state,country,shape and \
// converting all string to lowercase
var inputCity = d3.select("#city");
var valueCity = inputCity.property("value").toLowerCase();
console.log(valueCity);


var inputState = d3.select("#state");
var valueState = inputState.property("value").toLowerCase();
console.log(valueState);


var inputCountry = d3.select("#country");
var valueCountry = inputCountry.property("value").toLowerCase();
console.log(valueCountry);


var inputShape = d3.select("#shape");
var valueShape = inputShape.property("value").toLowerCase();
console.log(valueShape);

// redefining the data so that it can be filtered upon multiple times
var filteredData = tableData
// multiple if statements to filter the data based on the user input given
if(valueDate !== ""){
  var filteredData = filteredData.filter(filteredData => filteredData.datetime === valueDate);
}

if(valueCity !== ""){
  var filteredData = filteredData.filter(filteredData => filteredData.city === valueCity);
}

if(valueState !== ""){
  var filteredData = filteredData.filter(filteredData => filteredData.state === valueState);
}

if(valueCountry !== ""){
  var filteredData = filteredData.filter(filteredData => filteredData.country === valueCountry);
}


if(valueShape !== ""){
  var filteredData = filteredData.filter(filteredData => filteredData.shape === valueShape);
}

console.log(filteredData);

// selecting the table from the html
var table=d3.select("#ufo-table");

// function that will replace the old data in the webpage with the new filtered data.
function filteredTableData() {
var tbody = table.append("tbody");
filteredData.forEach((input) => {
 var row = tbody.append("tr");
 Object.entries(input).forEach(([key, value]) => {
   var cell = tbody.append("td");
   cell.text(value);
 });
});
};

filteredTableData();

});
