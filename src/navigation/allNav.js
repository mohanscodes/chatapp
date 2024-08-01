import { BiGridAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BiChat } from "react-icons/bi";
import { BiIdCard } from "react-icons/bi";

export const allNav = [

    {
        id: 1,
        title: 'Dashboard',
        icon: <BiGridAlt />,
        role: 'user',
        path: '/user/dashboard'
    },
    {
        id: 2,
        title: 'Profile',
        icon: <BiIdCard />,
        role: 'user',
        path: '/user/dashboard/profile'
    },
    {
        id: 3,
        title: 'All-members',
        icon: <CgProfile />,
        role: 'user',
        path: '/user/dashboard/allmembers'
    },
    {
        id: 4,
        title: 'Chat-Friends',
        icon: <BiChat />,
        role: 'user',
        path: '/user/dashboard/chat-friends'
    },

]