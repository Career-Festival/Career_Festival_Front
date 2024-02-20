import React, { useState } from "react";
import styled from "styled-components";
import dummy from "../../db/Diary.json";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = ({ onClose, selectedItemIndex }) => {
  const item = dummy.DiaryList[selectedItemIndex]; // 선택된 항목을 가져옵니다.

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer>
        <p style={{ color: "#582fff" }}>{item.eventTitle}</p>
        <p>{item.uploadedDate}</p>
        <p>{item.diaryTitle}</p>
        <p>{item.type}</p>
        <p>{item.genre}</p>
        <button
          style={{
            fontSize: "1vw",
            background: "#582fff",
            color: "white",
            padding: "1vw",
            borderRadius: "1vw",
            border: "none",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          닫기
        </button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
