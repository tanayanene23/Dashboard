import { useEffect, useRef } from "react"
import * as d3 from 'd3'
import "./Svg.css"

// import * as data from './shoppingData.json'
// const shopie = data.default
// console.log("thisissa shoppie",shopie)


        // const genderGroups = (d3.group(shopie, g => g.gender))  
                  // const paymentGroup = (d3.group(shopie, p => p.paymentMethod))
                  // console.log(paymentGroup)


        // console.log(genderGroups)
        // console.log("got male from location groups",(genderGroups.get("Male")).length)    

        // locationGroups.forEach((locgrp) => {
        //     console.log("location groups for loop", locgrp.length)
        // })


                  // const mapToJson = (Object.fromEntries(paymentGroup));
        
        // console.log("map to json", mapToJson)

                    // const genderArray = []

                    // for(const key in mapToJson){
                    //     // console.log(key, ":", mapToJson[key].length)   
                    //     const name = key;
                    //     const length = mapToJson[key].length
                    //     const object = {name, length}
                    //     genderArray.push(object)                               
                    // }

        // console.log("genderArray",genderArray)



const PaymentMethodPie = (props) => {
  const {shopie} = props
  const shopieLength = shopie.length
  console.log(shopieLength)

    const ref = useRef()

    const paymentGroup = (d3.group(shopie, p => p.paymentMethod))
    // console.log(paymentGroup)

    const mapToJson = (Object.fromEntries(paymentGroup));

    const genderArray = []

    for(const key in mapToJson){
        // console.log(key, ":", mapToJson[key].length)   
        const name = key;
        const length = mapToJson[key].length
        const object = {name, length}
        genderArray.push(object)                               
    }

    console.log(genderArray)



    const data = genderArray
    const outerRadius = 200
    const innerRadius = 0

    const margin = {
        top: 50, right: 50, bottom: 50, left: 50
    }

    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;


    const groupKeys = []
    data.forEach((key) => {
      groupKeys.push(key.name)
    })
    // console.log(groupKeys)


  
    const colorScale = d3     
    .scaleOrdinal()
    .domain(groupKeys)
    // .range(["#9CDBA6", "#088395", "#37b7c3", "#77e4c8", "#468585", "#50B498"]);
    .range(["#df7970", "#4c9ca0", "#ae7d99", "#c9d45c", "#6d78ad", "#51cda0"]);
    // .scaleSequential()      
    // .interpolator(d3.interpolateCool)      
    // .domain([0, data.length]);


    useEffect(() => {

              // Remove the old svg
              d3.select(ref.current)  //or d3.select("#pie-container")
              .select('svg')
              .remove();
        
            // Create new svg
            const svg = d3
              .select(ref.current)  //or d3.select("#pie-container")
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .append('g')
              .attr('transform', `translate(${width / 2}, ${height / 1.9})`);
        
            const arcGenerator = d3
              .arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius);
        
            const pieGenerator = d3
              .pie()
              .padAngle(0)
              .value((d) => d.length);
        
            const arc = svg
              .selectAll()
              .data(pieGenerator(data))
              .enter();
    
    
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
                  const mouseover = function(event, d) {
                    // console.log("this is d", d)
                    const subgroupName = d.data.name
                    const subgroupValue = d.data.length
                    const percentage = (subgroupValue / shopieLength) * 100
                    const percent = percentage.toFixed(2)
                    tooltip
                        .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue + "<br>" + "Percentage: " + percent)
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
    
    
        
              
            // Append arcs
            arc
              .append('path')
              .attr('d', arcGenerator)
              .style('fill', (_, i) => colorScale(i))
              .style('stroke', '#fffff')
              .style('stroke-width', 0)
              // for tooltips
              .on("mouseover", mouseover)
              .on("mousemove", mousemove)
              .on("mouseleave", mouseleave)
    
        
    
                  
            // Append text labels
            arc
              .append('text')
              .attr('text-anchor', 'middle')
              .attr('alignment-baseline', 'middle')
              // .text((d) => d.data.name)
              .text((d) => ((d.data.length / shopieLength) * 100).toFixed(2) + "%")
              .style("font-weight", "700")
              // .style('fill', (_, i) => colorScale(data.length - i))
              .attr('transform', (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x - 8}, ${y})`;
              });
    
    
              
        //   add a title to the graph
    
            svg.append("text")
            .attr("x", 0)             
            .attr("y", -230)
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            // .style("text-decoration", "underline")  
            .style("fill", "white")
            .text("Gender wise sales distribution");



    }, [data, colorScale, height, width, shopieLength])


    return (<div>
        <svg ref={ref} height={520} width={500}/>
        {/* <div  id="pie-container"/> */}
    </div>
    )

}


export default PaymentMethodPie