import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InvoiceForm from "./InvoiceForm";
import { Box, Button, Typography } from "@mui/material";

const EditInvoice = () => {
  const params = useParams();
  const navigate = useNavigate();
  const invoice = useSelector((state) => state.Invoice);
  const { Invoices } = invoice;

  const invoiceData = Invoices.filter(
    (i) => parseInt(i.invoiceNumber) === parseInt(params.id)
  );

  return (
    <>
      {invoiceData.length > 0 ? (
        <InvoiceForm component="editInvoice" invoiceDataUpdate={invoiceData[0]} />
      ) : (
        <Box sx={{ textAlign: "center", paddingTop: "5rem" }}>
          <Typography>Something went wrong !</Typography>
          <Button
            onClick={() =>
              navigate("/", {
                replace: true,
              })
            }
            sx={{ background: "#084298" }}
            variant="contained"
          >
            Back to home
          </Button>
        </Box>
      )}
    </>
  );
};

export default EditInvoice;
