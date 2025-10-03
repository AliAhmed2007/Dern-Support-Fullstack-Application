import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { DashboardOutlined, SettingOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import useAuth from "../../hooks/useAuth";
import useUserProfile from "../../hooks/useUserProfile";


function UserProfileMenu({ setIsOpen, email, name, darkMode }) {
    const { authDispatch } = useAuth();
    const navigate = useNavigate()
    function handleLogout() {
        authDispatch({ type: 'LOGOUT' })
        navigate('/login?message=Logged Out Successfully&type=success')
    }

    const {userProfile} = useUserProfile()
    const userId = userProfile?.userData?.id

    const menuItems = [
        { icon: <DashboardOutlined />, text: 'Dashboard', path: '/dashboard' },
        { icon: <SettingOutlined />, text: 'Account Settings', path: '/settings' },
        { icon: <ProfileOutlined />, text: 'Profile', path: `/dashboard/user-accounts/${userId}` },
        { icon: <LogoutOutlined />, text: 'Logout' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`absolute right-0 mt-2 w-56 origin-top-right rounded-xl p-2 shadow-lg ${darkMode
                ? 'dark:bg-dark-surface-secondary dark:border border-gray-600'
                : 'bg-light-surface-secondary border border-gray-400'
                }`}
        >
            <div className={`p-4 border-b ${darkMode
                ? 'border-gray-600'
                : 'border-gray-400'}`}
            >
                <div className={`text-sm font-medium mb-1 ${darkMode
                    ? 'dark:text-dark-primary'
                    : 'text-light-primary'}`}
                >
                    {name}
                </div>
                <div className={`text-xs truncate ${darkMode
                    ? 'dark:text-dark-secondary'
                    : 'text-light-secondary'}`}
                >
                    {email}
                </div>
            </div>
            <div>
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`rounded-lg ${darkMode ? 'hover:dark:bg-dark-surface-primary' : 'hover:bg-light-surface-primary'}`}
                    >
                        {item.path ? (
                            <Link
                                to={item.path}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="text-base">{item.icon}</span>
                                <span>{item.text}</span>
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-red-500 cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-sm"
                            >
                                <span className="text-base">{item.icon}</span>
                                <span>{item.text}</span>
                            </button>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default UserProfileMenu
