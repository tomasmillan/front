import { BounceLoader } from "react-spinners";

const Spinner = ({ fullWidth }) => {
  return (
    <div className={fullWidth ? 'flex justify-center' : 'border-2 border-blue-500'}>
      <BounceLoader speedMultiplier={3} color={'#555'} />
    </div>
  );
};

export default Spinner;
