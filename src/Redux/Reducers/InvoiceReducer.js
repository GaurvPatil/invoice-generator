const InvoiceReducer = (state = { Invoices: [] }, action) => {
  switch (action.type) {
    case "ADD_INVOICE":
      return { Invoices: action.payload };

    case "REMOVE_INVOICE":
      return {
        Invoices: action.payload,
      };

    case "UPDATE_INVOICE":
      return {
        Invoices: action.payload,
      };

    default:
      return state;
  }
};

export default InvoiceReducer;
