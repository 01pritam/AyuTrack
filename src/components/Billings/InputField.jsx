function InputField({ label, name, type = "text", value, onChange, placeholder }) {
  return (
      <div className="flex flex-col">
          <label htmlFor={name} className="text-gray-700 font-medium mb-1">{label}</label>
          <input
              type={type}
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

export default InputField;
