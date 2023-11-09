import withAuth from '@/customhook/withAuth';
import { authHeader } from '@/helpers/Header';
import Siderbar from '@/helpers/siderbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


const MakeAPayment = () => {

    const route = useRouter()

    const [paymentData, setPaymentData] = useState({
        posting_date: '2023-11-10',
        payment_type: 'Pay',
        party_type: 'Supplier',
        party: '',
        paid_amount: 0,
        paymentMethod: '',
        paymentDate: new Date().toISOString().substr(0, 10),
    });

    const [cusList, setCusList] = useState([])

    const handlePaymentDataChange = (e) => {
        const { name, value, type } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: type === 'number' ? parseFloat(value) : value,
        });
    };

    const handleParty = (e) => {
        const { name, value } = e.target;
        setPaymentData({
            ...paymentData,
            party: value,
        });
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        // Handle the payment submission logic here
        let recievePay = {
            "data": {
                "posting_date": paymentData.paymentDate,
                "payment_type": paymentData.payment_type,
                "party_type": paymentData.party_type,
                "party": paymentData.party,
                "paid_amount": paymentData.paid_amount,
                "mode_of_payment": "Cash",
                "paid_from": "Cash - TGC",
                "received_amount": paymentData.paid_amount,
                "target_exchange_rate": 1
            }
        }
        try {
            const res = await axios.post('https://tgc67.online/api/resource/Payment%20Entry', recievePay, authHeader)
            // console.log(res.data.data.name)
            alert(`${res.data.data.name} Make a Payment`)
        }
        catch (err) {
            console.log(res.data)
            alert("Please Try Again")
        }
    };

    async function fetchCustomerData() {
        try {
            const cusRes = await axios.get('https://tgc67.online/api/resource/Supplier', authHeader)
            setCusList(cusRes.data.data)
            // console.log(cusRes.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCustomerData()
    }, [])

    return (
        <>
            <Siderbar />
            <div>
                <div className="col-lg-12 itemOuter mt-3">

                    <div className="rown">
                        <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div className="card mb-3" style={{ position: 'relative' }}>
                                <h4 className="text-center p-4">Make a Payment</h4>
                                <div className='' style={{ position: 'absolute', right: '20px', top: '20px' }} onClick={() => {
                                    route.push('/main')
                                }}>
                                    <div className="btn btn-primary iconOuter cancelIcon"  >
                                        <i className="fa-solid fa-xmark"></i>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handlePaymentSubmit} method="post" className="row g-3 needs-validation">
                                        <div className="col-12">
                                            <label htmlFor="posting_date" className="form-label">Posting Date</label>
                                            <div className="has-validation">
                                                <input
                                                    type="date"
                                                    name="posting_date"
                                                    className="form-control"
                                                    id="posting_date"
                                                    required
                                                    value={paymentData.posting_date}
                                                    onChange={handlePaymentDataChange}
                                                />
                                                <div className="invalid-feedback">Please select the posting date.</div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="paymentMethod" className="form-label">Payment Type</label>
                                            {/* <select
                                                name="paymentMethod"
                                                className="form-select"
                                                id="paymentMethod"
                                                required
                                                value={paymentData.paymentMethod}
                                                onChange={handlePaymentDataChange}
                                            >
                                                <option value="">Select a payment method</option>
                                                <option value="Credit Card">Recieve</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Bank Transfer">Bank Transfer</option>
                                            </select> */}
                                            <input
                                                type="text"
                                                name="payment_type"
                                                className="form-control"
                                                id="payment_type"
                                                required
                                                value={paymentData.payment_type}
                                                onChange={handlePaymentDataChange}
                                            />
                                        </div>

                                        <div className="col-12 ">
                                            <label htmlFor="party_type" className="form-label">Party Type</label>
                                            <input
                                                type="text"
                                                name="party_type"
                                                className="form-control"
                                                id="party_type"
                                                value={paymentData.party_type}
                                                onChange={handlePaymentDataChange}

                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="party" className="form-label">Party</label>
                                            <select
                                                className="form-select"
                                                value={paymentData.party}
                                                onChange={handleParty}
                                                required
                                            >
                                                <option value=''>Select a Supplier</option>
                                                {
                                                    cusList.length > 0 && cusList.map((customer) => (
                                                        <option value={customer.name}>{customer.name}</option>
                                                    ))
                                                }


                                            </select>
                                        </div>

                                        <div className="col-12 ">
                                            <label htmlFor="paid_amount" className="form-label">Paid Amount</label>
                                            <input
                                                type="number"
                                                name="paid_amount"
                                                className="form-control"
                                                id="paid_amount"
                                                required
                                                value={paymentData.paid_amount}
                                                onChange={handlePaymentDataChange}
                                            />
                                        </div>
                                        <br/>
                                        <br/>
                                        <DataTable
                                            head={[
                                                "Name",
                                                "Grand Total (CAD)",
                                                "Outstanding (CAD).",
                                                "Allocated(CAD)",
                                               
                                            ]}
                                            title='Customer'
                                            // itemList={customerData.items}
                                            // addNewItem={addNewItem}
                                            // removeList={removeList}
                                            // handleItemChange={handleItemChange}
                                        />

                                        <div className="w-100">
                                            <button className="btn btn-primary login-btn" type="submit">Make Payment</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withAuth(MakeAPayment);



const DataTable = ({ head }) => {

    return (
        <>

            <div className="container-7 mt-4" style={{ margin: 'auto' }}>

                <div className="row row--top-10">
                    <div className="col-md-12">
                        <div className="table-container">
                            <table className="table">
                                <thead className="table__thead">
                                    <tr>
                                        {
                                            head.map((item, index) => {
                                                return (
                                                    <th className="table__th" key={index}>{item}</th>
                                                )
                                            })
                                        }

                                        <th className="table__th"></th>
                                    </tr>
                                </thead>
                                {/* <tbody className="table__tbody">
                                    {
                                        itemList.map((item, index) => {
                                            return (
                                                <>
                                                    <TableDataList key={index}
                                                        // item={item}
                                                        // removeList={removeList}
                                                        // handleItemChange={handleItemChange}
                                                    />
                                                </>
                                            )
                                        })
                                    }



                                </tbody> */}
                            </table>
                        </div>
                        <div style={{ width: '38%' }}>
                            <button className="btn btn-primary new-row login-btn" type="button" style={{width:'165px'}} >Get Outstanding Amount</button>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </>
    );
};




// const TableDataList = ({/* item, removeList, handleItemChange */}) => {

    


//     async function fetchItemList() {
//         try {
//             const listRes = await axios.get('https://tgc67.online/api/method/item_list', authHeader);
//             setItemOptionList(listRes.data.message);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     useEffect(() => {
//         fetchItemList();
//     }, []);

//     return (
//         <tr className="table-row table-row--chris">
//             <td data-column="Policy" className="table-row__td" style={{ maxWidth: '200px', width: '40%' }}>
//                 <div className="table-row-input">
//                     <select
//                         value={item.itemName}
//                         onChange={handleItemNameChange}
//                         className="form-select"
//                     >
//                         <option value="">Select Any Item</option>
//                         {itemOptionList.length > 0 && itemOptionList.map((item) => (
//                             <option value={item.item_code} key={item.item_code}>
//                                 {item.item_name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </td>
//             <td data-column="rate" className="table-row__td" style={{ maxWidth: '200px', width: '10%' }}>
//                 <div className="table-row-input" style={{ maxWidth: '200px' }}>
//                     <input
//                         type="number"
//                         value={item.availableQuantity}
//                         readOnly
//                         placeholder="quant"
//                     />
//                 </div>
//             </td>
//             <td data-column="availableQuantity" className="table-row__td" style={{ maxWidth: '200px', width: '10%' }}>
//                 <div className="table-row-input" style={{ maxWidth: '200px' }}>
//                     <input
//                         type="number"
//                         value={item.quantity}
//                         onChange={handleQuantityChange}
//                         placeholder="Available Quantity"
//                     />
//                 </div>
//             </td>
//             <td data-column="amount" className="table-row__td" style={{ maxWidth: '200px', width: '15%' }}>
//                 <div className="table-row-input" style={{ maxWidth: '200px' }}>
//                     <input
//                         type="number"
//                         value={item.rate}
//                         onChange={handleRateChange}
//                         placeholder="Amount"
//                     />
//                 </div>
//             </td>
//             <td className="table-row__td">
//                 <div className="table-row__info" style={{ paddingLeft: '0px' }}>
//                     <p className="table-row__name">{item.rate * item.quantity}</p>
//                 </div>
//             </td>
//             <td className="table-row__td">
//                 <div className="table-row__info" style={{ paddingLeft: '0px' }}>
//                     <p className="table-row__name" >
//                         <i className="fa-solid fa-trash-can" 
//                         // onClick={() => removeList(item.uid)}
//                         ></i>
//                     </p>
//                 </div>
//             </td>
//         </tr>
//     );
// };
