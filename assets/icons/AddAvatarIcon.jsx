import Svg, { Path, Circle } from "react-native-svg";

const AddAvatarIcon = (props) => {
  return (
    <Svg
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={12.5} cy={12.5} r={12} fill="white" stroke="#FF6C00" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
        fill="#FF6C00"
      />
    </Svg>
  );
};

export default AddAvatarIcon;
