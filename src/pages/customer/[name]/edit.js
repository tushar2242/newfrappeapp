// pages/[slug]/edit.js

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Siderbar from '@/helpers/siderbar'; // Ensure the correct import path
import axios from 'axios';
import withAuth from '@/customhook/withAuth';

const EditCustomer = () => {
    const router = useRouter();
    const { name } = router.query; // Access the dynamic parameter "slug"

    const [customerData, setCustomerData] = useState({
        customerName: '',
        customerGroup: '',
        customerType: '',
        territory: '',
    });

    useEffect(() => {
        // Fetch the customer data based on the slug
        if (name) {
            // Replace 'fetch_customer_by_slug_url' with the actual API endpoint to fetch customer data by slug
            axios.get(`fetch_customer_by_slug_url/${name}`)
                .then((response) => {
                    if (response.status === 200) {
                        const customer = response.data; // Assuming the API response contains customer data
                        setCustomerData({
                            customerName: customer.customer_name,
                            customerGroup: customer.customer_group,
                            customerType: customer.customer_type,
                            territory: customer.territory,
                        });
                    }
                })
                .catch((error) => {
                    console.error('API Error:', error);
                });
        }
    }, [name]);

    const handleCustomerDataChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({
            ...customerData,
            [name]: value,
        });
    };

    const handleUpdateCustomer = async (e) => {
        e.preventDefault();

        // Update the customer data based on the slug
        if (name) {
            // Replace 'update_customer_url' with the actual API endpoint to update customer data
            const apiUrl = `update_customer_url/${name}`;

            const requestData = {
                data: {
                    customer_name: customerData.customerName,
                    customer_type: customerData.customerType,
                    customer_group: customerData.customerGroup,
                    territory: customerData.territory,
                },
            };

            try {
                const response = await axios.put(apiUrl, requestData, {
                    headers: {
                        'Authorization': 'token adbb1c103b6991c:d3f13587a64bc25',
                    },
                });

                if (response.status === 200) {
                    alert("Customer Updated Successfully");
                    router.push('/main');
                }
            } catch (error) {
                // Handle any errors that occur during the request
                alert("Please Try Again");
                console.error('API Error:', error);
            }
        }
    };

    return (
        <>
            <Siderbar />
            <div>
                <div className="col-lg-6 itemOuter mt-3">
                    <h4 className="text-center"></h4>
                    <div className="rown" style={{ overflow: 'hidden' }}>
                        <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div className="card mb-3" style={{ position: "relative" }}>
                                <div className="card-body">
                                    <div className="pt pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4"> Update Customer </h5>
                                    </div>
                                    <div className='' style={{ position: 'absolute', right: '20px', top: '20px' }} onClick={() => {
                                        route.push('/main')
                                    }}>
                                        <div className="btn btn-primary iconOuter cancelIcon"  >
                                            <i class="fa-solid fa-xmark"></i>
                                        </div>
                                    </div>

                                    <form onSubmit={handleUpdateCustomer    } method="post" className="row g-3 needs-validation">
                                        <div className="col-12">
                                            <label htmlFor="customerName" className="form-label">Customer Name</label>
                                            <div className="has-validation">
                                                <input
                                                    type="text"
                                                    name="customerName"
                                                    className="form-control"
                                                    id="customerName"
                                                    required
                                                    value={customerData.customerName}
                                                    onChange={handleCustomerDataChange}
                                                />
                                                <div className="invalid-feedback">Please enter the customer name.</div>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label htmlFor="customerGroup" className="form-label">Customer Group</label>
                                            <input
                                                type="text"
                                                name="customerGroup"
                                                className="form-control"
                                                id="customerGroup"
                                                required
                                                value={customerData.customerGroup}
                                                onChange={handleCustomerDataChange}
                                            />
                                            <div className="invalid-feedback">Please enter the customer group.</div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label htmlFor="customerType" className="form-label">Customer Type</label>
                                            <input
                                                type="text"
                                                name="customerType"
                                                className="form-control"
                                                id="customerType"
                                                required
                                                value={customerData.customerType}
                                                onChange={handleCustomerDataChange}
                                            />
                                            <div className="invalid-feedback">Please enter the customer type.</div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label htmlFor="territory" className="form-label">Territory</label>
                                            <input
                                                type="text"
                                                name="territory"
                                                className="form-control"
                                                id="territory"
                                                required
                                                value={customerData.territory}
                                                onChange={handleCustomerDataChange}
                                            />
                                            <div className="invalid-feedback">Please enter the default price.</div>
                                        </div>
                                        <div className="w-100">
                                            <button className="btn btn-primary login-btn" type="submit">Update New Customer</button>
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
};

export default withAuth(EditCustomer);
