
import './components/Svg.css'
import LocationsBar from './components/LocationsBar'
import PaymentMethodPie from './components/PaymentMethodPie'
import SeasonStacked from './components/SeasonStacked'
// import ForceDirected from './components/ForceDirected'

// import CollapsibleTree from './components/CollapsibleTree'

import AMcharts from './components/AMcharts'

import Filters from './components/Filters'


import * as data from './components/shoppingData.json'
import { useState } from 'react'


let shopie1 = data.default

function App() {

  const [shopie, setShopie] = useState(shopie1)

  const filtering = (e) => {
    const type = e.target.name
    const selection = e.target.value
    const newShopie = shopie1.filter((sales) => {
        return sales[`${type}`] == selection
    })
    console.log("type and seletion", type, selection)
    console.log("newShopie",newShopie)
    setShopie(newShopie)
  }
  // filtering("gender", "Male")

  const intervalFiltering =(e) => {
    const type = e.target.name
    const values = JSON.parse(e.target.value)
    // console.log(values)
    const newShopie = shopie1.filter((sales) => {
        return sales[`${type}`] >= values.lower && sales[`${type}`] <= values.upper
    })
    console.log("type and value", type, values)
    console.log("newShopie",newShopie)
    setShopie(newShopie)
  }



  // const filtering = (type, selection) => {
  //   console.log(type)
  //   const newShopie = shopie1.filter((sales) => {
  //       return sales[`${type}`] == selection
  //   })
  //   console.log("type and seletion", type, selection)
  //   console.log("newShopie",newShopie)
  //   setShopie(newShopie)
  // }

  // const intervalFiltering =(type, selection) => {
  //   const newShopie = shopie1.filter((sales) => {
  //       return sales[`${type}`] >= selection.lower && sales[`${type}`] <= selection.upper
  //   })
  //   console.log("type and value", type, selection)
  //   console.log("newShopie",newShopie)
  //   setShopie(newShopie)
  // }




  console.log("shopie",shopie)

  return (
      <div className='svgs'>

        <Filters filtering={filtering} intervalFiltering={intervalFiltering}/>

        <LocationsBar shopie={shopie}/>

        <div className='charts'>
        <PaymentMethodPie shopie={shopie}/>
        <SeasonStacked shopie={shopie}/>
        </div>

        <AMcharts />
        {/* <CollapsibleTree /> */}
        

         {/* <ForceDirected /> */}

      </div>
  )
}

export default App
