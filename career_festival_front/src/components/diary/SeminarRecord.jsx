import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Editor from "../EditorComponent";

const RecordContainer = styled.div`
  flex-direction: column;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-top: 2.7vw;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const TextContainer = styled.div`
  margin-top: 1vw;
  input {
    font-size: 1vw;
  }
`;

const TitleText = styled.div`
  color: black;
  font-size: 1.4vw;
  font-family: "Noto Sans KR";
  font-weight: 700;
  word-wrap: break-word;
`;

function SeminarRecord({ onComplete }) {
  const [isWritten] = useState(false);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (isWritten) {
      console.log("작성이 완료되었습니다.");
      onComplete(true);
    } else {
      console.log("작성이 아직 완료되지 않았습니다.");
      onComplete(false);
    }
  }, [isWritten, onComplete]);

  const onSaveData = () => {
    axios
      .post("/api/saveData", { desc })
      .then((response) => {
        console.log("데이터 저장 완료", response.data);
        onComplete(true);
      })
      .catch((error) => {
        console.error("데이터 저장 중 오류 발생", error);
        onComplete(false);
      });
  };

  return (
    <RecordContainer>
      <InputContainer>
        <TitleText>행사 기록</TitleText>
        <ContentContainer>
          <TextContainer style={{ marginTop: "2vw" }}>
            <div>
              <Editor value={desc} onChange={(value) => setDesc(value)} />
            </div>
          </TextContainer>
          {/* <div className="pd12">
            <button style={{ fontSize:"1vw" }} className="lf-button primary" onClick={onSaveData}>
              데이터 저장
            </button>
          </div> */}
        </ContentContainer>
      </InputContainer>
    </RecordContainer>
  );
}

export default SeminarRecord;
