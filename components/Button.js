import { primary } from "@/lib/colors";

const Button = ({ children, block, white, black, primary, outline, size, ...rest }) => {
  const buttonClasses = `
    px-5 py-2
    rounded-md
    cursor-pointer
    inline-flex
    items-center
    text-decoration-none
    font-poppins
    font-semibold
    text-base
    ${block && 'block w-full'}
    ${white && !outline && 'bg-white text-black'}
    ${white && outline && 'border border-white text-white'}
    ${black && !outline && 'bg-black text-white'}
    ${black && outline && 'border border-black text-black'}
    ${primary && !outline && `bg-${primary} border border-${primary} text-white`}
    ${primary && outline && `border border-${primary} text-${primary}`}
    ${size === 'l' && 'text-lg px-10 py-4'}
  `;

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
