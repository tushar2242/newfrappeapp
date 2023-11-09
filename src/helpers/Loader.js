import Image from 'next/image';
import React from 'react';
import loader from '../images/loader.gif'

const Loader = () => {
    return (
        <div className='loader-outer'>

            <div className='loader-img'>
                <Image src={loader} alt='loader' />
            </div>  

        </div>
    );
}

export default Loader;
