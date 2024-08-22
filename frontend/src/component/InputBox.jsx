const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="font-medium text-sm text-left py-2"> {label} </div>
      <div className="">
        <input
          onChange={onChange}
          className="w-full px-2 py-1 rounded border border-slate-200"
          type="text"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputBox;
