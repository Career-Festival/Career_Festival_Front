import React from "react";
import Menu from "../eventDetail/Menu";
import Info from "../eventDetail/Info";
import styled from "styled-components";
import dummy from "../../db/RecommendedEvents.json";

const DetailContainer = styled.div`
  width: 50%;
`;

const Thumbnail = styled.img`
  width: 50vw;
  height: 25vw;
  object-fit: cover;
`;

const HorizontalDivider = styled.div`
  width: 100%;
  height: 0.1vw;
  background: #d9d9d9;
  margin: 1vw 0 1px 0; //임시
`;

const FileContainer = styled.img`
  width: 100%;
  height: auto;
  background: transparent;
  margin: 5vw 0 5vw 0;
  text-align: center;
  align-items: center;
  object-fit: contain;
`;

const PlaceContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 4vw 0 4vw 0;
  display: block;
`;

const Subtitle = styled.div`
  color: black;
  font-size: 1.25rem;
  font-family: "Noto Sans KR";
  font-weight: 500;
  word-wrap: break-word;
  margin-bottom: 0.5vw;
`;

function EventDetail({
  eventName,
  eventCost,
  recruitmentStart,
  recruitmentEnd,
  eventStart,
  specAddress,
  keywordName,
  category,
  eventMainImageUrl,
  eventInformImageUrl,
}) {
  return (
    <DetailContainer>
      <Thumbnail src={eventMainImageUrl} />
      <Menu />
      <HorizontalDivider />
      <Info
        eventStart={eventStart}
        recruitmentStart={recruitmentStart}
        recruitmentEnd={recruitmentEnd}
        eventCost={eventCost}
        specAddress={specAddress}
      />
      <HorizontalDivider />
      <FileContainer src={eventInformImageUrl}></FileContainer>
      <PlaceContainer>
        <Subtitle>행사위치</Subtitle>
        {specAddress}
      </PlaceContainer>
    </DetailContainer>
  );
}

export default EventDetail;
