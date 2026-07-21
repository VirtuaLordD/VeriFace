import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanFace, FileText, UserSearch, Shield, Menu, X } from 'lucide-react';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Deepfake Detector', path: '/deepfake', icon: ScanFace },
    { name: 'Text Analyzer', path: '/text-analysis', icon: FileText },
    { name: 'Account Verifier', path: '/account-verifier', icon: UserSearch },
  ];

  return (
    <div className="flex h-screen bg-surface-dark overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-surface border-r border-surface-light transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 border-b border-surface-light">
          <Shield className="w-8 h-8 text-primary mr-2" />
          <span className="text-xl font-bold text-white tracking-wider">VeriFace</span>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                ${isActive 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:bg-surface-light hover:text-white'}
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-surface border-b border-surface-light flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white focus:outline-none focus:text-white lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 flex justify-end items-center space-x-4">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
              <span className="text-gray-400">System Operational</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-surface-dark p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
