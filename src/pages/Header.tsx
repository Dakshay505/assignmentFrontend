
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUserDataAsync } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state:any) => state.user.loggedInUserData);
    useEffect(() => {
        dispatch(getLoggedInUserDataAsync());
    },[dispatch])
  
  const logoutHandler = async (e:any) => {
   
    e.preventDefault();
    try {
      await axios.get(`http://localhost:5050/api/v1/auth/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success("Logout Successfully");
      navigate("/login");
     
    } catch (error:any) {
      
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
 
  return (
    <nav className="bg-customColor3 flex items-center justify-between p-4 w-full">
  <div>
    <h2 className="text-customColor2 uppercase font-normal">Assignment</h2>
  </div>
  <article className="flex items-center text-center">
    <Link to={"/"} className="styledText myButton">Home</Link>
    {/* <Link to={"/profile"} className="styledText myButton ml-4">Profile</Link> */}
    {(user && user?.user) ? (
      <Link to={"/logout"} onClick={logoutHandler} className="styledText myButton ml-4">Logout</Link>
    ) : (
      <Link to={"/login"} className="styledText myButton ml-4">Login</Link>
    )}
  </article>
</nav>

  );
};

export default Header;
