import React from "react";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import { removeInvoiceAction } from "../Redux/Actions/InvoiceActions";
import InvoiceModal from "./InvoiceModal";
import { useState } from "react";

const InvoiceList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.Invoice);
  const { Invoices } = invoice;
  const [modalData, setModalData] = useState({});


  const openModal = (i) => {
    dispatch({ type: "OPEN_MODAL", payload: {} });
    setModalData(i);
  };

  function handleDelete(invoiceNum) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Invoice !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeInvoiceAction(invoiceNum));
        swal("Poof! Your Invoice has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Invoice  is safe!");
      }
    });
  }

  return (
    <>
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <Button
          color="success"
          variant="contained"
          onClick={() => navigate("/createinvoice", { replace: true })}
        >
          Create Invoice
        </Button>
      </div>

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5rem",
        }}
      >
        {Invoices?.length > 0 ? (
          Invoices?.map((i) => {
            return (
              <Card
                sx={{ display: "flex", minWidth: 275, padding: "1rem" }}
                key={i.invoiceNumber}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    component="div"
                  >
                    {`Invoice# : ${i.invoiceNumber}`}
                  </Typography>

                  <CardContent sx={{ flex: "1 0 auto" }}>
                   
                    <Typography component="div" variant="h7">
                      <span className="fw-bold me-2"> Bill - To : </span>{" "}
                      {i.billTo}
                    </Typography>
                    <Typography component="div" variant="h7">
                      <span className="fw-bold me-2"> Bill - From : </span>{" "}
                      {i.billFrom}
                    </Typography>
                    <hr />
                    <Typography component="div" variant="h7">
                      <span className="fw-bold me-2"> Total Items : </span>{" "}
                      {i.items.length}
                    </Typography>
                    <Typography component="div" variant="h7">
                      <span className="fw-bold me-2"> Total Amount : </span>
                      {i.total}
                      {i.currency}
                    </Typography>
                    <Typography component="div" variant="h7">
                      <span className="fw-bold me-2"> Due Date : </span>{" "}
                      {i.dueDate}
                    </Typography>

                    <hr />
                  </CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    <Button
                      color="success"
                      variant="contained"
                      onClick={() => openModal(i)}
                    >
                      View
                    </Button>

                    <InvoiceModal
                      info={modalData}
                      items={modalData.items}
                      currency={modalData.currency}
                      subTotal={modalData.subTotal}
                      taxAmmount={modalData.taxAmmount}
                      discountAmmount={modalData.discountAmmount}
                      total={modalData.total}
                      ModalType="viewOnly"
                    />

                    <Button sx={{ background: "#084298" }} variant="contained"
                   
                    onClick={() => navigate(`editinvoice/${i.invoiceNumber}` , { replace: true })}
                    >
                      Edit
                    </Button>



                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => handleDelete(i.invoiceNumber)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Card>
            );
          })
        ) : (
          <Typography>NO DATA AVAILABLE</Typography>
        )}
      </Container>
    </>
  );
};

export default InvoiceList;
