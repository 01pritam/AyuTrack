

// import React, { useState, useContext } from "react";
// import { Menu, X, User, ShoppingBag, Package, CreditCard,Layers } from "lucide-react";
// import { AuthContext } from "../../context/AuthContext";
// import { navItems as baseNavItems } from "../../data";

// const Navbar = () => {
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const { token, logoutUser, userRole } = useContext(AuthContext);

//   const roleBasedNavItems = {
//     Manufacturer: [
//       { label: "Inventory", href: "/minventory", icon: Layers },
//       { label: "Orders", href: "/morders", icon: ShoppingBag },
//       { label: "Billings", href: "/billings", icon: CreditCard },
//       { label: "Profile", href: "/profile", icon: User },
//     ],
//     Distributor: [
//       { label: "Inventory", href: "/dinventory", icon: Layers },
//       { label: "Track Orders", href: "/track-orders", icon: Package },
//       { label: "Orders", href: "/dorders", icon: ShoppingBag },
//     ],
//     Retailer: [
//       { label: "Inventory", href: "/inventory", icon: Package },
//       { label: "Profile", href: "/profile", icon: User },
//     ],
//   };

//   const filteredBaseNavItems = baseNavItems.filter(item => 
//     !Object.values(roleBasedNavItems).flat().some(roleItem => roleItem.href === item.href)
//   );

//   const navItems = [
//     ...filteredBaseNavItems,
//     ...(roleBasedNavItems[userRole] || [])
//   ];

//   const toggleNavbar = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };

//   return (
//     <nav className="sticky top-0 z-50 py-4 bg-gradient-to-r from-teal-600 to-teal-800 shadow-lg">
//       <div className="container px-4 mx-auto">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//           <div className="border-2 border-white rounded-lg px-2 py-1 inline-block mr-60">
//             <h1 className="text-2xl font-bold text-white">
//               AyuTrack
//             </h1>
//           </div>
//             <ul className="hidden lg:flex  space-x-6">
//               {navItems.map((item, index) => (
//                 <li key={index}>
//                   <a 
//                     href={item.href} 
//                     className="text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
//                   >
//                     {item.icon && <item.icon className="w-4 h-4 mr-2" />}
//                     {item.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="hidden lg:flex items-center space-x-4">
//             {!token ? (
//               <>
//                 <a 
//                   href="/signin"
//                   className="py-2 px-4 rounded-md text-blue-600 bg-white hover:bg-blue-100 transition-colors duration-200"
//                 >
//                   Sign In
//                 </a>
//                 <a
//                   href="/signup"
//                   className="py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
//                 >
//                   Create an account
//                 </a>
//               </>
//             ) : (
//               <a 
//                 href="/logout"
//                 onClick={(e) => { e.preventDefault(); logoutUser(); }}
//                 className="py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
//               >
//                 Logout
//               </a>
//             )}
//           </div>
//           <div className="lg:hidden">
//             <button onClick={toggleNavbar} className="text-white">
//               {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//         {mobileDrawerOpen && (
//           <div className="lg:hidden mt-4">
//             <ul className="space-y-2">
//               {navItems.map((item, index) => (
//                 <li key={index}>
//                   <a 
//                     href={item.href} 
//                     className="text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
//                   >
//                     {item.icon && <item.icon className="w-4 h-4 mr-2" />}
//                     {item.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-4 space-y-2">
//               {!token ? (
//                 <>
//                   <a 
//                     href="/signin"
//                     className="block py-2 px-4 rounded-md text-center text-blue-600 bg-white hover:bg-blue-100 transition-colors duration-200"
//                   >
//                     Sign In
//                   </a>
//                   <a
//                     href="/signup"
//                     className="block py-2 px-4 rounded-md text-center text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
//                   >
//                     Create an account
//                   </a>
//                 </>
//               ) : (
//                 <a 
//                   href="/logout"
//                   onClick={(e) => { e.preventDefault(); logoutUser(); }}
//                   className="block py-2 px-4 rounded-md text-center text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
//                 >
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
import { Menu, X, User, ShoppingBag, Package, CreditCard, Layers } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { navItems as baseNavItems } from "../../data";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { token, logoutUser, userRole } = useContext(AuthContext);

  const roleBasedNavItems = {
    Manufacturer: [
      { label: "Inventory", href: "/minventory", icon: Layers },
      { label: "Orders", href: "/morders", icon: ShoppingBag },
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
    <nav className="sticky top-0 z-50 py-4 bg-gradient-to-r from-teal-600 to-teal-800 shadow-lg">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="border-2 border-white rounded-lg px-2 py-1 inline-block mr-60">
              <h1 className="text-2xl font-bold text-white">
                AyuTrack
              </h1>
            </div>
            <ul className="hidden lg:flex space-x-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            {!token ? (
              <>
                <Link 
                  to="/signin"
                  className="py-2 px-4 rounded-md text-blue-600 bg-white hover:bg-blue-100 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                >
                  Create an account
                </Link>
              </>
            ) : (
              <Link 
                to="/logout"
                onClick={(e) => { e.preventDefault(); logoutUser(); }}
                className="py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </Link>
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
                  <Link 
                    to={item.href} 
                    className="text-white hover:text-blue-200 transition-colors duration-200 flex items-center"
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2">
              {!token ? (
                <>
                  <Link 
                    to="/signin"
                    className="block py-2 px-4 rounded-md text-center text-blue-600 bg-white hover:bg-blue-100 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-2 px-4 rounded-md text-center text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                  >
                    Create an account
                  </Link>
                </>
              ) : (
                <Link 
                  to="/logout"
                  onClick={(e) => { e.preventDefault(); logoutUser(); }}
                  className="block py-2 px-4 rounded-md text-center text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;