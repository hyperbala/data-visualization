import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const Input = ({ label, placeholder, data, name, value, onChange }) => {
  return (
    
    <Select
      label={label}
      placeholder={placeholder}
      selectionMode="single"
      className="max-w-xs"
      name={name}
      onChange={onChange}
      value={value}
    >
      {data.map((d) => (
        <SelectItem key={d} value={d}>
          {d}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Input;
