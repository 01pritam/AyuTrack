import React, { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { navItems as baseNavItems } from "../../data"; // Import base nav items

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { token, logoutUser, userRole } = useContext(AuthContext);

  // Define role-based navigation items
  const roleBasedNavItems = {
    Manufacturer: [
      { label: "Inventory", href: "/minventory" },
      { label: "Billings", href: "/billings" },
    ],
    Distributor: [
      { label: "Track Orders", href: "/track-orders" },
    ],
    Retailer: [
      { label: "Inventory", href: "/inventory" },
      { label: "Profile", href: "/profile" },
    ],
  };

  // Filter base nav items to exclude role-specific items
  const filteredBaseNavItems = baseNavItems.filter(item => 
    !Object.values(roleBasedNavItems).flat().some(roleItem => roleItem.href === item.href)
  );

  // Combine filtered base items and role-based items
  const navItems = [
    ...filteredBaseNavItems,
    ...(roleBasedNavItems[userRole] || [])
  ];

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-4 bg-teal-100 backdrop-blur-lg border-b border-neutral-200 shadow-md">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-500 to-teal-600 bg-clip-text text-transparent font-suse">
              Ayu
            </h1>
            <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-teal-600 to-green-700 bg-clip-text text-transparent font-suse">
              Track
            </span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-10">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  className="text-gray-700 hover:text-blue-400 transition-colors duration-200">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center space-x-4">
            {!token ? (
              <>
                <a 
                  href="/signin"
                  className="py-2 px-4 border rounded-md border-gray-300 text-gray-700 bg-blue-300 hover:bg-blue-500 hover:text-white transition-colors duration-200">
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="py-2 px-4 rounded-md text-white bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-900 transition-colors duration-200">
                  Create an account
                </a>
              </>
            ) : (
              <a 
                href="/logout"
                onClick={(e) => { e.preventDefault(); logoutUser(); }}
                className="py-2 px-4 border rounded-md border-gray-300 text-gray-700 bg-red-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
                Logout
              </a>
            )}
          </div>
          <div className="lg:hidden flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-white w-full p-6 flex flex-col justify-center items-center lg:hidden">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-700 hover:text-blue-700 transition-colors duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col space-y-4 mt-6">
              {!token ? (
                <>
                  <a 
                    href="/signin"
                    className="py-2 px-4 border rounded-md border-gray-300 text-gray-700 bg-blue-300 hover:bg-blue-500 hover:text-white transition-colors duration-200">
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="py-2 px-4 rounded-md text-white bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-900 transition-colors duration-200">
                    Create an account
                  </a>
                </>
              ) : (
                <a 
                  href="/logout"
                  onClick={(e) => { e.preventDefault(); logoutUser(); }}
                  className="py-2 px-4 border rounded-md border-gray-300 text-gray-700 bg-red-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
                  Logout
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;