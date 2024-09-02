function Button({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="mt-5 bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-md border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 transition duration-300"
    >
      {text}
    </button>
  );
}

export default Button;