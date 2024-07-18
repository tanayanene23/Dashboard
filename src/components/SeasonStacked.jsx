import { useEffect, useRef } from "react"
import * as d3 from 'd3'

import "./Svg.css"

// import * as data from './shoppingData.json'
// const shopie = data.default
// console.log("thisissa shoppie",shopie)


                // const seasonGroups = (d3.group(shopie, g => g.season))   

                // const mapToJson = (Object.fromEntries(seasonGroups));
                
                // const seasonArray = []

                // for(const key in mapToJson){
                //     const name = key;
                //     const value = mapToJson[key]
                //     const object = {name, value}
                //     seasonArray.push(object)      
                // }

                // // console.log("seasonArray",seasonArray)

                // const finalSeasonsArray = []

                // for(const key in mapToJson){
                //     // console.log(key, ":", mapToJson[key])   
                //     const name = key;
                //     const value = mapToJson[key]
                //     const valueGroup = (d3.group(value, v => v.category))
                //     // console.log('valuegroup',valueGroup)
                //     const valueJson = (Object.fromEntries(valueGroup));
                //     // console.log("valueJson", valueJson)

                //     const baseObject = {name}

                //     for(const cat in valueJson){
                //         const categori = valueJson[cat]
                //         // console.log(cat,':',categori.length)

                //         const categoryName = cat
                //         const length = categori.length

                //         baseObject[categoryName] = length
                //         // obj.append(object)
                //     }

                //     const sortedObj = Object.keys(baseObject).sort().reduce(
                //         (obj, key) => { 
                //           obj[key] = baseObject[key]; 
                //           return obj;
                //         }, 
                //         {}
                //       );
                //     finalSeasonsArray.push(sortedObj)   
                          
                // }

                // // console.log("final seasons array",finalSeasonsArray)










const SeasonStacked = (props) => {
    const {shopie} = props

    const ref = useRef()    

    const seasonGroups = (d3.group(shopie, g => g.season))   

    const mapToJson = (Object.fromEntries(seasonGroups));
    
    const seasonArray = []

    for(const key in mapToJson){
        const name = key;
        const value = mapToJson[key]
        const object = {name, value}
        seasonArray.push(object)      
    }

    // console.log("seasonArray",seasonArray)

    const finalSeasonsArray = []

    for(const key in mapToJson){
        // console.log(key, ":", mapToJson[key])   
        const name = key;
        const value = mapToJson[key]
        const valueGroup = (d3.group(value, v => v.category))
        // console.log('valuegroup',valueGroup)
        const valueJson = (Object.fromEntries(valueGroup));
        // console.log("valueJson", valueJson)

        const baseObject = {name}

        for(const cat in valueJson){
            const categori = valueJson[cat]
            // console.log(cat,':',categori.length)

            const categoryName = cat
            const length = categori.length

            baseObject[categoryName] = length
            // obj.append(object)
        }

        const sortedObj = Object.keys(baseObject).sort().reduce(
            (obj, key) => { 
              obj[key] = baseObject[key]; 
              return obj;
            }, 
            {}
          );
        finalSeasonsArray.push(sortedObj)   
              
    }

    // console.log("final seasons array",finalSeasonsArray)
    
    const data = finalSeasonsArray


    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 500 - margin.left - margin.right,
    // height = 480 - margin.top - margin.bottom;
    height = 350 - margin.top - margin.bottom;
            


    useEffect(() => {

                          // remove previous svg
                          d3.select(ref.current)
                          .select('svg')
                          .remove()


                          // append the svg object to the body of the page
                          var svg = d3.select(ref.current)
                          .append("svg")
                          .attr("width", width + margin.left + margin.left)
                          .attr("height", height + 200 + 100)
                          .append("g")
                          // .attr("transform","translate(" + margin.left + "," + margin.top + ")");
                          // .attr("transform","translate(" + 60 + "," + margin.top + ")");
                          .attr("transform","translate(" + 70 + "," + 130 + ")");
      
                          // Parse the Data
                          // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv", function(data) {
      
                          // List of subgroups = header of the csv files = soil condition here
                          // var subgroups = data.columns.slice(1)
                          // console.log("these are subgroups", subgroups)
                          const subgroups = ["Accessories", "Clothing", "Footwear", "Outerwear"]
      
                          // List of groups = species here = value of the first column called group -> I show them on the X axis
                          // var groups = d3.map(data, function(d){return(d.name)}).keys()
                          const groups = ["Winter", "Spring", "Summer", "Fall"]
      
                          // Add X axis
                          var x = d3.scaleBand()
                          .domain(groups)
                          .range([0, width])
                          .padding([0.2])
                          svg.append("g")
                          .attr("transform", "translate(0," + height + ")")
                          .call(d3.axisBottom(x).tickSizeOuter(0));
      
                          // Add Y axis
                          var y = d3.scaleLinear()
                          // .domain([0, 1500])
                          .domain([0, 1100])
                          .range([ height, 0 ]);
                          svg.append("g")
                          .call(d3.axisLeft(y));
      
                          // color palette = one color per subgroup
                          var color = d3.scaleOrdinal()
                          .domain(subgroups)
                          .range(['#071952','#088395','#37B7C3', '#77E4C8'])
      
                          //stack the data? --> stack per subgroup
                          var stackedData = d3.stack()
                          .keys(subgroups)(data)
      
                        
      
      
                          // svg.append("text")
                          // .attr("x", (width / 2))             
                          // .attr("y", 2)
                          // .attr("text-anchor", "middle")  
                          // .style("font-size", "16px") 
                          // // .style("text-decoration", "underline")  
                          // .style("fill", "white")
                          // .text("No. of sales per category in different seasons");
      
      
                          
                      // ----------------
                      // Create a tooltip
                      // ----------------
                      const tooltip = d3.select(".tooltips")
                      .append("span")
                      .style("opacity", 0)
                      // .attr("class", "tooltip")
                      .style("background-color", "white")
                      .style("border", "solid")
                      .style("border-width", "1px")
                      .style("border-radius", "5px")
                      .style("padding", "10px")
                      .style("position", "absolute")
                      // .style("z-index", "999")
                
                      
      
      
                    // Three function that change the tooltip when user hover / move / leave a cell
                    const mouseover = function(e, d) {
                      const subgroupName = d3.select(this.parentNode).datum().key;
                      // const index = d3.select(this.parentNode).datum().index
                      // console.log(d3.select(this.parentNode).datum())
                      // console.log("seasonstacked d",d[0])
                      const higherValue = d[1]
                      const lowerValue = d[0]
                      const subgroupValue = higherValue - lowerValue
                      tooltip
                          .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
                          .style("color", "black")
                          .style("opacity", 1)
      
                    }
                    const mousemove = function(event) {
                      tooltip
                            .style("left",(event.pageX)+ 20 + "px")
                            .style("top",(event.pageY)+"px")
                    }
                    const mouseleave = function() {
                      tooltip
                        .style("opacity", 0)
                    }
      
      
      
      
      
      
                          // Show the bars
                          svg.append("g")
                          .selectAll("g")
                          // Enter in the stack data = loop key per key = group per group
                          .data(stackedData)
                          .enter().append("g")
                          .attr("fill", function(d) { return color(d.key); })
                          .selectAll("rect")
                          // enter a second time = loop subgroup per subgroup to add all rectangles
                          .data(function(d) { return d; })
                          .enter().append("rect")
                          .attr("x", function(d) { return x(d.data.name); })
                          .attr("y", function(d) { return y(d[1]);})
                          .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                          .attr("width",x.bandwidth())
                                  //  // for tooltips 
                                   .on("mouseover", mouseover)
                                   .on("mousemove", mousemove)
                                   .on("mouseleave", mouseleave)
                          // })
      
      
      
      
                          // for adding axis labels
      
                          // for x axis
                          svg.append("text")
                          .attr("class", "x label")
                          .attr("text-anchor", "end")
                          .attr("x", width - 170)
                          .attr("y", height + 45)
                          .style("fill", "white")
                          .text("Seasons");
      
      
                          // for y axis
                          svg.append("text")
                          .attr("class", "y label")
                          .attr("text-anchor", "end")
                          .attr("y", -50)
                          .attr("dy", "0")
                          .attr("dx", "-80")
                          .attr("transform", "rotate(-90)")
                          .style("fill", "white")
                          .text("No. of products sold");
      
      
      
                          // adding a title to the graph
      
                          svg.append("text")
                          .attr("x", (width / 18))             
                          .attr("y", -110)
                          // .attr("text-anchor", "middle")  
                          .style("font-size", "16px") 
                          // .style("text-decoration", "underline")  
                          .style("fill", "white")
                          .text("No. of sales per category in different seasons");
      
                          
      
      
      
      
      
      
                          // for adding legends
                          svg.append("circle").attr("cx",310).attr("cy",-20).attr("r", 8).style("fill", "#071952")
                          svg.append("circle").attr("cx",310).attr("cy",-40).attr("r", 8).style("fill", "#088395")
                          svg.append("circle").attr("cx",310).attr("cy",-60).attr("r", 8).style("fill", "#37B7C3")
                          svg.append("circle").attr("cx",310).attr("cy",-80).attr("r", 8).style("fill", "#77E4C8")
                  
                          svg.append("text").attr("x", 330).attr("y", -18).text("Accessories").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "gray")
                          svg.append("text").attr("x", 330).attr("y", -38).text("Clothing").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "gray")
                          svg.append("text").attr("x", 330).attr("y", -58).text("Footwear").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "gray")
                          svg.append("text").attr("x", 330).attr("y", -78).text("Outerwear").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "gray")

    }, [data, height, width, margin.top, margin.left])
   

    
    



  return (
    <div>
        <div className="tooltips" />

        <svg ref={ref} width={500} height={520} className="seasons-svg"/>
    </div>

  )
}



export default SeasonStacked

