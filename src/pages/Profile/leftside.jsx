import React from 'react'

function leftside({ profileData }) {
  return (
    <div>
      {/* Profile Card */}
      <div className="bg-white p-3 border-t-4 border-green-400 rounded-lg">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src={profileData.profileImage}
                  alt={`${profileData.CompanyName}`}
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{profileData.CompanyName}</h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">{profileData.details[0]?.title}</h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className={`bg-${profileData.status === 'Active' ? 'green' : 'red'}-500 py-1 px-2 rounded text-white text-sm`}>
                      {profileData.status}
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member Since</span>
                  <span className="ml-auto">{profileData.memberSince}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>Birthday</span>
                  <span className="ml-auto">{profileData.birthday}</span>
                </li>
              </ul>
            </div>
            {/* End of Profile Card */}

            {/* About Card */}
            <div className="my-4 "></div>
            <div className="bg-white p-3 border-t-4 border-green-400 rounded-lg ">
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">About</h1>
              <p className="text-gray-600 text-base">{profileData.currentAddress} - {profileData.permanentAddress}</p>
              <p className="text-gray-600 text-base">{profileData.email}</p>
            </div>
    </div>
  )
}

export default leftside
