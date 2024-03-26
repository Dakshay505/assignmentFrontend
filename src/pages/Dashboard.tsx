import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudentIdAsync, getAllUserAsync } from "../redux/slices/studentSlice";
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state:any)=>state.student.users.data);

  useEffect(()=>{
    dispatch(getAllUserAsync());
  },[dispatch])

  const [rollNumber, setRollNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createStudentIdAsync({rollNumber})).then((res: any) => {
      if (res.payload.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
     
      dispatch(getAllUserAsync());
      setRollNumber("");
    });

  };

  console.log(tableData);
  return (
    <div>
       <div className="p-4 max-w-md">
       <h2 className="text-lg font-semibold mb-4">Create New Student ID</h2>
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div>
          <label htmlFor="rollNumber" className="sr-only">
            Roll Number
          </label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter Roll Number"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create
        </button>
      </form>
    </div>
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Name</th>
                  <th scope="col" className="px-6 py-4">RollNumber</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                  <th scope="col" className="px-6 py-4">Phone</th>
                  <th scope="col" className="px-6 py-4">Uploaded Date</th>
                  <th scope="col" className="px-6 py-4">CV</th>
                </tr>
              </thead>
              <tbody>
                {tableData && tableData.map((user:any,idx:any) => (
                  <tr key={user._id}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{idx+1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user?.rollNumber || "N/A"}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user?.email || "N/A"}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user?.contactNumber || "N/A"}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user?.uploadedDate || "N/A"}</td>
                    <td className="whitespace-nowrap px-6 py-4">{user?.fileUrl ? <a href={user.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Download PDF
                  </a> : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;