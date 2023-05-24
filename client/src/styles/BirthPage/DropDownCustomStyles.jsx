const MyCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    boxShadow: "none",
    border: state.isFocused ? "0.063rem solid #1e75e5" : "0.063rem solid #ccc",
    borderRadius: "0.5rem",
    width: "18rem",
    background: "transparent",
    height: "5rem",
    fontSize: "1.8rem",
    lineHeight: "1.5",
    textAlign: "center",
    margin: "5rem 5rem 0 5rem",
    color: "#7c7c7c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    background: state.isFocused
      ? "#f2f2f2"
      : state.isSelected
      ? "#EFF6FF"
      : "transparent",
    color: state.isSelected ? "#06110A" : "#7c7c7c",
    cursor: "pointer",
    textAlign: "center",
    width: "17rem",
    margin: "auto",
  }),

  menu: (provided) => ({
    ...provided,
    width: "20rem", // Adjust the width as needed
    // maxHeight: "200rem", // Adjust the max height as needed
    overflowY: "auto",
    scrollbarWidth: "none",
    margin: "1rem 4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  menuList: (provided) => ({
    ...provided,
    width: "20rem",
    maxHeight: "20rem",
    overflowY: "scroll",
    scrollbarWidth: "none",
    margin: "1rem 0rem 1rem 0",

    "&::-webkit-scrollbar": {
      width: "0", // Adjust the width of the scrollbar track
      background: "transparent", // Set the background color of the scrollbar track
      display: "none",
    },
    "&::-webkit-scrollbar-thumb": {
      // backgroundColor: "#ccc", // Set the color of the scrollbar thumb
      // borderRadius: "0.5rem", // Set the border radius of the scrollbar thumb
      width: "0", // Adjust the width of the scrollbar track
      background: "transparent", // Set the background color of the scrollbar track
      display: "none",
    },
  }),
};

export default MyCustomStyles;
