function Button({ onClick, text }) {
    return (
      <button
        onClick={onClick}
        className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
      >
        {text}
      </button>
    );
  }
  
  export default Button;