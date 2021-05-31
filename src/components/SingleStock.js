import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from "react-bootstrap";
import Loading from "./Loading";
import { useRef } from "react";
import Header from "./Header";

function SingleStock(props) {
  const inputRef = useRef();
  const [stock, setStock] = useState();
  const [timeValid, setTimeValid] = useState(true);
  useEffect(() => {
    let pm5 = new Date();
    pm5.setHours(20, 0, 0);
    if (pm5 - new Date() <= 0) setTimeValid(false);
    const {
      match: { params },
    } = props;
    axios.get(`/api/stocks/${params.id}`).then(
      (res) => {
        setStock(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const handlePurchase = (event) => {
    if (inputRef.current.value > stock.quantity) return;
    axios
      .post("/api/stocks/buy-stocks", {
        id: stock._id,
        quantity: inputRef.current.value,
      })
      .then(
        (res) => {
          if (!res.data.error) {
            localStorage.setItem("stockUser", JSON.stringify(res.data.user));
            event.target.innerHTML = "Buy More";
            setStock((prev) => {
              return {
                ...prev,
                quantity: prev.quantity - inputRef.current.value,
              };
            });
          }
        },
        (err) => console.log(err)
      );
  };
  return (
    <div>
      <Header />
      <div className="p-5">
        {stock ? (
          <div className="d-flex justify-content-around flex-wrap">
            <span>
              <h1>{stock.name}</h1>
              <p className="p-3">
                <strong>Last Day Close Value: </strong>
                {stock.prev}
                <br />
                <strong>Open: </strong>
                {stock.current}
                <br />
                <strong>Up/Down: </strong>
                <span
                  className={
                    stock.current > stock.prev
                      ? "p-0 pl-2 text-success"
                      : "p-0 pl-2 text-danger"
                  }
                  style={{
                    fontSize: "15px",
                    lineHeight: "2",
                    textAlign: "left",
                  }}
                >
                  <FontAwesomeIcon
                    icon={stock.current > stock.prev ? faSortUp : faSortDown}
                    className={
                      stock.current > stock.prev
                        ? "text-success"
                        : "text-danger"
                    }
                    style={{ fontSize: "15px", height: "15px" }}
                  ></FontAwesomeIcon>
                  {Math.abs(stock.current - stock.prev).toFixed(2)}
                </span>
                <br />
                <strong>Volume: </strong>
                {stock.quantity}
              </p>
            </span>
            {timeValid ? (
              <Form.Group
                id="filter"
                className="shadow p-3 text-center"
                style={{ width: "250px" }}
              >
                <Form.Label id="dateLable" className="m-2 p-2">
                  <b>Happy Stocking !</b>
                </Form.Label>
                <Form.Label id="dateLable" className="m-2 p-2">
                  Enter Quantity
                </Form.Label>
                <Form.Control
                  ref={inputRef}
                  type="number"
                  name="quantity"
                  defaultValue="100"
                  max={stock.quantity}
                  className="drop-glow"
                ></Form.Control>
                <br />
                <Button className="mt-2" onClick={handlePurchase}>
                  Buy Stocks{" "}
                </Button>
              </Form.Group>
            ) : null}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default SingleStock;
