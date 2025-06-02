import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchAllUsers } from './UserSlice';
import { toast } from 'react-toastify';
import EditUser from './EditUser';

const TotalUsersList = () => {

const[editState, setEditState] = useState(false);
const[selectedUser, setSelectedUser] = useState(null);

const dispatch = useDispatch();

useEffect(()=>{
    dispatch(fetchAllUsers());
},[])

const allUsers = useSelector((state)=>state.user.users);

console.log(allUsers);


const handleDeleteUser = (userId)=>{
    if (window.confirm('Are you sure to delete this User?'))
    {
        dispatch(deleteUser(userId)).unwrap()
        .then(()=>toast.success('User Deleted Successfully!!'))
        .catch(err=>toast.error(err));
    }
}

  return (
    <>
      <div className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">User Name</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Mobile</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Department</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Salary</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {
                  allUsers.length === 0?(
                      <tr>
                          <td colSpan='6' className='text-xl text-center'>No Users Found</td>
                      </tr>
                  ):(
                      allUsers.map((eachUser)=>(
                          <tr key={eachUser.userId} className='text-sm font-medium hover:bg-gray-50 '>
                              <td className='text-gray-700 px-6 py-4'>{eachUser.userId}</td>
                              <td className='text-gray-700 px-6 py-4'>{eachUser.userName}</td>
                              <td className='text-gray-700 px-6 py-4'>{eachUser.email}</td>
                              <td className='text-gray-700 px-6 py-4'>{eachUser.mobileNumber}</td>
                              <td className='text-gray-700 px-6 py-4'>{eachUser.department}</td>
                              <td className='text-gray-700 px-6 py-4'>{eachUser.salary}</td>
                              <td className='flex gap-2 px-6 py-4'>
                                  <button className='bg-blue-400 p-2 text-white rounded-lg' onClick={()=>{
                                    setEditState(true);
                                    setSelectedUser(eachUser);
                                  }}>
                                    Edit
                                  </button>
                                  <button className='bg-red-400 p-2 text-white rounded-lg' onClick={()=>handleDeleteUser(eachUser.userId)}>Delete</button>
                              </td>
                          </tr>
                      ))
                  )
              }
            </tbody>
          </table>
        </div>
      </div>


      {editState && selectedUser &&(
        <div className='fixed top-10 right-[800px]  w-[800px]'>
          <div className='relative w-full h-[800px]'>
            <button className='absolute top-2 right-60' onClick={()=>setEditState(false)}>
                X
            </button>
            <EditUser selectedUser={selectedUser} setEditState={setEditState}/>
          </div>
        </div>
      )}

              
    </>
  )
}

export default TotalUsersList