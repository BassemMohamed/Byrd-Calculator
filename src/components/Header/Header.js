import React from "react";
import styled from "styled-components";

const HeaderStyled = styled.header`
  position: relative;
  img {
    width: 100%;
    height: 100vh;
  }

  .splash-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
  }

  .splash-content {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);

    h1 {
      color: white;
      font-size: 7rem;
    }
  }
`;

const Header = () => {
  return (
    <HeaderStyled>
      <img src={require("../../assets/header.jpg")} alt="header"></img>
      <div className="splash-overlay"></div>
      <div className="splash-content">
        <h1>Byrd Calculator</h1>
      </div>
    </HeaderStyled>
  );
};

export default Header;
