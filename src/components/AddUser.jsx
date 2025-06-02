import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './UserSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddUser = () => {
  const [formValues, setFormValues] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    department: '',
    salary: '',
    password: ''
  });

  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const usernameRegex = /^[A-Za-z ]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const departmentRegex = /^(?!\s*$).+/;
  const salaryRegex = /^\d+(\.\d{1,2})?$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usernameRegex.test(formValues.userName)) {
      setFormError('Username must not contain numbers or special characters');
      return;
    }

    if (!emailRegex.test(formValues.email)) {
      setFormError('Invalid email format');
      return;
    }

    if (!mobileRegex.test(formValues.mobileNumber)) {
      setFormError('Mobile number must be exactly 10 digits');
      return;
    }

    if (!departmentRegex.test(formValues.department)) {
      setFormError('Department is mandatory');
      return;
    }

    if (!salaryRegex.test(formValues.salary)) {
      setFormError('Invalid salary format');
      return;
    }

    if (!passwordRegex.test(formValues.password)) {
      setFormError(
        'Password must be at least 8 characters, include uppercase, lowercase, digit, and special character'
      );
      return;
    }

    setFormError('');

    try {
      await dispatch(addUser(formValues)).unwrap();

      toast.success('User saved Successfully!!');
      
      setFormValues({
        userName: '',
        email: '',
        mobileNumber: '',
        department: '',
        salary: '',
        password: ''
      });
    } catch (err) {
      // Already handled by Redux
      toast.error(error);
    }
  };

  return (
    <div className="text-orange-800 mt-8">
      <h1 className="text-center">Sign Up</h1>
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

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {formError && <p className="text-red-500 text-sm text-center mb-4">{formError}</p>}
        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="text-2xl bg-cyan-400 rounded-lg p-2 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Submitting...' : 'Sign Up'}
          </button>
          <Link className='text-xl p-2 rounded-lg bg-blue-400' to='/allUsers'>Total Users</Link>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
