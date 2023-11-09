import React, { useEffect, useState } from "react";
import Siderbar, { ContextMenu } from "../helpers/siderbar";
import axios from "axios";
import withAuth from "@/customhook/withAuth";
const apiUrl = 'https://tgc67.online/api/method/number_card';

const Main = () => {
   
    const [cardData,setCardData] = useState([])

    async function fetchData(){
        try{
            const res = await axios.get(apiUrl)
            setCardData(res.data.message)
            // console.log(res.data.message)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <>
            <Siderbar />
            <div className="card-container">

                {cardData.length>0&&cardData.map((item, index) => (
                    <ItemCard
                        key={index}
                        name={item.name}
                        amount={item.money}
                        url="/main"
                    // span={item.span}
                    // color={item.color}
                    />
                ))}

            </div >
            <ContextMenu />
        </>
    )
}

export default withAuth(Main);




const ItemCard = ({ name, amount, url, color, span }) => {
    return (
        <>
            <div className="product-card">

                <div className="product-text">
                    <h6>{name}</h6>
                    <span>{span}</span>
                    <p style={{ color: color ,fontSize: "22px" }}>$ {amount}</p>


                </div>

            </div>
        </>
    )
}

// export async function getServerSideProps() {
//     try {
       
//         const response = await axios.get(apiUrl);
//         const data = response.message;
//         // console.log(data)
//         return {
//             props: {
//                 data,
//             },
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return {
//             props: {
//                 data: [],
//             },
//         };
//     }
// }