import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import EditInvoice from "./components/EditInvoice";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InvoiceList />} exact />
          <Route path="/createinvoice" element={<InvoiceForm />} />
          <Route path="/editInvoice/:id" element={<EditInvoice />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
