import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);

    
    return (
        <>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]">
                    <img
                        src={userData?.avatar?.secure_url}
                        className="w-40 m-auto rounded-full border border-black"
                    />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2">
                        <p>Email: </p><p>{userData?.email}</p>
                        <p>Role: </p><p>{userData?.role}</p>
                        <p>Job Title: </p><p>{userData?.jobTitle}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Link 
                            to="/changepassword" 
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                                <button>Change password</button>

                        </Link>
                        <Link 
                            to="/user/editprofile" 
                            className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                                <button>Edit profile</button>

                        </Link>
                    </div>
                    
                </div>
            </div>
        </>
    );

}

export default Profile;