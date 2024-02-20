import React, { useState } from "react";
import styled from "styled-components";
import PopUp from "./PopUp";
import SirenImage from "../../assets/images/siren.png";

const EnrollmentContainer = styled.div`
  width: 20vw;
  height: 25vw;
  margin-left: 2vw;
  border-radius: 1vw;
  background: white;
  box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.25);
`;

const InfoContainer = styled.div`
  margin: 1vw 2vw 1vw 2vw;
`;

const ReportContainer = styled.div`
  color: #582fff;
  font-size: 0.7vw;
  font-family: "Noto Sans KR";
  font-weight: 500;
  word-wrap: break-word;
  margin: 0.2vw 0 0 0;
  display: inline-block;
  float: right;
`;

//프로필과 스폰서 감싸는 태그
const SponsorContainer = styled.div`
  display: flex;
  margin-top: 1vw;
`;

//과학기술
const Category1 = styled.div`
  color: black;
  font-size: 0.8vw;
  font-family: "Noto Sans KR";
  font-weight: 500;
  word-wrap: break-word;
  display: inline-block;
`;

//세로바
const VerticalDivider = styled.div`
  width: 0.1vw;
  height: 1vw;
  background: #838383;
  margin: 0 1vw 0 1vw;
  display: inline-block;
`;

//강연/세미나
const Category2 = styled.div`
  color: black;
  font-size: 0.8vw;
  font-family: "Noto Sans KR";
  font-weight: 500;
  word-wrap: break-word;
  display: inline-block;
`;

//신고하기를 감싸는 태그
const Make = styled.div`
  display: flex;
`;

//신고하기 아이콘
const SirenIcon = styled.img`
  width: 20%; // 이미지 크기 조절
`;

const EventTitle = styled.div`
  width: 100%;
  height: auto;
  margin: 2vw 0 1vw 0;
  color: black;
  font-size: 1.1vw;
  font-family: "Noto Sans KR";
  font-weight: 700;
  word-wrap: break-word;
`;

const Tag = styled.div`
  display: flex;
`;

const EventTag = styled.div`
  border-radius: 1vw;
  border: 0.1vw #582fff solid;
  color: #582fff;
  font-size: 0.8vw;
  font-family: "Rubik";
  font-weight: 500;
  word-wrap: break-word;
  display: inline-block;
  margin: 1% 3.5% 0 0;
  padding: 2% 3.5% 2% 3.33%;
`;

const HorizontalDivider = styled.div`
  width: 16vw;
  height: 0.1vw;
  background: #d9d9d9;
  margin: 1vw 0 0 0;
`;

//프로필
const Profile = styled.img`
  width: 2vw;
  height: 2vw;
  background: #d9d9d9;
  border-radius: 70%;
  display: inline-block;
  margin: 0 1vw 0 0;
  align-items: flex-start;
`;
//스폰서
const Sponsor = styled.div`
  color: black;
  font-size: 0.9vw;
  font-family: "Noto Sans KR";
  font-weight: 500;
  word-wrap: break-word;
  display: inline-block;
  align-items: flex-start;
  margin: 0.3vw 0 0 0vw;
`;

//과학기술과 강연세미나를 감싸고 있는 태그
const Body = styled.div`
  display: flex;
  justify-content: space-between;
`;

//신고하기 까지 감싸는 태그
const Cover = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Date = styled.div`
  color: black;
  font-size: 0.8vw;
  font-family: "Noto Sans KR";
  font-weight: 700;
  word-wrap: break-word;
  margin: 1vw 0 0 0;
  display: inline-block;
`;

const Price = styled.div`
  color: #582fff;
  font-size: 0.8vw;
  font-family: "Noto Sans KR";
  font-weight: 700;
  word-wrap: break-word;
  margin: 1vw 0 0 0;
  display: inline-block;
  float: right;
`;

const ButtonContainer = styled.div`
  margin: 2vw 2vw 0 1.5vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1vw;
`;

const ApplyButton = styled.button`
  width: 8vw;
  height: 2.5vw;
  background: #582fff;
  border-radius: 0.5vw;
  border: none;
  color: white;
  font-size: 0.8vw;
  font-family: "Noto Sans KR";
  font-weight: 700;
  word-wrap: break-word;
  display: inline-block;
`;

const ConfirmButton = styled.button`
  width: 8vw;
  height: 2.5vw;
  background: #582fff;
  border-radius: 0.5vw;
  border: none;
  color: white;
  font-size: 0.8vw;
  font-family: "Noto Sans KR";
  font-weight: 700;
  word-wrap: break-word;
  display: inline-block;
`;

const ShareButton = styled.button`
  width: 8vw;
  height: 2.5vw;
  background: #e3dcff;
  border-radius: 0.5vw;
  border: none;
  color: white;
  font-size: 0.8vw;
  font-family: "Noto Sans KR";
  font-weight: 700;
  word-wrap: break-word;
  display: inline-block;
`;

const BookmarkButton = styled.button`
  width: 8vw;
  height: 2.5vw;
  background: #e3dcff;
  border-radius: 0.5vw;
  border: none;
  color: white;
  font-size: 0.8vw;
  font-family: "Noto Sans KR";
  font-weight: 700;
  word-wrap: break-word;
  display: inline-block;
`;

function Enrollment({
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
  organizerName,
  organizerProfileFileUrl,
}) {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModal(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModal(false);
  };

  return (
    <EnrollmentContainer>
      <InfoContainer>
        <Cover>
          <Body>
            <Category1>{keywordName}</Category1>
            <VerticalDivider />
            <Category2>{category}</Category2>
          </Body>
          <Make>
            <ReportContainer
              onClick={() => openModal("행사신고가 완료되었습니다!")}
            >
              신고하기
              <SirenIcon src={SirenImage} alt="siren" />{" "}
            </ReportContainer>
          </Make>
        </Cover>
        <EventTitle>{eventName}</EventTitle>
        <Tag>
          <EventTag>{keywordName}</EventTag>
        </Tag>
        <HorizontalDivider />
        <SponsorContainer>
          <Profile src={organizerProfileFileUrl} />
          <Sponsor>{organizerName}</Sponsor>
        </SponsorContainer>
        <Body>
          <Date>{eventStart}</Date>
          <Price>{eventCost}</Price>
        </Body>
      </InfoContainer>

      <ButtonContainer>
        <ApplyButton
          onClick={() =>
            openModal(
              "해당 행사는 외부 사이트 링크가 없습니다. 주최자의 이메일로 신청부탁드립니다."
            )
          }
        >
          참가 신청하기
        </ApplyButton>
        <ConfirmButton onClick={() => openModal("참가 확정되었습니다!")}>
          참가 확정하기
        </ConfirmButton>
        <ShareButton>공유</ShareButton>
        <BookmarkButton
          onClick={() => openModal("관심 행사에 등록되었습니다!")}
        >
          즐겨찾기★
        </BookmarkButton>
      </ButtonContainer>

      {modal && (
        <PopUp onClose={closeModal}>
          <p>{modalContent}</p>
        </PopUp>
      )}
    </EnrollmentContainer>
  );
}

export default Enrollment;
