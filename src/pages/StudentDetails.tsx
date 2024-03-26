import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUserDataAsync } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

// Example user data
// const userData = {
//   name: 'John Doe',
//   email: 'johndoe@example.com',
//   contactNumber: '123-456-7890',
//   pdfFileUrl: 'https://example.com/path/to/user-cv.pdf', // URL to the PDF file
// };
 
const UserDetailPage = () => {
  const navigate= useNavigate();
  const handleUpdateInfoClick = () => {
    navigate('/updateStudent'); // Navigate to the /updateStudent route when the button is clicked
  };
    const dispatch = useDispatch()
    const userData = useSelector((state: any) => state.user.loggedInUserData.user);
    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
    },[dispatch])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <div className="mb-4">
          <h3 className="font-bold">Name</h3>
          <p>{userData?.name || ""}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Email</h3>
          <p>{userData?.email || ""}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Contact Number</h3>
          <p>{userData?.contactNumber || ""}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">CV</h3>
          <a href={userData.pdfFileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Download PDF
          </a>
        </div>
        <div className="mb-4">
      <button
        onClick={handleUpdateInfoClick}
        className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
      >
        Update info
      </button>
    </div>

      </div>
    </div>
  );
};

export default UserDetailPage;
