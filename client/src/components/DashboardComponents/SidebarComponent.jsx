import React, { useState } from 'react';
import { 
  WalletMinimal, 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  LogOut, 
  Menu, 
  X,
  User,
  InspectIcon
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/auth/authSlice';

const SidebarComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', onClick: () => navigate('/dashboard'), active: true },
    { icon: TrendingUp, label: 'Income', onClick: () => navigate('/dashboard/income') },
    { icon: TrendingDown, label: 'Expenses', onClick: () => navigate('/dashboard/expenses') },
    { icon: InspectIcon, label: 'Fin-Sight', onClick: () => navigate('/dashboard/finsight') },
    { icon: LogOut, label: 'Logout', onClick: handleLogout }
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-600 rounded-lg sm:hidden hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-[#0081A7]/30 transition-all duration-200"
              >
                <span className="sr-only">Open sidebar</span>
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Logo */}
              <a href="/" className="flex items-center ms-2 md:me-24 group">
                <WalletMinimal className="text-[#0081A7] w-8 h-8 me-3 transition-transform group-hover:scale-110" />
                <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-[#0081A7] transition-colors group-hover:text-[#00B4D8]">
                  Expenso
                </span>
              </a>
            </div>

            {/* User menu */}
            <div className="flex items-center">
              <div className="flex items-center ms-3 relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex text-sm bg-gradient-to-r from-[#0081A7] to-[#00B4D8] rounded-full focus:ring-4 focus:ring-[#0081A7]/30 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </button>

                {/* User dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-12 z-50 my-4 text-base list-none bg-white/95 backdrop-blur-md divide-y divide-gray-100 rounded-xl shadow-xl border border-gray-200/50 min-w-48">
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900 font-medium">{user.name}</p>
                      <p className="text-sm font-normal text-gray-600 truncate">{user.email}</p>
                    </div>
                    <ul className="py-1">
                      <li><button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-[#0081A7]/10 hover:text-[#0081A7] transition-colors rounded-lg mx-1">Dashboard</button></li>
                      <li><button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg mx-1">Sign out</button></li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm sm:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 ease-in-out bg-white/95 backdrop-blur-md border-r border-gray-200/50 shadow-xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 pb-4 overflow-y-auto bg-gradient-to-b from-white/90 to-gray-50/90 backdrop-blur-md">
          <ul className="space-y-2 font-medium mt-4">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={item.onClick}
                    className={`group w-full flex items-center p-3 rounded-xl transition-all duration-300 ${
                      item.active
                        ? 'bg-gradient-to-r from-[#0081A7] to-[#00B4D8] text-white shadow-lg shadow-[#0081A7]/20'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#0081A7]/10 hover:to-[#00B4D8]/10 hover:text-[#0081A7] hover:shadow-md hover:shadow-[#0081A7]/10'
                    } hover:scale-105 border border-transparent ${
                      item.active ? 'border-[#0081A7]/20' : 'hover:border-[#0081A7]/20'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                      item.active ? 'text-white' : 'text-gray-500 group-hover:text-[#0081A7]'
                    }`} />
                    <span className="ms-3 font-medium">{item.label}</span>
                    {item.active && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Bottom section with user info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 bg-gradient-to-r from-[#0081A7]/5 to-[#00B4D8]/5 rounded-xl border border-[#0081A7]/10 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#0081A7] to-[#00B4D8] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Click outside to close user dropdown */}
      {isUserDropdownOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsUserDropdownOpen(false)} />
      )}
    </>
  );
};

export default SidebarComponent;
