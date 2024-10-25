type PropsT = {
  title: string;
  className?: string;
  onClick: () => void;
};
function OptionButton({ title, onClick, className }: PropsT) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md size-44 bg-primary-15 border border-primary-25 text-primary-25 text-2xl font-medium
     hover:bg-primary-25 hover:text-primary-10 hover:border-primary-15 transition-all duration-300 ease-out ${className}`}
    >
      {title}
    </button>
  );
}
export default OptionButton;
