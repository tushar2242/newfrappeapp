import withAuth from '@/customhook/withAuth';
import Siderbar from '@/helpers/siderbar';
import React from 'react';

const Index = () => {
    return (
        <div>
            <Siderbar />
            <h1>Sales Dashboard</h1>
        </div>
    );
}

export default withAuth(Index);
