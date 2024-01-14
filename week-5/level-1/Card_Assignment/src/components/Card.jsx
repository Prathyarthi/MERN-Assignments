import React from 'react';
function Card({ name, description, interests }) {
    return (
        <div className='flex h-screen w-screen justify-center items-center'>
            <div className='flex flex-col border-solid border-2 border-gray-400 rounded-2xl h-80 w-80 justify-center items-center p-4'>
                <h1 className='text-xl font-bold mb-2'>{name}</h1>
                <h4 className='text-sm font-semibold mb-4'>{description}</h4>
                <div className='mb-4 text-center' >
                    <h1 className='text-lg font-bold'>Interests</h1>
                    <h4 className='text-sm font-semibold'>{interests[0]}</h4>
                    <h4 className='text-sm font-semibold'>{interests[1]}</h4>
                    <h4 className='text-sm font-semibold'>{interests[2]}</h4>
                </div>
                <div className='flex space-x-4'>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded focus:outline-none'>
                        Connect
                    </button>
                    <button className='bg-red-500 text-white px-4 py-2 rounded focus:outline-none'>
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
