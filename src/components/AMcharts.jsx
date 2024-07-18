import { useLayoutEffect, useState } from "react"
import * as am5 from "@amcharts/amcharts5"
// import * as am5xy from "@amcharts/amcharts5/xy"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

import "./Svg.css"
import './Filters.css'


import * as hierarchy from './hierarchical_data.json'

const hierarchicalData = hierarchy.default
// console.log(hierarchicalData)


const levelOne = [];

hierarchicalData.forEach((data) => {

    if(data.Level === 'T1'){

        const childArray = hierarchicalData.filter((elem) => elem.Parent === data.Company_Name)
        // console.log('childarry amcharts', childArray, "data", data)

        const obj = {
            ...data,
            value: 100,
            children: childArray
        }

        levelOne.push(obj)
    }
})




// hierarchicalData.forEach((data) => {
//     levelOne.forEach((object) => {
//         if(data.Parent === object.Company_Name){
//             const childObj = {
//                 ...data, 
//                 value: 20
//             }

//             object.children.push(childObj)
//         }
//     })
// })


// console.log("edited levelOne data", levelOne)


const parentElement = [{
    Company_Name : 'root',
    value: 0,
    children: [{
        Company_Name: "Alight Solutions LLC",
        Level: "T0",
        children: levelOne
    }]
}]

// console.log("parentElement",parentElement)


// const data = [{
//     name: "Root",
//     value: 0,
//     children: [{
//         name: "A0",
//         children: [{
//         name: "A0A1",
//         children: [{
//             name: "A0A0A2",
//             value: 71
//         }, {
//             name: "A0A0B2",
//             children: [{
//             name: "A0A0B1A3",
//             value: 69
//             }, {
//             name: "A0A0B1B3",
//             value: 85
//             }]
//         }, {
//             name: "A0A0C2",
//             value: 48
//         }]
//         }, {
//         name: "A0B1",
//         value: 27
//         }, {
//         name: "A0C1",
//         children: [{
//             name: "A0C2A2",
//             value: 2
//         }, {
//             name: "A0C2B2",
//             children: [{
//             name: "A0C2B1A3",
//             value: 54
//             }, {
//             name: "A0C2B1B3",
//             value: 16
//             }]
//         }]
//         }, {
//         name: "A0D1",
//         value: 89
//         }]
//     }, {
//         name: "B0",
//         children: [{
//         name: "B1A1",
//         value: 9
//         }, {
//         name: "B1B1",
//         children: [{
//             name: "B1B1A2",
//             children: [{
//             name: "B1B1A0A3",
//             value: 35
//             }, {
//             name: "B1B1A0B3",
//             value: 40
//             }]
//         }, {
//             name: "B1B1B2",
//             value: 55
//         }]
//         }]
//     }, {
//         name: "C0",
//         children: [{
//         name: "C2A1",
//         children: [{
//             name: "C2A0A2",
//             value: 24
//         }, {
//             name: "C2A0B2",
//             value: 89
//         }, {
//             name: "C2A0C2",
//             children: [{
//             name: "C2A0C2A3",
//             children: [{
//                 name: "C2A0C2A0A4",
//                 children: [{
//                 name: "C2A0C2A0A00",
//                 value: 90
//                 }, {
//                 name: "C2A0C2A0A01",
//                 value: 70
//                 }, {
//                 name: "C2A0C2A0A02",
//                 value: 66
//                 }, {
//                 name: "C2A0C2A0A03",
//                 value: 58
//                 }]
//             }, {
//                 name: "C2A0C2A0B4",
//                 children: [{
//                 name: "C2A0C2A0B10",
//                 value: 80
//                 }, {
//                 name: "C2A0C2A0B11",
//                 value: 40
//                 }]
//             }]
//             }, {
//             name: "C2A0C2B3",
//             value: 44
//             }]
//         }, {
//             name: "C2A0D2",
//             children: [{
//             name: "C2A0D3A3",
//             value: 28
//             }, {
//             name: "C2A0D3B3",
//             value: 14
//             }]
//         }]
//         }, {
//         name: "C2B1",
//         value: 400
//         }, {
//         name: "C2C1",
//         children: [{
//             name: "C2C2A2",
//             children: [{
//             name: "C2C2A0A3",
//             value: 28
//             }, {
//             name: "C2C2A0B3",
//             children: [{
//                 name: "C2C2A0B1A4",
//                 value: 19
//             }, {
//                 name: "C2C2A0B1B4",
//                 children: [{
//                 name: "C2C2A0B1B10",
//                 value: 11
//                 }, {
//                 name: "C2C2A0B1B11",
//                 value: 10
//                 }, {
//                 name: "C2C2A0B1B12",
//                 value: 97
//                 }, {
//                 name: "C2C2A0B1B13",
//                 value: 47
//                 }]
//             }, {
//                 name: "C2C2A0B1C4",
//                 children: [{
//                 name: "C2C2A0B1C20",
//                 value: 40
//                 }, {
//                 name: "C2C2A0B1C21",
//                 value: 37
//                 }, {
//                 name: "C2C2A0B1C22",
//                 value: 53
//                 }]
//             }]
//             }, {
//             name: "C2C2A0C3",
//             value: 96
//             }]
//         }, {
//             name: "C2C2B2",
//             value: 66
//         }]
//         }]
//     }]
//     }]

const levels = ["T0", "T1", "T2"]


const AMcharts = () => {

    const [downDepth, setDownDepth] = useState(1)
    const [initialDepth, setInitialDepth] = useState(2)
    const [topDepth, setTopdepth] = useState(1)
    const [level, setLevel] = useState("T2")
    // const [upDepth, setUpDepth] = useState(1)



    const levelFiltering = (e) => {
        const level = e.target.value
        if(level === "T0"){
            setDownDepth(0)
            setInitialDepth(0)
            setTopdepth(1)
            setLevel("T0")
        }
        else if(level === "T1"){
            setDownDepth(0)
            setInitialDepth(1)
            setTopdepth(1)
            setLevel("T1")            
        }
        else if(level === "T2"){
            setDownDepth(1)
            setInitialDepth(2)
            setTopdepth(1)
            setLevel("T2")
        }
    }

    console.log(topDepth, initialDepth, downDepth)

    useLayoutEffect(() => {



            // Create root and chart
            var root = am5.Root.new("chartdiv");
            root._logo.dispose();

            root.setThemes([
            am5themes_Animated.new(root)
            ]);

            var container = root.container.children.push(
            am5.Container.new(root, {
                width: am5.percent(100),
                height: am5.percent(100),
                layout: root.verticalLayout,
            })
            );

            var series = container.children.push(
            am5hierarchy.ForceDirected.new(root, {
                downDepth: downDepth,
                initialDepth: initialDepth,
                topDepth: topDepth,
                // upDepth: upDepth,
                valueField: "value",
                categoryField: "Company_Name",
                childDataField: "children",
                minRadius: 20,
                // maxRadius: am5.percent(15)
            })
            );

        
            level === "T1" ? series.nodes.template.setAll({
                toggleKey: "none",
                cursorOverStyle: "default"
              }) : ""


            series.get("colors").set("colors", [
                am5.color("#def9c4")
                // am5.color(0x095256),
                // am5.color(0x087f8c),
                // am5.color(0x5aaa95),
                // am5.color(0x86a873),
                // am5.color(0xbb9f06)
              ]);


              series.circles.template.adapters.add("fill", function() {
                return am5.color(0x5aaa95);
              });
              
              series.outerCircles.template.adapters.add("stroke", function() {
                return am5.color("#def9c4");
              });



            series.data.setAll(parentElement);


            series.set("selectedDataItem", series.dataItems[0]);


            return () => root.dispose();
     
      }, [downDepth, topDepth, initialDepth, level]);


    
      return (
        <div className="forceDirected">
            <h1 style={{marginLeft: "1em"}}>Hierarchical Data Visualization</h1>
            <div id="chartdiv" style={{width:"75em", height:'50em'}} />
            <div className="levels">
            <select name="level" id="levelSelector" onChange={levelFiltering}>
                <option value="selectLevel" selected={true} disabled hidden>Select a level</option>
                {
                    levels.map((level) => {
                        return(
                            <option className="levelOptions" value={level} key={level}>{level}</option>
                        )
                    })
                }
            </select>
            </div>
        </div>
      );



}

export default AMcharts