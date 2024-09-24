import { useState } from "react";
import { FaCog, FaInbox, FaLifeRing, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: <FaUserCircle />,
    route: "/user/profile", 
  },
  {
    label: "Edit Profile",
    icon: <FaCog />,
    route: "/user/editprofile",
  },
  {
    label: "Inbox",
    icon: <FaInbox />,
  },
  {
    label: "Help",
    icon: <FaLifeRing />,
  },
  {
    label: "Sign Out",
    icon: <FaSignOutAlt />,
  },
];

function ProfileMenu({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  const handleMenuItemClick = (label, route) => {
    if (label === "Sign Out") {
      onLogout();
    } else if (route) {
      navigate(route);
    }
    closeMenu();
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsMenuOpen((prev) => !prev)} 
        className="flex items-center gap-1 rounded-full py-1 px-2 bg-transparent border border-gray-500"
      >
        <img
          src={userData?.avatar?.secure_url}
          alt="Profile"
          className="h-10 w-10 rounded-full border border-gray-900"
        />
      </button>
      
      {isMenuOpen && (
        <ul className="absolute right-0 w-52 cursor-pointer mt-2 bg-white border border-gray-300 rounded shadow-lg">
          {profileMenuItems.map(({ label, icon, route }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <li 
                key={label}
                onClick={() => handleMenuItemClick(label, route)} // Handle click
                className={`flex items-center gap-2 p-2 rounded ${isLastItem ? "hover:bg-red-500/10" : "hover:bg-gray-200"}`}
              >
                <span className={`text-lg ${isLastItem ? "text-red-500" : "text-black"}`}>
                  {icon}
                </span>
                <span className={`font-normal ${isLastItem ? "text-red-500" : "text-black"}`}>
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;
