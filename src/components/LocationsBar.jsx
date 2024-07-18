import "./Svg.css"


import { useEffect, useRef } from "react"
import * as d3 from 'd3'

// import * as mockData from './mockData.json'
// import * as data from './shoppingData.json'

// let shopie = data.default
// console.log("shoppie",shopie)

// const mock = mockData.default
// console.log("this is mockData", mock[0])


// const filtering = (type, selection) => {
//     const newShopie = shopie.filter((sales) => {
//         return sales[`${type}`] == selection
//     })
//     // console.log("newShopie",newShopie)
//     shopie = newShopie
// }
// // filtering("gender", "Male")


// const shopie = []
// const male = shopie.filter((sale) => {
//     return sale.gender == "Male"
// })


// const female = shopie.filter((sale) => {
//     return sale.gender == "Female"
// })

// // age groups 
// const ageGroups = (d3.group(shopie, a => a.age))
// // console.log(ageGroups)

// const agejson = (Object.fromEntries(ageGroups));
// // console.log(Object.keys(agejson).sort())


// // price range 
// const prices = (d3.group(shopie, a => a.purchaseAmount))
// // console.log("prices",prices)

// const pricejson = (Object.fromEntries(prices));
// // console.log(Object.keys(pricejson))


// reveiw rating 
// const rating = (d3.group(shopie, a => a.reviewRating))
// console.log("rates",rating)

// const ratejson = (Object.fromEntries(rating));
// console.log(Object.keys(ratejson).sort())

// console.log(locationGroups)
// console.log("got kentucky from location groups",(locationGroups.get("Kentucky")).length)    

// locationGroups.forEach((locgrp) => {
//     console.log("location groups for loop", locgrp.length)
// })

            // const locationGroups = (d3.group(shopie, loc => loc.location))   

            // const mapToJson = (Object.fromEntries(locationGroups));

            // // console.log("map to json", mapToJson)

            // const locationsArray = []

            // for(const key in mapToJson){
            //     // console.log(key, ":", mapToJson[key].length)   
            //     const name = key;
            //     const length = mapToJson[key].length
            //     const object = {name, length}
            //     locationsArray.push(object)                               
            // }

            // locationsArray.sort((a,b) => b.length - a.length)

            // const newLocArray = locationsArray.slice(0, 10)





const LocationsBar = (props) => {
    const {shopie} = props
    console.log("this is shopie from props",shopie)

    const ref = useRef()

    const locationGroups = (d3.group(shopie, loc => loc.location))   

    const mapToJson = (Object.fromEntries(locationGroups));

    // console.log("map to json", mapToJson)

    const locationsArray = []

    for(const key in mapToJson){
        // console.log(key, ":", mapToJson[key].length)   
        const name = key;
        const length = mapToJson[key].length
        const object = {name, length}
        locationsArray.push(object)                               
    }

    locationsArray.sort((a,b) => b.length - a.length)

    const newLocArray = locationsArray.slice(0, 10)
    console.log(newLocArray)


    useEffect(() => {
        // const svg = d3.select(ref.current)

        // const g = d3.selectAll('g')
        // console.log("g",g)
        // g.remove()

        d3.select(ref.current) 
        .select('svg')
        .remove();

        // set the dimensions and margins of the graph  
        const margin = {top: 50, right: 30, bottom: 70, left: 60},
        width = 1150 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3.select(ref.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


        // Parse the Data
        // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then( function(data) {
        
        // console.log("barchart data", data)

        // X axis
        const x = d3.scaleBand()
        .range([0, width ])
        .domain(newLocArray.map(d => d.name))
        // .padding(0.5);
        svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        // .attr("transform", "translate(-10,0)rotate(-40)")
        // .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));







        
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
                const subgroupName = d.name
                const subgroupValue = d.length
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




        // Bars
        svg.selectAll("mybar")
        .data(newLocArray)
        .join("rect")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.length))
        // .attr("width", x.bandwidth())
        .attr("width", 50)
        .attr("height", d => height - y(d.length))
        .attr("fill", "#88D66C")
        .attr("transform", `translate(${margin.left - 30}, 0)`)
         // for tooltips 
         .on("mouseover", mouseover)
         .on("mousemove", mousemove)
         .on("mouseleave", mouseleave)




        // for adding axis labels

        // for x axis
        svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width - 500)
        .attr("y", height + 60)
        .style("fill", "white")
        .text("Locations")


        // for y axis
        svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -40)
        .attr("dy", "0em")
        .attr("dx", "-60")
        .attr("transform", "rotate(-90)")
        .style("fill", "white")
        .text("No. of products sold");

        // })



        //   add a title to the graph

        svg.append("text")
        .attr("x", width/2)             
        .attr("y", -25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("fill", "white")
        // .style("text-decoration", "underline")  
        .text("Location wise sales distribution (Top 10 locations)")


    }, [newLocArray])

    return(
    <div>
        <div className="tooltips" />
        <svg ref={ref} width={1130} height={420}/>
    </div>
        
    )
}


export default LocationsBar