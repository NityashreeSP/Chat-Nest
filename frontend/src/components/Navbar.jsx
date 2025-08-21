import React from 'react'
import useAuthUser from "../hooks/useAuthUser";
import { useLocation } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../lib/api';
import { Link } from 'react-router-dom';
import { BellIcon, LogOutIcon,ShipWheelIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector.jsx';
import { CameraIcon } from "@heroicons/react/24/outline";


const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    
const {mutate: logoutMutation} = useMutation({
    mutationFn: logout,
    onSuccess: () => QueryClient.invalidateQueries({queryKey : ['authUser']}),
})

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end w-full">
                {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  Chat Nest
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
         </div>
         <ThemeSelector/>


         <div className="avatar">
            <div className="w-9 rounded-full bg-base-300 flex items-center justify-center overflow-hidden">
              {authUser?.profilePic ? (
                <img
                  src={authUser?.profilePic}
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <CameraIcon className="w-6 h-6 rounded-full bg-base-300 flex items-center justify-center overflow-hidden" />
              )}
            </div>
          </div>
           {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>

            </div>
        </div>

    </nav>
  )
}

export default Navbar;
