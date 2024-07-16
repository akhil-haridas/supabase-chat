import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Typing: React.FC<any> =  ({ user }) => {
    return (
        <div className="col-start-1 col-end-8 p-6 rounded-lg">
            <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    <img
                        src={user?.picture}
                        alt="A"
                        className="h-full w-full rounded-full"
                    />

                </div>
                <div className="relative ml-3 text-sm bg-transparent py-2 px-4 rounded-xl">
                    <div className="absolute text-xs -top-1 left-0 min-w-500 font-bold mr-2 text-gray-500">
                        {user?.name}
                    </div>
                    <FontAwesomeIcon icon={faEllipsis} fade size="3x" />
                </div>
            </div>
        </div>
    )
}

export default Typing