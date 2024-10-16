import { InputLoginRegisterProps } from "@/features/auth/types/formType";

const Input = (props: InputLoginRegisterProps) => {
  const { name, value, type, icon, onChange, placeholder, styleProp } = props;

  return (
    <div className="w-full relative">
      <label className="text-sm font-bold" htmlFor={name}>{placeholder}*</label>
      <input
        className={`${styleProp}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <span className="absolute right-3 top-1/2 text-p500">
        {icon}
      </span>
    </div>
  );
};
export default Input;
