"use client";

const Button = () => {
  return (
    <button
      onClick={() => {
        console.log("clicked");
      }}
      className="font-sans rounded-md bg-gray-900 p-2 text-white"
    >
      Click Me
    </button>
  );
};

export default Button;
