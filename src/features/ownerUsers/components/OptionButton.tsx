type PropsT = {
  title: string;
  className?: string;
  onClick: () => void;
};
function OptionButton({ title, onClick, className }: PropsT) {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
    >
      {title}
    </button>
  );
}
export default OptionButton;
