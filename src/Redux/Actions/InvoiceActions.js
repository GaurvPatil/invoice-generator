export const addInvoiceAction = (invoice) => (dispatch, getState) => {
  const {
    Invoice: { Invoices },
  } = getState();

  const hasInvoice = Invoices?.find(
    (i) => i.invoiceNumber === invoice.invoiceNumber
  );

  if (!hasInvoice && invoice.invoiceNumber !== "") {
    dispatch({
      type: "ADD_INVOICE",
      payload: [{ ...invoice }, ...Invoices],
    });
  }
};

export const removeInvoiceAction = (invoiceNum) => (dispatch, getState) => {
  const {
    Invoice: { Invoices },
  } = getState();
  dispatch({
    type: "REMOVE_INVOICE",
    payload: Invoices.filter((i) => i.invoiceNumber !== invoiceNum),
  });
};

export const updateInvoiceAction = (invoice) => (dispatch, getState) => {
  const {
    Invoice: { Invoices },
  } = getState();

  if (invoice.invoiceNumber !== "") {
    for (let i = 0; i < Invoices.length; i++) {
      if (Invoices[i].invoiceNumber === invoice.invoiceNumber) {
        Invoices[i] = invoice;
     
      }
    }
  }

  dispatch({
    type: "UPDATE_INVOICE",
    payload: [...Invoices],
  });
};
