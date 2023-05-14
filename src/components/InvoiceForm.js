import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { updateInvoiceAction } from "../Redux/Actions/InvoiceActions";
import { useNavigate } from "react-router-dom";
class CInvoiceForm extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.Invoices);
    this.state = {
      currency: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.currency
        : "$",
      currentDate: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.currentDate
        : "",
      invoiceNumber: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.invoiceNumber
        : this.props.Invoices?.length > 0
        ? parseInt(this.props.Invoices[0].invoiceNumber) + 1
        : 1,
      dueDate: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.dueDate
        : "",
      billTo: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.billTo
        : "",
      billToEmail: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.billToEmail
        : "",
      billToAddress: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.billToAddress
        : "",
      billFrom: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.billFrom
        : "",
      billFromEmail: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.billFromEmail
        : "",
      billFromAddress: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.billFromAddress
        : "",
      notes: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.notes
        : "",
      total: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.total
        : "0.00",
      subTotal: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.subTotal
        : "0.00",
      taxRate: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.taxRate
        : "",
      taxAmmount: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.taxAmmount
        : "0.00",
      discountRate: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.discountRate
        : "",
      discountAmmount: this.props.invoiceDataUpdate
        ? this.props.invoiceDataUpdate.discountAmmount
        : "0.00",
    };

    this.state.items = this.props.invoiceDataUpdate
      ? [...this.props.invoiceDataUpdate.items]
      : [
          {
            id: 0,
            name: "",
            description: "",
            price: "1.00",
            quantity: 1,
          },
        ];

    this.editField = this.editField.bind(this);
  }

  componentDidMount(prevProps) {
    this.handleCalculateTotal();
  }

  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  }

  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    this.state.items.push(items);
    this.setState(this.state.items);
  }

  handleCalculateTotal() {
    var items = this.state.items;
    var subTotal = 0;

    items.map(function (items) {
      subTotal = parseFloat(
        subTotal + parseFloat(items.price).toFixed(2) * parseInt(items.quantity)
      ).toFixed(2);
      return [];
    });

    this.setState(
      {
        subTotal: parseFloat(subTotal).toFixed(2),
      },
      () => {
        this.setState(
          {
            taxAmmount: parseFloat(
              parseFloat(subTotal) * (this.state.taxRate / 100)
            ).toFixed(2),
          },
          () => {
            this.setState(
              {
                discountAmmount: parseFloat(
                  parseFloat(subTotal) * (this.state.discountRate / 100)
                ).toFixed(2),
              },
              () => {
                this.setState({
                  total:
                    subTotal -
                    this.state.discountAmmount +
                    parseFloat(this.state.taxAmmount),
                });
              }
            );
          }
        );
      }
    );
  }

  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var items = this.state.items.slice();
    var newItems = items.map(function (items) {
      for (var key in items) {
        if (key === item.name && items.id === item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({ items: newItems });
    this.handleCalculateTotal();
  }

  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.handleCalculateTotal();
  };

  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };

  render() {
    const { navigate } = this.props;
    const { dispatch } = this.props;
    return (
      <>
        <div className="App d-flex flex-column align-items-center justify-content-center w-100">
          <Container>
            <Form
              onSubmit={(event) => {
                if (this.props.component === "editInvoice") {
                  event.preventDefault();
                  swal({
                    title: "Are you sure?",
                    buttons: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      dispatch(updateInvoiceAction(this.state));

                      swal(
                        "Poof! Your Invoice has been updated successfully !",
                        {
                          icon: "success",
                        }
                      );
                      navigate("/", { replace: true });
                    } else {
                      swal("Your Invoice  is safe!");
                    }
                  });
                } else {
                  event.preventDefault();
                  this.handleCalculateTotal();
                  dispatch({ type: "OPEN_MODAL", payload: {} });
                }
              }}
            >
              <Row>
                <div
                  style={{
                    marginTop: "1rem",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    style={{ width: "20%", float: "left" }}
                    onClick={(e) => navigate("/", { replace: true })}
                  >
                    Back
                  </Button>
                </div>
                <Col md={8} lg={9}>
                  <Card className="p-4 p-xl-5 my-3 my-xl-4">
                    <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-column">
                          <div className="mb-2">
                            <span className="fw-bold">
                              Current&nbsp;Date:&nbsp;
                            </span>
                            <span className="current-date">
                              {new Date().toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <span className="fw-bold d-block me-2">
                            Due&nbsp;Date:
                          </span>
                          <Form.Control
                            type="date"
                            value={this.state.dueDate}
                            name={"dueDate"}
                            onChange={(event) => this.editField(event)}
                            style={{
                              maxWidth: "150px",
                            }}
                            required="required"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <span className="fw-bold me-2">
                          Invoice&nbsp;Number:&nbsp;
                        </span>

                        <div
                          style={{
                            maxWidth: "70px",
                          }}
                        />

                        {this.state.invoiceNumber}
                      </div>
                    </div>
                    <hr className="my-4" />
                    <Row className="mb-5">
                      <Col>
                        <Form.Label className="fw-bold">Bill to:</Form.Label>
                        <Form.Control
                          placeholder={"Who is this invoice to?"}
                          rows={3}
                          value={this.state.billTo}
                          type="text"
                          name="billTo"
                          className="my-2"
                          onChange={(event) => this.editField(event)}
                          autoComplete="name"
                          required="required"
                        />
                        <Form.Control
                          placeholder={"Email address"}
                          value={this.state.billToEmail}
                          type="email"
                          name="billToEmail"
                          className="my-2"
                          onChange={(event) => this.editField(event)}
                          autoComplete="email"
                          required="required"
                        />
                        <Form.Control
                          placeholder={"Billing address"}
                          value={this.state.billToAddress}
                          type="text"
                          name="billToAddress"
                          className="my-2"
                          autoComplete="address"
                          onChange={(event) => this.editField(event)}
                          required="required"
                        />
                      </Col>
                      <Col>
                        <Form.Label className="fw-bold">Bill from:</Form.Label>
                        <Form.Control
                          placeholder={"Who is this invoice from?"}
                          rows={3}
                          value={this.state.billFrom}
                          type="text"
                          name="billFrom"
                          className="my-2"
                          onChange={(event) => this.editField(event)}
                          autoComplete="name"
                          required="required"
                        />
                        <Form.Control
                          placeholder={"Email address"}
                          value={this.state.billFromEmail}
                          type="email"
                          name="billFromEmail"
                          className="my-2"
                          onChange={(event) => this.editField(event)}
                          autoComplete="email"
                          required="required"
                        />
                        <Form.Control
                          placeholder={"Billing address"}
                          value={this.state.billFromAddress}
                          type="text"
                          name="billFromAddress"
                          className="my-2"
                          autoComplete="address"
                          onChange={(event) => this.editField(event)}
                          required="required"
                        />
                      </Col>
                    </Row>
                    <InvoiceItem
                      onItemizedItemEdit={this.onItemizedItemEdit.bind(this)}
                      onRowAdd={this.handleAddEvent.bind(this)}
                      onRowDel={this.handleRowDel.bind(this)}
                      currency={this.state.currency}
                      items={this.state.items}
                    />
                    <Row className="mt-4 justify-content-end">
                      <Col lg={6}>
                        <div className="d-flex flex-row align-items-start justify-content-between">
                          <span className="fw-bold">Subtotal:</span>
                          <span>
                            {this.state.currency}
                            {this.state.subTotal}
                          </span>
                        </div>
                        <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                          <span className="fw-bold">Discount:</span>
                          <span>
                            <span className="small ">
                              ({this.state.discountRate || 0}%)
                            </span>
                            {this.state.currency}
                            {this.state.discountAmmount || 0}
                          </span>
                        </div>
                        <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                          <span className="fw-bold">Tax:</span>
                          <span>
                            <span className="small ">
                              ({this.state.taxRate || 0}%)
                            </span>
                            {this.state.currency}
                            {this.state.taxAmmount || 0}
                          </span>
                        </div>
                        <hr />
                        <div
                          className="d-flex flex-row align-items-start justify-content-between"
                          style={{
                            fontSize: "1.125rem",
                          }}
                        >
                          <span className="fw-bold">Total:</span>
                          <span className="fw-bold">
                            {this.state.currency}
                            {this.state.total || 0}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <hr className="my-4" />
                    <Form.Label className="fw-bold">Notes:</Form.Label>
                    <Form.Control
                      placeholder="Thanks for your business!"
                      name="notes"
                      value={this.state.notes}
                      onChange={(event) => this.editField(event)}
                      as="textarea"
                      className="my-2"
                      rows={1}
                    />
                  </Card>
                </Col>
                <Col md={4} lg={3}>
                  <div className="sticky-top pt-md-3 pt-xl-4">
                    {this.props.component === "editInvoice" ? (
                      <Button
                        variant="primary"
                        type="submit"
                        className="d-block w-100"
                      >
                        Update Invoice
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        type="submit"
                        className="d-block w-100"
                      >
                        Review Invoice
                      </Button>
                    )}

                    <InvoiceModal
                      info={this.state}
                      items={this.state.items}
                      currency={this.state.currency}
                      subTotal={this.state.subTotal}
                      taxAmmount={this.state.taxAmmount}
                      discountAmmount={this.state.discountAmmount}
                      total={this.state.total}
                    />

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Currency:</Form.Label>
                      <Form.Select
                        onChange={(event) =>
                          this.onCurrencyChange({
                            currency: event.target.value,
                          })
                        }
                        className="btn btn-light my-1"
                        aria-label="Change Currency"
                      >
                        <option value="$">USD (United States Dollar)</option>
                        <option value="£">GBP (British Pound Sterling)</option>
                        <option value="¥">JPY (Japanese Yen)</option>
                        <option value="$">CAD (Canadian Dollar)</option>
                        <option value="$">AUD (Australian Dollar)</option>
                        <option value="$">SGD (Signapore Dollar)</option>
                        <option value="¥">CNY (Chinese Renminbi)</option>
                        <option value="₿">BTC (Bitcoin)</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="my-3">
                      <Form.Label className="fw-bold">Tax rate:</Form.Label>
                      <InputGroup className="my-1 flex-nowrap">
                        <Form.Control
                          name="taxRate"
                          type="number"
                          value={this.state.taxRate}
                          onChange={(event) => this.editField(event)}
                          className="bg-white border"
                          placeholder="0.0"
                          min="0.00"
                          step="0.01"
                          max="100.00"
                        />
                        <InputGroup.Text className="bg-light fw-bold text-secondary small">
                          %
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="my-3">
                      <Form.Label className="fw-bold">
                        Discount rate:
                      </Form.Label>
                      <InputGroup className="my-1 flex-nowrap">
                        <Form.Control
                          name="discountRate"
                          type="number"
                          value={this.state.discountRate}
                          onChange={(event) => this.editField(event)}
                          className="bg-white border"
                          placeholder="0.0"
                          min="0.00"
                          step="0.01"
                          max="100.00"
                        />
                        <InputGroup.Text className="bg-light fw-bold text-secondary small">
                          %
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </>
    );
  }
}

const InvoiceForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.Invoice);
  const { Invoices } = invoice;
  return (
    <CInvoiceForm
      {...props}
      navigate={navigate}
      dispatch={dispatch}
      Invoices={Invoices}
    />
  );
};

export default InvoiceForm;
