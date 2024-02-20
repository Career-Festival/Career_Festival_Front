import React, { useState } from "react";
import styled from "styled-components";
import EventInfo from "./EventInfo";
import PeopleNetwork from "./PeopleNetwork";
import Pick from "./Pick";
import { Link } from "react-router-dom";

const LectureSeminarContainer = styled.div`
  margin: 3.5vw 23vw 3vw 23vw;

  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2vw;
  }
`;

const Button = styled(Link)`
  padding: 1vw;
  background-color: #582fff;
  color: white;
  font-size: 1vw;
  border: none;
  border-radius: 1vw;
  cursor: pointer;
  text-decoration: none;
`;

function LectureSeminar() {
  const [isEventInfoComplete, setEventInfoComplete] = useState(false);
  const [isPeopleNetworkComplete, setPeopleNetworkComplete] = useState(false);
  const [isSeminarRecordComplete, ] = useState({
    isComplete: false,
    missingInputs: [],
  });


  const handleEventInfoComplete = (isComplete) => {
    setEventInfoComplete(isComplete);
  };

  const handlePeopleNetworkComplete = (isComplete) => {
    setPeopleNetworkComplete(isComplete);
  };

  const handleSaveToLocalStorage = () => {
    // diary 객체 생성
    const diary = {
      eventInfoComplete: isEventInfoComplete,
      peopleNetworkComplete: isPeopleNetworkComplete,
      seminarRecordComplete: isSeminarRecordComplete,
    };

    // 로컬 스토리지에 저장
    localStorage.setItem("diary", JSON.stringify(diary));
  };

  return (
    <LectureSeminarContainer>
      <Pick />
      <EventInfo onInfoComplete={handleEventInfoComplete} />
      <PeopleNetwork onComplete={handlePeopleNetworkComplete} />
      <div className="centered">
        <Button to="/diary" onClick={handleSaveToLocalStorage}>
          등록하기
        </Button>
      </div>
    </LectureSeminarContainer>
  );
}

export default LectureSeminar;
