import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUserDataAsync } from '../redux/slices/authSlice';
import { updateStudentInfoAsync } from '../redux/slices/studentSlice';
import Loader from '../common/Loader';

interface formDoc {
    name: string;
    email: string;
    contactNumber: string;
    password : string;
    file?: File | undefined ,
    [key: string]: string | File | undefined;
}

const UserForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user.loggedInUserData?.user);
  const [formData, setFormData] = useState<formDoc>({
    name: user?.name || '',
    email: user?.email || '',
    contactNumber: user?.contactNumber || '',
    password : "",
    file: undefined,
  });
  const loaderStatus = useSelector((state:any) => state.student.status);

  useEffect(() => {
    dispatch(getLoggedInUserDataAsync());
  }, [dispatch]);

  const handleInputChange = (e:any) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const newFormData = new FormData();
    for (const key in formData) {
      const value = formData[key as keyof formDoc]; // Use type assertion here.
      if (key === 'file') {
        if (value instanceof File) {
          newFormData.append(key, value);
        }
      } else {
        // Assuming all other values can safely be converted to strings.
        // Check for undefined to avoid appending unwanted fields.
        if (value !== undefined) {
          newFormData.append(key, String(value));
        }
      }
    }
    newFormData.append('_id', user?._id);

    // Dispatch your action here. Ensure your redux action and middleware correctly handle FormData.
    dispatch(updateStudentInfoAsync(newFormData));
  };

  return (<>
    {loaderStatus === "loading" ? <Loader/> : 
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="space-y-6 bg-white p-6 rounded shadow-lg" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            // required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            // required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            
          />
        </div>
        <div>
          <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium text-gray-900">Contact Number</label>
          <input
            type="number"
            name="contactNumber"
            id="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            // required
          />
        </div>
        <div>
          <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900">Upload PDF</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleInputChange}
            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            accept="application/pdf"
            // required
          />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Submit
        </button>
      </form>
    </div>
      }
    </>
  );
};

export default UserForm;
