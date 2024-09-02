// components/Card.js
export const HoverEffect = ({ children }) => {
    return (
      <div className="transition-transform transform hover:scale-105">
        {children}
      </div>
    );
  };
  
  export function Card({ icon: Icon, title, onClick }) {
    return (
      <HoverEffect>
        <div
          className="flex flex-col items-center cursor-pointer hover:bg-teal-100 p-4 rounded-lg"
          onClick={onClick}
        >
          <Icon size={50} className="text-blue-600 mb-4" />
          <span className="text-xl font-semibold text-gray-700">{title}</span>
        </div>
      </HoverEffect>
    );
  }