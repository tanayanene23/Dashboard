import * as hierarchical from "./hierarchical_data.json";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import './Svg.css'

const data = hierarchical.default;
// console.log("hierefef data", data);

const dataLinks = []

// target = parent
// source = child company

data.forEach(item => {
    const target = item.Parent
    const source = item.Company_Name
    const linkObj = {target, source, strength: 0.7}  
    dataLinks.push(linkObj) 
});

// console.log(dataLinks)



// Company_Name
// Level
// Parent

const ForceDirected = () => {
  const ref = useRef();
  const nodes = data
  const links = dataLinks

  useEffect(() => {
    drawGraph();
  }, []);



  function drawGraph() {
    const margin = {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    };

    const width = window.innerWidth - margin.left - margin.right;
    const height = window.innerHeight;

    // this is the container for the graph
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)


    // simulation
    const simulation = d3
      .forceSimulation()
      .force("charge", d3.forceManyBody().strength(-20))
      .force('center', d3.forceCenter(width / 2, height / 2))



    //   drawing circles and nodes
    function getNodeColor(node) {
        return node.Level === "T0" ? 'red' : node.Level === 'T1' ? 'blue' : 'green'
      }
      const nodeElements = svg
        .append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 10)
        .attr('fill', getNodeColor)
      const textElements = svg
        .append('g')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .text(node => node.Company_Name)
        .attr('font-color', 'white')
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4)


        // update the coordinates of node and circles
        simulation.nodes(nodes).on('tick', () => {
            nodeElements
              .attr('cx', node => node.x)
              .attr('cy', node => node.y)
            textElements
              .attr('x', node => node.x)
              .attr('y', node => node.y)
          })




        //   links
          simulation.force('link', d3.forceLink()
            .id(link => link.id)
            .strength(link => link.strength))

        // line element
            const linkElements = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('stroke-width', 1)
            .attr('stroke', '#E5E5E5')


            linkElements
            .attr('x1', link => link.source.x)
            .attr('y1', link => link.source.y)
            .attr('x2', link => link.target.x)
            .attr('y2', link => link.target.y)


            // simulation.force('link', null).link(links)




  }


  return <svg ref={ref} className="forced-svg" />;
};

export default ForceDirected;
