import React from 'react';
import ListDesign from '../../helpers/ListDesign';
import DataTable from '@/helpers/DataTable';
import Siderbar from '../../helpers/siderbar';
import withAuth from '@/customhook/withAuth';


const tableData = [
    {
      item_code: "003",
      item_name: "Peanut Butter",
      supplier_price: 950.0,
      last_sale_price: 1050.0,
      actual_qty: 251.0,
    },
    // Add more items if needed
  ];


const ItemList = () => {
    return (
        <div>
            <Siderbar/>
              <DataTable
                head={[
                    "Supplier Name",
                    "Supplier Group",
                    "Status",
                    "ID",
                    "Actions"
                ]}
                title='Supplier List'
                newIocn={false}
                tableData={tableData}
            />
        </div>
    );
}

export default withAuth(ItemList) ;
