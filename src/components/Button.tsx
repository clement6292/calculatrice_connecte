import React from "react";

interface BouttonProps {
  onClick: () => void;
  label: string;
}

const Boutton: React.FC<BouttonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Boutton;
