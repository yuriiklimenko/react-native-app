import Svg, { Path, G, Rect, Defs, ClipPath } from "react-native-svg";

const TrashIcon = ({ isActive }) => {
  const color = isActive ? "#FFFFFF" : "#BDBDBD";
  const bgcBtn = isActive ? "#BDBDBD" : "#F6F6F6";

  return (
    <Svg style={{ width: 70, height: 40 }} fill="none">
      <G clipPath="url(#clip0_38_39)">
        <Rect width="70" height="40" rx="20" fill={bgcBtn} />
        <Path
          d="M26 14H28H44"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M42.5 14C42.5 13.7239 42.2761 13.5 42 13.5C41.7239 13.5 41.5 13.7239 41.5 14H42.5ZM28.5 14C28.5 13.7239 28.2761 13.5 28 13.5C27.7239 13.5 27.5 13.7239 27.5 14H28.5ZM30.5 14C30.5 14.2761 30.7239 14.5 31 14.5C31.2761 14.5 31.5 14.2761 31.5 14H30.5ZM38.5 14C38.5 14.2761 38.7239 14.5 39 14.5C39.2761 14.5 39.5 14.2761 39.5 14H38.5ZM41.5 14V28H42.5V14H41.5ZM41.5 28C41.5 28.8284 40.8284 29.5 40 29.5V30.5C41.3807 30.5 42.5 29.3807 42.5 28H41.5ZM40 29.5H30V30.5H40V29.5ZM30 29.5C29.1716 29.5 28.5 28.8284 28.5 28H27.5C27.5 29.3807 28.6193 30.5 30 30.5V29.5ZM28.5 28V14H27.5V28H28.5ZM31.5 14V12H30.5V14H31.5ZM31.5 12C31.5 11.1716 32.1716 10.5 33 10.5V9.5C31.6193 9.5 30.5 10.6193 30.5 12H31.5ZM33 10.5H37V9.5H33V10.5ZM37 10.5C37.8284 10.5 38.5 11.1716 38.5 12H39.5C39.5 10.6193 38.3807 9.5 37 9.5V10.5ZM38.5 12V14H39.5V12H38.5Z"
          fill={color}
        />
        <Path
          d="M33 19V25"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M37 19V25"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_38_39">
          <Rect width="70" height="40" fill={bgcBtn} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default TrashIcon;
