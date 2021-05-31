import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  Form,
  Row,
  Col,
  Accordion,
  Card,
  NavLink,
  Button,
} from "react-bootstrap";

const Wrapper = styled.div`
  width: 60%;
  text-align: center;
  margin: auto;
  .col-me {
    text-align: center;
    border-left: 1px lightgray solid;
    padding: 5px;
    min-width: 125px;
  }
  .accordion {
    min-width: 620px;
  }
`;

function MyProfile(props) {
  const [currentHoldings, setCurrentHoldings] = useState(null);
  const [oldHoldings, setOldHoldings] = useState(null);
  const [timeValid, setTimeValid] = useState(true);
  
  useEffect(() => {
    let pm5 = new Date();
    pm5.setHours(20, 0, 0);
    if (pm5 - new Date() <= 0) setTimeValid(false);
    axios
      .post("api/stocks/myholdings", { ids: props.user.currentHoldings })
      .then(
        (res) => {
          setCurrentHoldings(res.data);
        },
        (err) => console.log(err)
      );
    axios
      .post("/api/stocks/myoldholdings", { ids: props.user.previousPurchase })
      .then(
        (res) => {
          console.log(res.data);
          setOldHoldings(res.data);
        },
        (err) => console.log(err)
      );
  }, []);
  const handleSell = (event) => {
    let id = event.target.getAttribute("data-id");
    axios.post("/api/stocks/sell-stocks", { id: id }).then(
      (res) => {
        if (!res.data.error) {
          event.target.innerHTML = "SOLD, Refresh Page"
          localStorage.setItem('stockUser', JSON.stringify(res.data.user));
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <Wrapper>
      <img
        width="150px"
        src="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png"
      ></img>
      <h1>{props.user.name}</h1>
      <strong>Balance: </strong>Rs. {props.user.money}
      <br></br>
      <br></br>
      <br></br>
      {currentHoldings ? (
        <Accordion style={{ width: "70%", margin: "auto" }}>
          <h3>Holdings</h3>
          <Row
            className="p-2 pb-2 pt-2 m-0"
            style={{ border: "1px lightgray solid", width: "100%" }}
          >
            <Col style={{ padding: "5px" }}>SYMBOL</Col>
            <Col xs={2} className="col-me">
              Purchase Price
            </Col>
            <Col xs={2} className="col-me">
              Current Price
            </Col>
            <Col xs={2} className="col-me">
              Quantity
            </Col>
            <Col xs={2} className="col-me"></Col>
          </Row>
          {currentHoldings.map((holding, index) => {
            return (
              <Card id={index} key={index}>
                <Card.Header>
                  <Row key={index}>
                    <Accordion.Toggle
                      as={NavLink}
                      //   href={`/stock/${stock._id}`}
                      className="col"
                      eventKey={index}
                      data-fetched="false"
                      // onClick={handleCardClick}
                    >
                      {holding.stock.symbol}
                    </Accordion.Toggle>
                    <Col xs={2} className="col-me text-info">
                      {holding.purchasedAt}
                    </Col>
                    <Col xs={2} className="col-me text-info">
                      {holding.stock.current}
                    </Col>
                    <Col xs={2} className="col-me text-info">
                      {holding.quantity}
                    </Col>
                    <Col xs={2} className="col-me text-info">
                      {timeValid? <Button data-id={holding._id} onClick={handleSell}>
                        SELL
                      </Button>: null}
                    </Col>
                  </Row>
                </Card.Header>
              </Card>
            );
          })}
        </Accordion>
      ) : (
        "Loading..."
      )}
      <br></br>
      {oldHoldings ? (
        <Accordion style={{ width: "70%", margin: "auto" }}>
          <h3>Sold Holdings</h3>
          <Row
            className="p-2 pb-2 pt-2 m-0"
            style={{ border: "1px lightgray solid", width: "100%" }}
          >
            <Col style={{ padding: "5px" }}>SYMBOL</Col>
            <Col xs={2} className="col-me">
              Purchase Price
            </Col>
            <Col xs={2} className="col-me">
              Selling Price
            </Col>
            <Col xs={2} className="col-me">
              Profit
            </Col>
          </Row>
          {oldHoldings.map((holding, index) => {
            return (
              <Card id={index} key={index}>
                <Card.Header>
                  <Row key={index}>
                    <Accordion.Toggle
                      as={NavLink}
                      //   href={`/stock/${stock._id}`}
                      className="col"
                      eventKey={index}
                      data-fetched="false"
                      // onClick={handleCardClick}
                    >
                      {holding.stock.symbol}
                    </Accordion.Toggle>
                    <Col xs={2} className="col-me text-info">
                      {holding.purchasedAt}
                    </Col>
                    <Col xs={2} className="col-me text-info">
                      {holding.soldedAt}
                    </Col>
                    <Col xs={2} className="col-me text-info">
                      Rs. {((holding.soldedAt - holding.purchasedAt)*holding.quantity).toFixed(2)}
                    </Col>
                  </Row>
                </Card.Header>
              </Card>
            );
          })}
        </Accordion>
      ) : (
        "Loading..."
      )}
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(MyProfile);
