function TextAreaField({ label, name, value, onChange, placeholder }) {
    return (
      <div className="flex flex-col mt-5">
        <label htmlFor={name}>{label}</label>
        <textarea
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
  
  export default TextAreaField;