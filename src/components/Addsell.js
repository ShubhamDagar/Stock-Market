import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  #stocks {
    width: 60%;
    margin: auto;
  }
  #filter {
    width: 300px;
    margin: auto;
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: white;
  }
  .col-me {
    text-align: center;
    border-left: 1px lightgray solid;
    padding: 5px;
    min-width: 125px;
  }
  .accordion {
    min-width: 620px;
  }
  position: relative;
`;

function Addsell() {
  const [stocks, setStocks] = useState(null);
  useEffect(() => {
    axios.get("/api/stocks").then(
      (res) => {
        setStocks(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  });
  return (
    <Wrapper>
      <br />
      <h1 className="text-center">Stock Table</h1>
      <Accordion style={{ width: "70%", margin: "auto" }}>
        <Row
          className="p-2 pb-2 pt-2 m-0"
          style={{ border: "1px lightgray solid", width: "100%" }}
        >
          <Col style={{ padding: "5px" }}>SYMBOL</Col>
          <Col xs={2} className="col-me">
            CLOSE
          </Col>
          <Col xs={2} className="col-me">
            OPEN
          </Col>
          <Col xs={2} className="col-me">
            Quantity
          </Col>
        </Row>
        {stocks? (
          stocks.map((stock, index) => {
            return (
              <Card id={index} key={index}>
                <Card.Header>
                  <Row key={index}>
                    <Accordion.Toggle
                      as={NavLink}
                      href={`/stock/${stock._id}`}
                      className="col"
                      eventKey={index}
                      data-fetched="false"
                      // onClick={handleCardClick}
                    >
                      {stock.symbol}
                    </Accordion.Toggle>
                    <Col xs={2} className="col-me text-info">
                      {stock.prev}
                    </Col>
                    <Col xs={2} className="col-me">
                      <Row>
                        <Col
                          className="p-0 text-secondary"
                          xs={6}
                          style={{ textAlign: "right" }}
                        >
                          {stock.current}
                        </Col>
                        <Col
                          className={
                            stock.current > stock.prev
                              ? "p-0 pl-2 text-success"
                              : "p-0 pl-2 text-danger"
                          }
                          style={{
                            fontSize: "12px",
                            lineHeight: "2",
                            textAlign: "left",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={stock.current > stock.prev ? faSortUp : faSortDown}
                            className={
                              stock.current > stock.prev ? "text-success" : "text-danger"
                            }
                            style={{ fontSize: "15px", height: "15px" }}
                          ></FontAwesomeIcon>
                          {Math.abs(stock.current - stock.prev).toFixed(2)}
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={2} className="col-me text-info">
                      {stock.quantity}
                    </Col>
                  </Row>
                </Card.Header>
              </Card>
            );
          })
        ) : (
          "Loading..."
        )}
      </Accordion>
    </Wrapper>
  );
}

export default Addsell;
