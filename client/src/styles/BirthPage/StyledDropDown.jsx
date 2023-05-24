import { useState } from "react";
import Select, { components } from "react-select";
import MyCustomStyles from "./DropDownCustomStyles.jsx";

const customStyles = MyCustomStyles;

const CustomDropdown = ({
  optionsArray,
  placeHolder,
  selected,
  setSelected,
  isSearchable,
  customOption,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const DefaultOption = (props) => {
    const { label, value, data } = props;
    return <components.Option {...props}>{label}</components.Option>;
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selected);
    setSelected({ ...selected, value: selectedOption.value });
  };

  return (
    <Select
      closeMenuOnSelect={true}
      components={{ Option: customOption ? customOption : DefaultOption }}
      options={optionsArray}
      value={selectedOption}
      onChange={handleSelectChange}
      isSearchable={isSearchable}
      placeholder={placeHolder}
      styles={customStyles}
    />
  );
};

export default CustomDropdown;
