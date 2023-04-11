const Button = ({ onClick, text }) => {
  return (
    <button
      className="bg-white px-[10px] py-[4px] text-xs border-[1px] border-black
      hover:bg-gray-100"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
