// import { useState } from "react"
import "./Filters.css"

const gender = ["Male", "Female"]


const age = [
    {
        upper: 30,
        lower: 18,
    }, 
    {
        upper: 50,
        lower: 31,
    },
    {
        upper: 70,
        lower: 51,
    }
]

const purchaseAmount = [
    {
        upper: 40,
        lower: 20
    },
    {
        upper: 60,
        lower: 41
    },
    {
        upper: 80,
        lower: 61
    },
    {
        upper: 100,
        lower: 81
    },
]



const Filters = (props) => {
    const {filtering, intervalFiltering} = props


    // const [isOpenGender, setIsOpenGender] = useState(false)
    // const [isOpenAge, setIsOpenAge] = useState(false)
    // const [isOpenPrice, setIsOpenPrice] = useState(false)

    // const openGender = () => {
    //     setIsOpenGender(!isOpenGender)
    //     setIsOpenAge(false)
    //     setIsOpenPrice(false)
    // }

    // const openAge = () => {
    //     setIsOpenGender(false)
    //     setIsOpenAge(!isOpenAge)
    //     setIsOpenPrice(false)
    // }

    // const openPrice = () => {
    //     setIsOpenGender(false)
    //     setIsOpenAge(false)
    //     setIsOpenPrice(!isOpenPrice)
    // }



    // const [genderDropdown, setGenderDropdown] = useState("Select Gender")
    // const [ageDropdown, setAgeDropDown] = useState("Select Age Group")
    // const [priceDropdown, setPriceDropdown] = useState("Select Price Range")



    // const closeGender = (gender) => {
    //     setIsOpenGender(false)
    //     filtering("gender", gender)
    //     setGenderDropdown(gender)
    // }

    // const closeAge = (age) => {
    //     setIsOpenAge(false)
    //     intervalFiltering("age", age)
    //     const ageGroup = `${age.lower}-${age.upper}`
    //     setAgeDropDown(ageGroup)
    // }

    // const closePrice = (purchaseAmount) => {
    //     intervalFiltering("purchaseAmount", purchaseAmount)
    //     setIsOpenPrice(false)
    //     const priceGroup = `${purchaseAmount.lower}-${purchaseAmount.upper}`
    //     setPriceDropdown(priceGroup)
    // }




  return (
    <div>
        <h1>Sales Dashboard</h1>
        
        <div className="filters">
            <p style={{fontWeight: "700"}}>FILTERS</p>

            <div className="options">
                    <div className="filtering">
                        <p>Gender</p>
                        <select name="gender" id="gender" onChange={(e) => filtering(e)}>
                            <option selected={true} disabled="disabled" hidden>Select Gender</option>
                            {
                                gender.map((genders) => {
                                    return(
                                        <option key={genders} value={genders}>{genders}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="filtering">
                        <p>Age group</p>
                        <select name="age" id="ageGroup" onChange={(e) => intervalFiltering(e)}>
                            <option selected={true} disabled="disabled" hidden>Select age group</option>
                            {
                                age.map((ageGrp) => {
                                    return(
                                        <option key={ageGrp} value={JSON.stringify(ageGrp)}>{ageGrp.lower}-{ageGrp.upper}</option>
                                    )
                                })
                            }
                        </select>
                    </div>


                    <div className="filtering">
                        <p>Price range</p>
                        <select name="purchaseAmount" id="priceRange" onChange={(e) => intervalFiltering(e)}>
                            <option selected={true} disabled="disabled" hidden>Select price range</option>
                            {
                                purchaseAmount.map((amount) => {
                                    return(
                                        <option key={amount} value={JSON.stringify(amount)}>{amount.lower}-{amount.upper}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
            </div>





                    {/* <div className="filters-2">
                    
                    
                    <div className="dropdowns">
                        <p>Gender</p>                        
                        <button onClick={openGender}>{genderDropdown}</button>

                        {
                            isOpenGender && (
                                <div className="dropdown genderFilter">
                                    {
                                        gender.map((genders) => {
                                            return(
                                                <p key={genders} onClick={() => {closeGender(genders)}}>{genders}</p>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>



                    <div className="dropdowns">
                        <p>Age group</p>             
                        <button onClick={openAge}>{ageDropdown}</button>

                        {
                            isOpenAge && (
                                <div className="dropdown ageFilter">
                                    {
                                        age.map((ageGrp) => {
                                            return(
                                                <p key={ageGrp.lower} onClick={() => {closeAge(ageGrp)}}>{ageGrp.lower} - {ageGrp.upper}</p>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>



                    <div className="dropdowns">
                        <p>Price</p>    
                        <button onClick={openPrice}>{priceDropdown}</button>

                        {
                            isOpenPrice && (
                                <div className="dropdown priceFilter">
                                    {
                                        purchaseAmount.map((price) => {
                                            return(
                                                <p key={price.lower} onClick={() => {closePrice(price)}}>{price.lower} - {price.upper}</p>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>

                    </div> */}

            
        </div>

    </div>
  )
}

export default Filters