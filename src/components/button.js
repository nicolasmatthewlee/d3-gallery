export const Button = ({ onClick, text }) => {
  return (
    <button
      className="bg-white hover:bg-gray-200"
      style={{
        border: "1px solid black",
        padding: "6px 10px 6px 10px",
        fontFamily: "monospace",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
