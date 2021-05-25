import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const Wrapper = styled.div`
  .ml6 {
    position: relative;
    font-weight: 900;
    font-size: 3.3em;
  }

  .ml6 .text-wrapper {
    position: relative;
    display: inline-block;
    padding-top: 0.2em;
    padding-right: 0.05em;
    padding-bottom: 0.1em;
    overflow: hidden;
  }

  .ml6 .letter {
    display: inline-block;
    line-height: 1em;
  }
`;

function Loading() {
  useEffect(() => {
      const script = document.createElement('script');
      script.type = "text/javascript";
      script.src = "/scripts/loading";
      script.async = true;
      document.body.appendChild(script);
  }, [])
  return (
    <Wrapper>
      <h1 className="ml6">
        <span className="text-wrapper">
          <span className="letters">Beautiful Questions</span>
        </span>
      </h1>
      <Helmet>
        {/* <script async src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script> */}
        {/* <script async src="./scripts/loading" type="text/javascript"></script> */}
      </Helmet>
    </Wrapper>
  );
}

export default Loading;
