const initialState = {
  filter: { category: { value: "users", label: "users" }, searchKey: "" },
};

export default function filters(state = initialState, action) {
  switch (action.type) {
    case "SET_FILTERS":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}
