import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { editUser } from './UserSlice';

const EditUser = ({selectedUser,setEditState}) => {

  const [formValues, setFormValues] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    department: '',
    salary: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(()=>{
    if (selectedUser)
    {
      setFormValues({
        userId : selectedUser.userId,
        userName: selectedUser.userName ,
        email: selectedUser.email,
        mobileNumber: selectedUser.mobileNumber,
        department: selectedUser.department,
        salary: selectedUser.salary
      })
    }
  },[])

  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId',formValues.userId);
        formData.append('userName',formValues.userName);
        formData.append('email',formValues.email);
        formData.append('mobileNumber',formValues.mobileNumber);
        formData.append('department', formValues.department);
        formData.append('salary',formValues.salary)

       dispatch(editUser(formData))
      .unwrap()
      .then(() => {
        toast.success('User updated successfully!');
        setEditState(false);
      })
      .catch((error) => {
        toast.error(error || 'Failed to update user');
      });
  }


  return (
   <div className="text-orange-800 mt-8 w-full">
      <h1 className="text-center">Edit</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-[50%] p-10 mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formValues.userName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="number"
            id="mobileNumber"
            name="mobileNumber"
            value={formValues.mobileNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formValues.department}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formValues.salary}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>



        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="text-2xl bg-cyan-400 rounded-lg p-2 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Submitting...' : 'OK'}
          </button>
          <button className='text-xl p-2 bg-blue-200' onClick={()=>setEditState(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditUser