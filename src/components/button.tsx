interface Props {
  onClick: Function;
  text: string;
}

const Button = ({ onClick, text }: Props) => {
  return (
    <button
      className="bg-white px-[10px] py-[4px] text-xs border-[1px] border-black
      hover:bg-gray-100 truncate"
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {text}
    </button>
  );
};

export default Button;
