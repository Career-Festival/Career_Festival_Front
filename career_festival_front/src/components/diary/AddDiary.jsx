import React from "react";
import styled from "styled-components";
import EventInfo from "./EventInfo";

const AddDiaryContainer = styled.div`
  margin: 3.5vw 23vw 3vw 23vw;
`;

function AddDiary() {
  return (
    <AddDiaryContainer>
      <EventInfo />
    </AddDiaryContainer>
  );
}

export default AddDiary;
