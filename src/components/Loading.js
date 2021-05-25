import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

function Loading() {
  useEffect(() => {
    const interval = setInterval(() => {
      document.getElementById('loading-logo').classList.toggle('animate__flash');
    }, 1000);
    return () => clearInterval(interval);
  })
  return (
    <Wrapper>
      <img
        className="animate__animated"
        id='loading-logo'
        width="350px"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/T-SYSTEMS-LOGO2013.svg/1280px-T-SYSTEMS-LOGO2013.svg.png"
      ></img>
    </Wrapper>
  );
}

export default Loading;
