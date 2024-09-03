// import React, { useState, useContext } from "react";
// import { Menu, X } from "lucide-react";
// import { AuthContext } from "../../context/AuthContext";
// import { navItems as baseNavItems } from "../../data"; // Import base nav items

// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const { token, logoutUser, userRole } = useContext(AuthContext);

//   // Define role-based navigation items
//   const roleBasedNavItems = {
//     Manufacturer: [
//       { label: "Orders", href: "/morders" },
//       { label: "Inventory", href: "/minventory" },
//       { label: "Billings", href: "/billings" }
//     ],
//     Distributor: [
//       { label: "Track Orders", href: "/track-orders" },
//       { label: "Orders", href: "/dorders" },
//     ],
//     Retailer: [
//       { label: "Inventory", href: "/inventory" },
//       { label: "Profile", href: "/profile" },
//     ],
//   };

//   // Filter base nav items to exclude role-specific items
//   const filteredBaseNavItems = baseNavItems.filter(item => 
//     !Object.values(roleBasedNavItems).flat().some(roleItem => roleItem.href === item.href)
//   );

//   // Combine filtered base items and role-based items
//   const navItems = [
//     ...filteredBaseNavItems,
//     ...(roleBasedNavItems[userRole] || [])
//   ];

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };

//   return (
//     <nav className="sticky top-0 z-50 py-4 bg-blue-500 backdrop-blur-lg border-b border-neutral-200 shadow-md">
//       <div className="container px-4 mx-auto relative lg:text-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center flex-shrink-0">
//             <h1 className="text-2xl font-semibold tracking-tight bg-white bg-clip-text text-transparent font-suse">
//               AyuTrack
//             </h1>
//           </div>
//           <ul className="hidden lg:flex ml-14 space-x-10">
//             {navItems.map((item, index) => (
//               <li key={index}>
//                 <a 
//                   href={item.href} 
//                   className="text-white">
//                   {item.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//           <div className="hidden lg:flex items-center space-x-4">
//             {!token ? (
//               <>
//                 <a 
//                   href="/signin"
//                   className="py-2 px-4 border rounded-md border-gray-300 text-gray-700 bg-blue-300 hover:bg-blue-500 hover:text-white transition-colors duration-200">
//                   Sign In
//                 </a>
//                 <a
//                   href="/signup"
//                   className="py-2 px-4 rounded-md text-white bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-900 transition-colors duration-200">
//                   Create an account
//                 </a>
//               </>
//             ) : (
//               <a 
//                 href="/logout"
//                 onClick={(e) => { e.preventDefault(); logoutUser(); }}
//                 className="py-2 px-4 border rounded-md border-gray-300 text-gray-700 bg-red-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
//                 Logout
//               </a>
//             )}
//           </div>
//           <div className="lg:hidden flex flex-col justify-end">
//             <button onClick={toggleNavbar}>
//               {mobileDrawerOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//         {mobileDrawerOpen && (
//           <div className="fixed right-0 z-20 bg-blue-500 w-full p-6 flex flex-col justify-center items-center lg:hidden">
//             <ul className="space-y-4">
//               {navItems.map((item, index) => (
//                 <li key={index}>
//                   <a 
//                     href={item.href} 
//                     className="text-white">
//                     {item.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//             <div className="flex flex-col space-y-4 mt-6">
//               {!token ? (
//                 <>
//                   <a 
//                     href="/signin"
//                     className="py-2 px-4 border rounded-md border-gray-300 text-gray-700 bg-blue-300 hover:bg-blue-500 hover:text-white transition-colors duration-200">
//                     Sign In
//                   </a>
//                   <a
//                     href="/signup"
//                     className="py-2 px-4 rounded-md text-white bg-gradient-to-r from-teal-500 to-teal-800 hover:from-teal-600 hover:to-teal-900 transition-colors duration-200">
//                     Create an account
//                   </a>
//                 </>
//               ) : (
//                 <a 
//                   href="/logout"
//                   onClick={(e) => { e.preventDefault(); logoutUser(); }}
//                   className="py-2 px-4 border rounded-md border-gray-300 text-gray-700 bg-red-300 hover:bg-red-500 hover:text-white transition-colors duration-200">
//                   Logout
//                 </a>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useContext } from "react";
import { Menu, X, User, ShoppingBag, Package, CreditCard,Layers } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { navItems as baseNavItems } from "../../data";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { token, logoutUser, userRole } = useContext(AuthContext);

  const roleBasedNavItems = {
    Manufacturer: [
      { label: "Orders", href: "/morders", icon: ShoppingBag },
      { label: "Inventory", href: "/minventory", icon: Layers },
      { label: "Billings", href: "/billings", icon: CreditCard },
      { label: "Profile", href: "/profile", icon: User },
    ],
    Distributor: [
      { label: "Inventory", href: "/dinventory", icon: Layers },
      { label: "Track Orders", href: "/track-orders", icon: Package },
      { label: "Orders", href: "/dorders", icon: ShoppingBag },
    ],
    Retailer: [
      { label: "Inventory", href: "/inventory", icon: Package },
      { label: "Profile", href: "/profile", icon: User },
    ],
  };

  const filteredBaseNavItems = baseNavItems.filter(item => 
    !Object.values(roleBasedNavItems).flat().some(roleItem => roleItem.href === item.href)
  );

  const navItems = [
    ...filteredBaseNavItems,
    ...(roleBasedNavItems[userRole] || [])
  ];

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-4 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white mr-10">
              AyuTrack
            </h1>
            <ul className="hidden lg:flex  space-x-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            {!token ? (
              <>
                <a 
                  href="/signin"
                  className="py-2 px-4 rounded-md text-blue-600 bg-white hover:bg-blue-100 transition-colors duration-200"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                >
                  Create an account
                </a>
              </>
            ) : (
              <a 
                href="/logout"
                onClick={(e) => { e.preventDefault(); logoutUser(); }}
                className="py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </a>
            )}
          </div>
          <div className="lg:hidden">
            <button onClick={toggleNavbar} className="text-white">
              {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="lg:hidden mt-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2">
              {!token ? (
                <>
                  <a 
                    href="/signin"
                    className="block py-2 px-4 rounded-md text-center text-blue-600 bg-white hover:bg-blue-100 transition-colors duration-200"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="block py-2 px-4 rounded-md text-center text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                  >
                    Create an account
                  </a>
                </>
              ) : (
                <a 
                  href="/logout"
                  onClick={(e) => { e.preventDefault(); logoutUser(); }}
                  className="block py-2 px-4 rounded-md text-center text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                >
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