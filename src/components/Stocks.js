import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Accordion, Card, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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

function Stocks() {
  let today = new Date();
  let dd = today.getDate() - 3;
  if (dd < 10) dd = "0" + dd;
  let mm = today.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;
  let yy = today.getFullYear();
  let maxDate = `${yy}-${mm}-${dd}`;
  const [date, setDate] = useState(maxDate);
  const [stocks, setStocks] = useState(null);
  useEffect(() => {
    setStocks(null);
    axios
      .get(
        `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?unadjusted=true&apiKey=i2sTylAJh2M4jMspsvPpx7cFK7EtFdGb`
      )
      .then(
        (res) => {
          setStocks(
            res.data.results
              .slice(0, 100)
              .sort((a, b) => a.T.localeCompare(b.T))
          );
          // setTimeout(() => {
          //   document.getElementById("0").remove();
          // }, 2000);
        },
        (err) => {
          console.log(err);
        }
      );
  }, [date]);
  const handleChange = (event) => {
    setDate(event.target.value);
  };
  const handleCardClick = (event) => {
    let fetched = event.target.getAttribute("data-fetched");
    if (fetched !== "false") return;
    event.target.setAttribute("data-fetched", "true");
    let collapseDiv =
      event.target.parentNode.parentNode.parentNode.children[1].children[0];
    event.preventDefault();
    let ticker = event.target.innerHTML;
    axios
      .get(
        `https://api.polygon.io/v1/meta/symbols/${ticker}/company?&apiKey=i2sTylAJh2M4jMspsvPpx7cFK7EtFdGb`
      )
      .then(
        (res) => {
          collapseDiv.innerHTML = "";
          var div = document.createElement("div");
          div.innerHTML = `
          <div class='row'>
          <img class='col-2' src='${res.data.logo}' alt="LOGO"/>
          <span class='col align-self-end'><h3>${res.data.name}</h4></span>
          </div>
          <br></br>
          <b>CEO:</b> ${res.data.ceo}
          <p>${res.data.description}</p>
          <b>Country:</b> ${res.data.country}
          <br/>
          Website: <a href='${res.data.url}'>${res.data.url}</a>
        `;
          collapseDiv.appendChild(div);
        },
        (err) => {
          collapseDiv.innerHTML = "No details avialable right now!(Try another symbol)";
        }
      );
  };
  return (
    <Wrapper>
      <Form.Group id="filter" className="shadow p-3">
        <Form.Label id="dateLable" className="m-2 p-2">
          <b>Date</b>
        </Form.Label>
        <Form.Control
          type="date"
          name="date"
          defaultValue={maxDate}
          max={maxDate}
          onChange={handleChange}
          className="m-2 drop-glow"
        ></Form.Control>
      </Form.Group>
      <br />
      <h1 className="text-center">Stock Table</h1>
      <Accordion style={{ width: "70%", margin: "auto" }}>
        <div className="text-right">*Clicks symbols for more info</div>

        <Row
          className="p-2 pb-2 pt-2 m-0"
          style={{ border: "1px lightgray solid", width: "100%" }}
        >
          <Col style={{ padding: "5px" }}>SYMBOL</Col>
          <Col xs={2} className="col-me">
            OPEN
          </Col>
          <Col xs={2} className="col-me">
            CLOSE
          </Col>
          <Col xs={2} className="col-me">
            HIGHEST
          </Col>
          <Col xs={2} className="col-me">
            LOWEST
          </Col>
        </Row>
        {stocks
          ? stocks.map((stock, index) => {
              return (
                <Card id={index} key={index}>
                  <Card.Header>
                    <Row key={index}>
                      <Accordion.Toggle
                        as={NavLink}
                        className="col"
                        eventKey={index}
                        data-fetched="false"
                        onClick={handleCardClick}
                      >
                        {stock.T}
                      </Accordion.Toggle>
                      <Col xs={2} className="col-me text-info">
                        {stock.o}
                      </Col>
                      <Col xs={2} className="col-me">
                        <Row>
                          <Col
                            className="p-0 text-secondary"
                            xs={6}
                            style={{ textAlign: "right" }}
                          >
                            {stock.c}
                          </Col>
                          <Col
                            className={
                              stock.c > stock.o
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
                              icon={stock.c > stock.o ? faSortUp : faSortDown}
                              className={
                                stock.c > stock.o
                                  ? "text-success"
                                  : "text-danger"
                              }
                              style={{ fontSize: "15px", height: "15px" }}
                            ></FontAwesomeIcon>
                            {Math.abs(stock.c - stock.o).toFixed(2)}
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={2} className="col-me text-primary">
                        {stock.h}
                      </Col>
                      <Col xs={2} className="col-me text-warning">
                        {stock.l}
                      </Col>
                    </Row>
                  </Card.Header>
                  <Accordion.Collapse eventKey={index}>
                    <Card.Body>Loading <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })
          : "Loading..."}
      </Accordion>
    </Wrapper>
  );
}

export default Stocks;
