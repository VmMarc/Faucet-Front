export const tokenReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ...state, token: action.payload[0], ownBalance: action.payload[1], balance: action.payload[2], timer: action.payload[3] };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    case "SET_ALLOWANCE":
      return { ...state, allowance: action.payload };
    default:
      throw new Error(`Unsupported action type ${action.type} in tokenReducer`);
  }
};
