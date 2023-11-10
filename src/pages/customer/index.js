import React, { useEffect, useState } from 'react';
import ListDesign from '../../helpers/ListDesign';
// import './customerList.module.css';
import Siderbar from '../../helpers/siderbar';
import withAuth from '@/customhook/withAuth';
import axios from 'axios';
import { authHeader } from '@/helpers/Header';

// const tableData = [
//     {
//         item_code: "003",
//         item_name: "Peanut Butter",
//         supplier_price: 950.0,
//         last_sale_price: 1050.0,
//         actual_qty: 251.0,
//     },
//     // Add more items if needed
// ];

const ItemList = () => {

    const [tableData, setTableData] = useState([])
    async function fetchCsList() {
        try {
            const res = await axios.get('https://tgc67.online/api/resource/Customer', authHeader)
            setTableData(res.data.data)
            console.log(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCsList()
    }, [])

    return (
        <div>
            <Siderbar />
            <DataTable
                head={[
                    "Supplier Name",
                    "Supplier Group",
                    "Status",
                    "ID",
                    "Actions"
                ]}
                title='Customer'
                newIocn={false}
                tableData={tableData}
            />
        </div>
    );
}

export default withAuth(ItemList);


const DataTable = ({ tableData }) => {
    return (
        <>
            <div className="container">
                <div className="row row--top-40">
                    <div className="col-md-12"></div>
                </div>
                <div className="row row--top-20">
                    <div className="col-md-12">
                        <div className="table-container">
                            <h6 className="row__title p-3">
                                Team Members <span className="span-user-clr">100 users</span>
                            </h6>

                            <table className="">
                                <thead className="table__thead">
                                    <tr className="tbl-head-bgvw">
                                        {/* <th className="table__th">
                        <input
                          id="selectAll"
                          type="checkbox"
                          className="table__select-row"
                        />
                      </th> */}
                                        <th className="table__th">Customer Name</th>
                                        <th className="table__th">
                                            Outstanding Amount <i className="bi bi-arrow-down"></i>
                                        </th>
                                        <th className="table__th">Create Button</th>
                                        <th className="table__th">Edit Button</th>
                                        {/* <th className="table__th">Teams</th> */}
                                        <th className="table__th"></th>
                                        <th className="table__th"></th>
                                    </tr>
                                </thead>
                                <tbody className="table__tbody">
                                    {
                                        tableData.length > 0 && tableData.map((list) => {
                                            return (
                                                <TableDataList name={list.name} />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const TableDataList = (props) => {
    return (
        <>
            <tr className="table-row table-row--chris">
                {/* <td className="table-row__td">
                        <input
                          id=""
                          type="checkbox"
                          className="table__select-row"
                        />
                      </td> */}
                <td className="table-row__td">
                    <div className="table-row__img"></div>
                    <div className="table-row__info">
                        <p className="table-row__name">{props.name}</p>
                        <span className="table-row__small">CFO</span>
                    </div>
                </td>
                <td data-column="Status" className="table-row__td">
                    {/* <p className="table-row__status status--green status team-bg-clr">
                          Active
                        </p> */}
                    <p className="table-row__status">
                        <i className="bi bi-currency-rupee"></i> 399
                    </p>
                </td>
                <td data-column="Policy" className="table-row__td">
                    <div className="">
                        {/* <p className="table-row__policy">$5,000</p> */}
                        {/* <p className="table-row__policy">Product Designer</p> */}
                        <i className="fa-solid fa-square-plus"

                        ></i>
                    </div>
                </td>
                <td data-column="Policy status" className="table-row__td">
                    {/* <p className="table-row__policy">
                         olivia@gmail.com
                        </p> */}
                    <svg
                        version="1.1"
                        className="table-row__edit"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512.001 512.001"
                        xmlSpace="preserve"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Edit"
                    >
                        <g>
                            {" "}
                            <g>
                                {" "}
                                <path
                                    d="M496.063,62.299l-46.396-46.4c-21.2-21.199-55.69-21.198-76.888,0l-18.16,18.161l123.284,123.294l18.16-18.161    C517.311,117.944,517.314,83.55,496.063,62.299z"
                                    style={{ fill: "rgb(158, 171, 180)" }}
                                ></path>{" "}
                            </g>
                        </g>
                        <g>
                            {" "}
                            <g>
                                <path
                                    d="M22.012,376.747L0.251,494.268c-0.899,4.857,0.649,9.846,4.142,13.339c3.497,3.497,8.487,5.042,13.338,4.143    l117.512-21.763L22.012,376.747z"
                                    style={{ fill: "rgb(158, 171, 180)" }}
                                ></path>{" "}
                            </g>
                        </g>
                        <g>
                            {" "}
                            <g>
                                {" "}
                                <polygon
                                    points="333.407,55.274 38.198,350.506 161.482,473.799 456.691,178.568   "
                                    style={{ fill: "rgb(158, 171, 180)" }}
                                ></polygon>{" "}
                            </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                    </svg>
                </td>
            </tr>
        </>
    );
};

const Pagination = () => {
    return (
        <>
            <div className="pgn-vw-box mt-3 p-2">
                <div className="pre-btnvw d-flex">
                    <i className="bi bi-arrow-left fs-5 mt-1"></i>
                    <p className="mt-2 ms-1">Previous</p>
                </div>

                <div className="pagination">
                    <p>1</p>
                    <p className="ms-2">2</p>
                    <p className="ms-2">3</p>
                    <p className="ms-2">4</p>
                    <p className="ms-2">5</p>
                </div>
                {/* <p className="pre-btnvw">Next <i className="bi bi-arrow-right fs-5"></i></p> */}
                <div className="pre-btnvw d-flex">
                    <p className="mt-2">Next</p>
                    <i className="bi bi-arrow-right fs-5 ms-1 mt-1"></i>
                </div>
            </div>
        </>
    );
};
