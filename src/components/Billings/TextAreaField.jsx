function TextAreaField({ label, name, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col mt-5">
      <label htmlFor={name} className="text-gray-700 font-semibold mb-2">{label}</label>
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default TextAreaField;