import withAuth from '@/customhook/withAuth';
import { authHeader } from '@/helpers/Header';
import Siderbar from '@/helpers/siderbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


const ReceiveAPayment = () => {

    const route = useRouter()

    const [paymentData, setPaymentData] = useState({
        posting_date: '2023-11-10',
        payment_type: 'Receive',
        party_type: 'Customer',
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
                "paid_to": "Cash - TGC",
                "received_amount": paymentData.paid_amount,
                "target_exchange_rate": 1
            }
        }
        try {
            const res = await axios.post('https://tgc67.online/api/resource/Payment%20Entry', recievePay, authHeader)
            // console.log(res.data.data.name)
            alert(`${res.data.data.name} Recieved a Payment`)
        }
        catch (err) {
            console.log(res.data)
            alert("Please Try Again")
        }
    };

    async function fetchCustomerData() {
        try {
            const cusRes = await axios.get('https://tgc67.online/api/resource/Customer', authHeader)
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
                                <h4 className="text-center p-4">Receive a Payment</h4>
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
                                                <option value=''>Select a Customer</option>
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


                                        <div className="w-100">
                                            <button className="btn btn-primary login-btn" type="submit">Receive Payment</button>
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

export default withAuth(ReceiveAPayment);
