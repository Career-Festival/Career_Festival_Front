import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/images/close.png";

const PopUpContainer = styled.div`
  display: flex;
  z-index: 999;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 0.1vw #d9d9d9 solid;
  border-radius: 0.3rem;
  background: white;
  opacity: 0.9;

  padding: 1vw;
`;

const Button = styled.img`
  width: 0.8vw;
  height: 0.8vw;
  cursor: pointer;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0.5vw;
  right: 0.5vw;
`;

const PopUpContent = styled.div`
  color: black;
  font-family: "Noto Sans KR";
  font-weight: 500;
  font-size: 0.8rem;
`;

const PopUp = ({ onClose, children }) => {
  return (
    <PopUpContainer>
      <PopUpContent>
        <CloseButton src={CloseIcon} onClick={onClose}></CloseButton>
        {children}
      </PopUpContent>
    </PopUpContainer>
  );
};

export default PopUp;
