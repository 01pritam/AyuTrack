function InputField({ label, name, type = "text", value, onChange, placeholder }) {
    return (
      <div className="flex flex-col">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="border p-2 rounded"
        />
      </div>
    );
  }
  
  export default InputField;