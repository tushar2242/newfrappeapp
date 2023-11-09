import React, { useEffect } from 'react';
import ListDesign from '../../helpers/ListDesign';
import DataTable from '@/helpers/DataTable';
import Siderbar from '../../helpers/siderbar';
import axios from 'axios';
import withAuth from '@/customhook/withAuth';

const ItemList = ({ tableData }) => {

  return (
    <div>
      <Siderbar />
      <DataTable
        head={[
          "Item Code",
          "Item Name",
          "Last Sale Price",
          "Supplier Price",
          "Available Stock",
          "New Invoice"
        ]}
        title='Items'
        tableData={tableData}

      />
    </div>
  );
}

export default withAuth(ItemList);


export const getServerSideProps = async () => {

  try {
    // Make an API request to fetch data
    const response = await axios.get('https://tgc67.online/api/method/item_list');

    // Assuming your API returns an array of data, you can extract it like this
    const tableData = response.data.message;

    return {
      props: {
        tableData,
      },
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      props: {
        tableData: [], // Return an empty array or an appropriate default value in case of an error
      },
    };
  }
};