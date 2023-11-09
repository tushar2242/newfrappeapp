import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Siderbar from '../../helpers/siderbar';
import { authHeader } from '@/helpers/Header';
import axios from 'axios';
import withAuth from '@/customhook/withAuth';

const NewSupplier = () => {
    const [formData, setFormData] = useState({
        supplierName: '',
        supplierGroup: 'All Supplier Groups',
        supplierType: 'Company',
        country: 'Canada',
        isTransporter: false, // New state variable for the checkbox
    });

    const route = useRouter();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddSupplier = async (e) => {
        e.preventDefault();
        const apiUrl = 'https://tgc67.online/api/resource/Supplier';

        const requestData = {
            data: {
                supplier_name: formData.supplierName,
                supplier_group: formData.supplierGroup,
                supplier_type: formData.supplierType
            }
        };

        try {
           
            const response = await axios.post(apiUrl, requestData, authHeader);

       
            if (response.status === 200) {
                
                alert("New Supplier Added Successfully")
                route.push('/main')
                
            } else {
                alert("Please Try After Some Time")
                console.error('Supplier update failed:', response.data);
   
            }
        } catch (error) {
            console.error('An error occurred:', error);
            
        }
    };


    return (
        <>
            <Siderbar >

            </Siderbar>

            <div>
                <div className="col-lg-6 itemOuter mt-3">
                    <div className="rown" style={{ overflow: 'hidden' }}>
                        <div className="col-md-12 d-flex flex-column align-items-center justify-content-center">
                            <div className="card mb-3" style={{ position: 'relative' }}>
                                <div className="card-body">
                                    <div className="pt pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Add New Supplier</h5>
                                    </div>
                                    <div className='' style={{ position: 'absolute', right: '20px', top: '20px' }} onClick={() => {
                                        route.push('/main')
                                    }}>
                                        <div className="btn btn-primary iconOuter cancelIcon"  >
                                            <i class="fa-solid fa-xmark"></i>
                                        </div>
                                    </div>
                                    <form onSubmit={handleAddSupplier} method="post" className="row g-3 needs-validation">
                                        <div className="col-12">
                                            <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                                            <div className="has-validation">
                                                <input
                                                    type="text"
                                                    name="supplierName"
                                                    className="form-control"
                                                    id="supplierName"
                                                    required
                                                    value={formData.supplierName}
                                                    onChange={handleChange}
                                                />
                                                <div className="invalid-feedback">Please enter the supplier name.</div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="supplierGroup" className="form-label">Supplier Group</label>
                                            <input
                                                type="text"
                                                name="supplierGroup"
                                                className="form-control"
                                                id="supplierGroup"
                                                required
                                                value={formData.supplierGroup}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">Please enter the supplier group.</div>
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label htmlFor="supplierType" className="form-label">Supplier Type</label>
                                            <input
                                                type="text"
                                                name="supplierType"
                                                className="form-control"
                                                id="supplierType"
                                                required
                                                value={formData.supplierType}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">Please enter the supplier type.</div>
                                        </div>
                                        {/* <div className="col-12 mb-4">
                                            <label htmlFor="country" className="form-label">Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                className="form-control"
                                                id="country"
                                                required
                                                value={formData.country}
                                                onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">Please enter the country.</div>
                                        </div> */}
                                        {/* <div className="col-12 mb-4">
                                            <div className="form-check ms-1">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="isTransporter"
                                                    checked={formData.isTransporter}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="isTransporter">
                                                    Is Transporter
                                                </label>
                                            </div>
                                        </div> */}
                                        <div className="w-100">
                                            <button className="btn btn-primary login-btn" type="submit">Add Supplier</button>
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

export default withAuth(NewSupplier);
