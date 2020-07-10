d3.json("samples.json").then(function(data){ 
  
    console.log(data);
    console.log(data.names)
    // var selector = d3.select("#selDataset")
		// .append("select")
		// .attr("id")
		// .selectAll("option")
		// .data(data.names)
		// .enter().append("option")
		// .text(function(d) { return d.city; })
		// .attr("value", function (d, i) {
		// 	return i;
		// });
    var drop = []
    
    data.names.forEach(element => {
      
        drop.push(element)
      
      
      });
    console.log(drop)
    var selector = d3.select("#selDataset")
		// .append("select")
    // .attr("names")
    
    .selectAll("option")
    .data(drop)
		.enter().append("option")
		.text(function(d) { return d; })
		.attr("value", function (d, i) {
			return d;
    });
    
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");

    
    // data.forEach(element => {
    // console.log(data.names)
    // })
    // console.log(data.samples)
    arrayOtu_ids = []
    arrayOtu_labels = []
    arraySample_values = []

    data.samples.forEach(element => {
      if (dataset == element.id){
      // console.log(element.otu_ids)
      element.otu_ids.forEach(element1 => {
      arrayOtu_ids.push(element1)
      })
      element.otu_labels.forEach(element2 => {
      arrayOtu_labels.push( element2)
      })
      element.sample_values.forEach(element3 => {
      arraySample_values.push(element3)
      })
    }
    });
    arrayOtu_ids.reverse()
    arrayOtu_labels.reverse()
    arraySample_values.reverse()

    arrayOtu_ids_OTU = []
    for(var i=0;i<arrayOtu_ids.length;i++){
      arrayOtu_ids_OTU[i]="OTU "+arrayOtu_ids[i];
    }
    
    // arrayOtu_ids.push(element1)
    
    // for (var i = 0; i < arraySample_values.length; i++) {
    //   arraySample_values[i].Value = +arraySample_values[i].Value;
    // }
    let Otu_idsSliced = arrayOtu_ids_OTU.slice(-10);
    let Otu_labelsSliced =arrayOtu_labels.slice(-10);
    let sampleSliced =arraySample_values.slice(-10);



    console.log(arrayOtu_ids.length)
    console.log(arrayOtu_labels.length)
    console.log(arraySample_values.length)
    console.log(Otu_idsSliced)
    console.log(Otu_labelsSliced)
    console.log(sampleSliced)
    console.log(typeof arraySample_values[0])
    // sample_values_sorted = [...arraySample_values]
    // sample_values_sorted.sort(function(a, b){return a-b});
    // console.log(sample_values_sorted)
    var trace1 = {
      x: sampleSliced,
      y: Otu_idsSliced,
      name: Otu_labelsSliced,
      orientation: 'h',
      marker: {
        color: 'rgba(55,128,191,0.6)',
        // width: 1
      },
      type: 'bar',
      hoverinfo: Otu_labelsSliced, 
      text: Otu_labelsSliced
    };
    
    var data1 = [trace1];
    
    var layout = {
      title: 'Top 10 OTUs',
      width: 450
      // barmode: 'stack'
    };
    
    Plotly.newPlot('bar', data1, layout);
    
    colors =  []

    for(var i=0;i<arraySample_values.length;i++){
      color1 = []
      color1 = [Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)]
      colors[i]="rgb("+ color1 + ")";
    }
    console.log(colors)
    var trace2 = {
      x: arrayOtu_ids,
      y: arraySample_values,
      text: arrayOtu_labels,
      mode: 'markers',
      marker: {
        color: colors,
        // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        size: arraySample_values
      }
    };
    
    var data2 = [trace2];
    
    var layout = {
      // title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 1200,
      xaxis: {
        title: {
          text: 'OTU ID'} }
    };
    
    Plotly.newPlot('bubble', data2, layout);

    
    
    
    var wash = []
    data.metadata.forEach(element => {
      if (dataset == element.id){
        wash.push(element.wfreq)
      
      }
      });
      console.log(wash)
    var data3 = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wash[0],
        title: { text: "Belly Button Washing Frequency (scrubs per week)" },
        type: "indicator",
        mode: "gauge+number+delta",
        // delta: { reference: 380 },
        gauge: {
          axis: { range: [null, 10] },
          steps: [
            { range: [0, 1], color: "		#AFEEEE" },
            { range: [1, 2], color: "	#7FFFD4" },
            { range: [2, 3], color: "#40E0D0" },
            { range: [3, 4], color: "#48D1CC" },
            { range: [4, 5], color: "#00CED1" },
            { range: [5, 6], color: "#1E90FF" },
            { range: [6, 7], color: "	#4169E1" },
            { range: [7, 8], color: "		#0000FF" },
            { range: [8, 9], color: "	#0000CD" },
            { range: [9, 10], color: "#00008B" },

          ],
          // threshold: {
          //   line: { color: "red", width: 4 },
          //   thickness: 0.75,
          //   value: 490
          // }
        }
      }
    ];
    
    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data3, layout);







    var matrix = []
    data.metadata.forEach(element => {
    if (dataset == element.id){
    // console.log(element.otu_ids)
    matrix = element
    } 
    })
    console.log(matrix)
//     console.log([matrix.id])
    // var table = d3.select('#sample-metadata')
    data4 = Object.keys(matrix).map(function(k) { return {key:k, value:matrix[k]} })

    var table = d3.select("#sample-metadata").append("table")
        .attr("style", "margin-left: 0px; border: 0px"),
    thead = table.append("thead"),
    tbody = table.append("tbody");

// append the header row
thead.append("tr")
    .selectAll("th")
    .data(["Key", "Value"])
    .enter()
    .append("th")
        .text(function(d) { console.log(d);return d; });


// create a row for each object in the data
var rows = tbody.selectAll("tr")
    .data(data4)
    .enter()
    .append("tr");
    ///add the key in first td
    rows.append("td")
	.text(function(d) { ;return d.key; });
	///add the value in second td
    rows
    .append("td")
	.append("input")
	.attr('readonly', true)
	.attr("name", "byName")
  .attr("type", "text")
  .attr("style", "width : 90px; border: 0px")
  
  .attr("value",function(d) { return d.value; });
  
















  d3.selectAll("#selDataset").on("change", getData);

  // This function is called when a dropdown menu item is selected
  function getData() {
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");

    arrayOtu_ids = []
    arrayOtu_labels = []
    arraySample_values = []

    data.samples.forEach(element => {
      if (dataset == element.id){
      // console.log(element.otu_ids)
      element.otu_ids.forEach(element1 => {
      arrayOtu_ids.push(element1)
      })
      element.otu_labels.forEach(element2 => {
      arrayOtu_labels.push( element2)
      })
      element.sample_values.forEach(element3 => {
      arraySample_values.push(element3)
      })
    }
    });
    arrayOtu_ids.reverse()
    arrayOtu_labels.reverse()
    arraySample_values.reverse()

    arrayOtu_ids_OTU = []
    for(var i=0;i<arrayOtu_ids.length;i++){
      arrayOtu_ids_OTU[i]="OTU "+arrayOtu_ids[i];
    }
    
    // arrayOtu_ids.push(element1)
    
    // for (var i = 0; i < arraySample_values.length; i++) {
    //   arraySample_values[i].Value = +arraySample_values[i].Value;
    // }
    let Otu_idsSliced = arrayOtu_ids_OTU.slice(-10);
    let Otu_labelsSliced =arrayOtu_labels.slice(-10);
    let sampleSliced =arraySample_values.slice(-10);



    console.log(arrayOtu_ids.length)
    console.log(arrayOtu_labels.length)
    console.log(arraySample_values.length)
    console.log(Otu_idsSliced)
    console.log(Otu_labelsSliced)
    console.log(sampleSliced)
    console.log(typeof arraySample_values[0])
    // sample_values_sorted = [...arraySample_values]
    // sample_values_sorted.sort(function(a, b){return a-b});
    // console.log(sample_values_sorted)
    var trace1 = {
      x: sampleSliced,
      y: Otu_idsSliced,
      name: Otu_labelsSliced,
      orientation: 'h',
      marker: {
        color: 'rgba(55,128,191,0.6)',
        // width: 1
      },
      type: 'bar',
      hoverinfo: Otu_labelsSliced, 
      text: Otu_labelsSliced
    };
    
    var data1 = [trace1];
    
    var layout = {
      title: 'Top 10 OTUs',
      width: 500
      // barmode: 'stack'
    };
    
    Plotly.newPlot('bar', data1, layout);
    
    colors =  []

    for(var i=0;i<arraySample_values.length;i++){
      color1 = []
      color1 = [Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1), Math.floor((Math.random() * 255) + 1)]
      colors[i]="rgb("+ color1 + ")";
    }
    console.log(colors)
    var trace2 = {
      x: arrayOtu_ids,
      y: arraySample_values,
      text: arrayOtu_labels,
      mode: 'markers',
      marker: {
        color: colors,
        // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        size: arraySample_values
      }
    };
    
    var data2 = [trace2];
    
    var layout = {
      // title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 1200,
      xaxis: {
        title: {
          text: 'OTU ID'} }
    };
    
    Plotly.newPlot('bubble', data2, layout);
   
    var wash1 = []
    data.metadata.forEach(element => {
      if (dataset == element.id){
        wash1.push(element.wfreq)
      
      }
      });
      console.log(wash1)
    var data3 = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wash1[0],
        title: { text: "Belly Button Washing Frequency (scrubs per week)" },
        type: "indicator",
        mode: "gauge+number+delta",
        // delta: { reference: 380 },
        gauge: {
          axis: { range: [null, 10] },
          steps: [
            { range: [0, 1], color: "		#AFEEEE" },
            { range: [1, 2], color: "	#7FFFD4" },
            { range: [2, 3], color: "#40E0D0" },
            { range: [3, 4], color: "#48D1CC" },
            { range: [4, 5], color: "#00CED1" },
            { range: [5, 6], color: "#1E90FF" },
            { range: [6, 7], color: "	#4169E1" },
            { range: [7, 8], color: "		#0000FF" },
            { range: [8, 9], color: "	#0000CD" },
            { range: [9, 10], color: "#00008B" },
          ],
          // threshold: {
          //   line: { color: "red", width: 4 },
          //   thickness: 0.75,
          //   value: 490
          // }
        }
      }
    ];
    
    var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data3, layout);
  
  var matrix1 = []
  data.metadata.forEach(element => {
  if (dataset == element.id){
  // console.log(element.otu_ids)
  matrix1 = element
  } 
  })
  console.log(matrix1)
//     console.log([matrix.id])
  // var table = d3.select('#sample-metadata')
  data4 = Object.keys(matrix1).map(function(k) { return {key:k, value:matrix1[k]} })
  d3.select("table").remove();
  var table = d3.select("#sample-metadata").append("table")
      .attr("style", "margin-left: 0px; border: 0px"),
  thead = table.append("thead"),
  tbody = table.append("tbody");

// append the header row
thead.append("tr")
  .selectAll("th")
  .data(["Key", "Value"])
  .enter()
  .append("th")
      .text(function(d) { console.log(d);return d; });


// create a row for each object in the data
var rows = tbody.selectAll("tr")
  .data(data4)
  .enter()
  .append("tr");
  ///add the key in first td
  rows.append("td")
.text(function(d) { ;return d.key; });
///add the value in second td
  rows
  .append("td")
.append("input")
.attr('readonly', true)
.attr("name", "byName")
.attr("type", "text")
.attr("style", "width : 90px; border: 0px")

.attr("value",function(d) { return d.value; });
  }
  })












































//     // document.getElementById("sample-metadata").innerHTML = "5 + 6";



//     // the table rows, typically loaded from data file using d3.csv
//   //   var movies = [
//   //     { title: "The Godfather", year: 1972, length: 175, budget: 6000000, rating: 9.1 },
//   //     { title: "The Shawshank Redemption", year: 1994, length: 142, budget: 25000000, rating: 9.1 },
//   //     { title: "The Lord of the Rings: The Return of the King", year: 2003, length: 251, budget: 94000000, rating: 9 },
//   //     { title: "The Godfather: Part II", year: 1974, length: 200, budget: 13000000, rating: 8.9 },
//   //     { title: "Shichinin no samurai", year: 1954, length: 206, budget: 500000, rating: 8.9 },
//   //     { title: "Buono, il brutto, il cattivo, Il", year: 1966, length: 180, budget: 1200000, rating: 8.8 },
//   //     { title: "Casablanca", year: 1942, length: 102, budget: 950000, rating: 8.8 },
//   //     { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, length: 208, budget: 93000000, rating: 8.8 },
//   //     { title: "The Lord of the Rings: The Two Towers", year: 2002, length: 223, budget: 94000000, rating: 8.8 },
//   //     { title: "Pulp Fiction", year: 1994, length: 168, budget: 8000000, rating: 8.8 }
//   // ];

//   // // column definitions
//   // var columns = [
//   //     { head: 'Movie title', cl: 'title', html: ƒ('title') },
//   //     { head: 'Year', cl: 'center', html: ƒ('year') },
//   //     { head: 'Length', cl: 'center', html: ƒ('length', length()) },
//   //     { head: 'Budget', cl: 'num', html: ƒ('budget', d3.format('$,')) },
//   //     { head: 'Rating', cl: 'num', html: ƒ('rating', d3.format('.1f')) }
//   // ];

//   var body =  d3.select("#sample-metadata");

//    // create table
//   //  var table = d3.select('#sample-metadata')
//   //  .append('table');
//   //  table.append('thead').append('tr')
//   var matrix = []
//   data.metadata.forEach(element => {
//     if (dataset == element.id){
//     // console.log(element.otu_ids)
//     matrix = element
//     } 
//   })
  
//     console.log([matrix.id])
//   // var matrix = [
//   //   {name: "Lee Gai Fun", age: 42, sex: "M"},
//   //   {name: "Laia Hamidullah", age: 27, sex: "F" },
//   //   {name: "Abraham Mdulla", age: 33, sex: "M" }
//   //  ];
//    var rows = ["age","bbtype", "Ethnicity", "gender", "id","location"]

//    var tr = d3.select("#sample-metadata")
//     .selectAll("tr")
//     .data([matrix])
//     .enter().append("tr");

//    var td = tr.selectAll("td")
//         .data([matrix])
//     .data(function(d, i) { return Object.keys(d); },
//           function(e, i) { return Object.values(e); })
//     .enter().append("td")
//           .text((function(e) { return e; }),(function(d) { return d; }))
//       // .text(function(d) { return d; });

// // // // create table header
// // table.append('thead').append('tr')
// //    .selectAll('th')
// //    .data(columns).enter()
// //    .append('th')
// //    .attr('class', ƒ('cl'))
// //    .text(ƒ('head'));

// // // create table body
// // table.append('tbody')
// //    .selectAll('tr')
// //    .data(data.metadata).enter()
// //    .append('tr')
// //    .selectAll('td')
// //    .data(function(row, i) {
// //        return columns.map(function(c) {
// //            // compute cell values for this specific row
// //            var cell = {};
// //            d3.keys(c).forEach(function(k) {
// //                cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
// //            });
// //            return cell;
// //        });
// //    }).enter()
// //    .append('td')
// //    .html(ƒ('html'))
// //    .attr('class', ƒ('cl'));
















// //   // creates a <table> element and a <tbody> element
// //   var tbl = document.createElement("table");
// //   var tblBody = document.createElement("tbody");

// //   // creating all cells
// //   for (var i = 0; i < 2; i++) {
// //     // creates a table row
// //     var row = document.createElement("tr");

// //     for (var j = 0; j < 2; j++) {
// //       // Create a <td> element and a text node, make the text
// //       // node the contents of the <td>, and put the <td> at
// //       // the end of the table row
// //       var cell = document.createElement("td");
// //       var cellText = document.createTextNode("cell in row "+i+", column "+j);
// //       cell.append(cellText);
// //       row.append(cell);
// //     }

// //     // add the row to the end of the table body
// //     tblBody.append(row);
// //   }

// //   // put the <tbody> in the <table>
// //   tbl.append(tblBody);
// //   // appends <table> into <body>
// //   body.append(tbl);
// //   // sets the border attribute of tbl to 2;
// //   tbl.setAttribute("border", "2");
