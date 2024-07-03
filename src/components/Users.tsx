import React from 'react'
import User from './utils/User'

const Chatlist = () => {
    return (
        <div className="flex flex-col mt-8 max-h-70">
            <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span
                    className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                >4</span
                >
            </div>
            <div className="flex flex-col  mt-4 -mx-2 mb-4 overflow-y-auto">
                <User />
            </div>
        </div>
    )
}

export default Chatlist