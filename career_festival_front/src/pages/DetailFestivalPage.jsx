// src/pages/DetailFestival.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Enrollment from "../components/eventDetail/Enrollment";
import EventDetail from "../components/eventDetail/EventDetail";
import QnA from "../components/eventDetail/QnA";
import QnAList from "../components/eventDetail/QnAList";
import Contact from "../components/eventDetail/Contact";
import Join from "../components/eventDetail/Join";
import CommentList from "../components/eventDetail/CommentList";
import axios from "axios";

const DetailFestivalPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  //height: 100%;
  padding: 2vw 15vw;
`;

const DetailContainer = styled.div`
  display: flex;
  width: 100%;
`;

const DetailFestivalPage = () => {
  //-----------------------------------------------------
  // 날짜 형변환
  // datetime 형식을 "-년 -월 -일 -시 -분" 형태로 변환하는 함수
  //------------------------------------------------------
  function formatDateTime(datetimeString) {
    const dateTime = new Date(datetimeString); // 문자열을 Date 객체로 변환
    const year = dateTime.getFullYear(); // 연도 추출
    const month = dateTime.getMonth() + 1; // 월 추출 (0부터 시작하므로 1을 더함)
    const day = dateTime.getDate(); // 일 추출
    const hours = dateTime.getHours(); // 시간 추출
    const minutes = dateTime.getMinutes(); // 분 추출

    // 한 자리 숫자일 경우 앞에 0을 추가하여 두 자리로 만듦
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // 포맷된 문자열 반환
    return `${year}년 ${formattedMonth}월 ${formattedDay}일 ${formattedHours}시 ${formattedMinutes}분`;
  }

  //------------------------------------------------------
  // api
  //------------------------------------------------------
  const { eventId } = useParams();

  const [eventName, setEventName] = useState("");
  const [recruitmentStart, setRecruitmentStart] = useState("");
  const [recruitmentEnd, setRecruitmentEnd] = useState("");
  const [eventCost, setEventCost] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [specAddress, setSpecAddress] = useState("");
  const [keywordName, setKeywordName] = useState("");
  const [category, setCategory] = useState("");
  const [eventMainImageUrl, setEventMainImageUrl] = useState("");
  const [eventInformImageUrl, setEventInformImageUrl] = useState("");
  const [managerEmail, setmanagerEmail] = useState("");
  const [managerName, setmanagerName] = useState("");

  const [organizerName, setorganizerName] = useState("");
  const [organizerProfileFileUrl, setorganizerProfileFileUrl] = useState("");

  useEffect(() => {
    const fetchEventDetailData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/event/${eventId}`
        );

        const eventInfo = response.data.eventInformation[0];

        setEventName(eventInfo.eventName);
        setEventCost(eventInfo.eventCost);
        setRecruitmentStart(formatDateTime(eventInfo.recruitmentStart));
        setRecruitmentEnd(formatDateTime(eventInfo.recruitmentEnd));
        setEventStart(formatDateTime(eventInfo.eventStart));
        setSpecAddress(eventInfo.specAddress);
        setKeywordName(eventInfo.keywordName);
        setCategory(eventInfo.category);
        setEventMainImageUrl(eventInfo.eventMainImageUrl);
        setEventInformImageUrl(eventInfo.eventInformImageUrl);
        setmanagerEmail(eventInfo.managerEmail);
        setmanagerName(eventInfo.managerName);

        console.log("Event Info data fetching에 성공했습니다.");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchEventOrganizerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/event/${eventId}`
        );

        const organizerInfo = response.data.organizerInformation;

        setorganizerName(organizerInfo.organizerName);
        setorganizerProfileFileUrl(organizerInfo.organizerProfileFileUrl);

        console.log("Event Organizer data fetching에 성공했습니다.");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEventDetailData();
    fetchEventOrganizerData();
  }, [eventId]);

  return (
    <DetailFestivalPageContainer>
      <DetailContainer>
        <EventDetail
          eventName={eventName}
          eventCost={eventCost}
          recruitmentStart={recruitmentStart}
          recruitmentEnd={recruitmentEnd}
          eventStart={eventStart}
          specAddress={specAddress}
          keywordName={keywordName}
          category={category}
          eventMainImageUrl={eventMainImageUrl}
          eventInformImageUrl={eventInformImageUrl}
        />
        <Enrollment
          eventName={eventName}
          eventCost={eventCost}
          recruitmentStart={recruitmentStart}
          recruitmentEnd={recruitmentEnd}
          eventStart={eventStart}
          specAddress={specAddress}
          keywordName={keywordName}
          category={category}
          eventMainImageUrl={eventMainImageUrl}
          eventInformImageUrl={eventInformImageUrl}
          organizerName={organizerName}
          organizerProfileFileUrl={organizerProfileFileUrl}
        />
      </DetailContainer>
      <QnA />
      <QnAList />
      <Contact managerName={managerName} managerEmail={managerEmail} />
      <Join />
      <CommentList />
    </DetailFestivalPageContainer>
  );
};

export default DetailFestivalPage;
