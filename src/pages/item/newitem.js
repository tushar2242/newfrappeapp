import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Siderbar from '../../helpers/siderbar';
import axios from 'axios';
import withAuth from '@/customhook/withAuth';

const NewItem = () => {
    const [formData, setFormData] = useState({
        username: '',
        itemName: '',
        unitOfMeasure: 'Unit',
        itemGroup: 'Products',
        rememberMe: false, // New state variable for the checkbox
    });

    const route = useRouter();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddItem = async (e) => {
        e.preventDefault()

        // User is authenticated, proceed to add the item
        const apiUrl = 'https://tgc67.online/api/resource/Item';

        const requestData = {
            data: {
                item_name: formData.itemName, // Use formData for item_name
                item_group: formData.itemGroup, // Use formData for item_group
                stock_uom: formData.unitOfMeasure, // Use formData for stock_uom
                is_stock_item: formData.rememberMe ? '1' : '0', // Use formData for is_stock_item
            },
        };

        try {
            const response = await axios.post(apiUrl, requestData, {
                headers: {
                    'Authorization': 'token adbb1c103b6991c:d3f13587a64bc25'
                }
            })

            if (response.statusText === 'OK') {
                alert("Item Added Successfully")
                route.push('/main')
            }
            // console.log('API Response:', response.statusText)
        } catch (error) {
            // Handle any errors that occur during the request
            alert("Please Try Again")
            console.error('API Error:', error);
        }

    };





    return (
        <>
            <Siderbar />
            <div>
                {/* <h2>Items</h2> */}
                <div className="col-lg-6 itemOuter mt-3">
                    <h4 className="text-center"></h4>
                    <div className="rown" style={{ overflow: 'hidden' }}>
                        <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div className="card mb-3" style={{ position: 'relative' }}>
                                <div className="card-body">
                                    <div className="pt pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Add New Item </h5>
                                    </div>
                                    <div className='' style={{ position: 'absolute', right: '20px', top: '20px' }} onClick={() => {
                                        route.push('/main')
                                    }}>
                                        <div className="btn btn-primary iconOuter cancelIcon"  >
                                            <i class="fa-solid fa-xmark"></i>
                                        </div>
                                    </div>
                                    <form onSubmit={handleAddItem} method="post" className="row g-3 needs-validation">
                                        <div className="col-12">
                                            <label htmlFor="itemName" className="form-label">Item name</label>
                                            <div className="has-validation">
                                                <input
                                                    type="text"
                                                    name="itemName"
                                                    className="form-control"
                                                    id="itemName"
                                                    required
                                                    value={formData.itemName}
                                                    onChange={handleChange}
                                                />
                                                <div className="invalid-feedback">Please enter your item Name.</div>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label htmlFor="itemGroup" className="form-label">Item Group</label>
                                            <input
                                                type="text"
                                                name="itemGroup"
                                                className="form-control"
                                                id="itemGroup"
                                                required
                                                value={formData.itemGroup}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">Please enter the item group.</div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label htmlFor="unitOfMeasure" className="form-label">Default Unit of Measure</label>
                                            <input
                                                type="text"
                                                name="unitOfMeasure"
                                                className="form-control"
                                                id="unitOfMeasure"
                                                required
                                                value={formData.unitOfMeasure}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">Please enter the unit of measure.</div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label htmlFor="unitOfMeasure" className="form-label">Valuation Rate</label>
                                            <input
                                                type="number"
                                                name="unitOfMeasure"
                                                className="form-control"
                                                id="unitOfMeasure"
                                                required
                                                value={formData.unitOfMeasure}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">Please enter the unit of measure.</div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label htmlFor="unitOfMeasure" className="form-label">Standard Selling Rate</label>
                                            <input
                                                type="number"
                                                name="unitOfMeasure"
                                                className="form-control"
                                                id="unitOfMeasure"
                                                required
                                                value={formData.unitOfMeasure}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">Please enter the unit of measure.</div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <div className="form-check ms-1">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="rememberMe"
                                                    checked={formData.rememberMe}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="rememberMe">
                                                    Maintain Stock
                                                </label>
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <button className="btn btn-primary login-btn" type="submit">Add New Item</button>
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

export default withAuth(NewItem);
