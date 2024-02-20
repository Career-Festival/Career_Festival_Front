import React from "react";
import styled from "styled-components";
import MypageProfileImg from "../../assets/images/mypage_profile.png";

//전체 페이지
const MypageProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12vw;
  align-items: center;
`;
//프로필 이미지
const MypageProfileImgWrapper = styled.div`
  width: 18vw;
  height: 18vw;

  img {
    width: 100%;
    height: 100%;
  }
`;

//안녕하세요
const MypageInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;

  h2 {
    font-size: 1.2vw;
    margin: 0;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
    }
  }
  span {
    color: #582fff;
  }
`;
const EmailWrapper = styled.div`
  h2 {
    font-size: 1vw;
    font-weight: 700;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
      margin: 1vw 0;
    }
  }
  div {
    font-size: 1vw;
    font-weight: 400;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
    }
  }
`;
const PersonalAreaWrapper = styled.div`
  h2 {
    font-size: 1vw;
    font-weight: 700;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
      margin: 1vw 0;
    }
  }
`;
const AreaItem = styled.button`
  //margin: 0.7vw 0 2vw 0;
  border: none;
  border-radius: 6px;
  width: 6vw;
  height: 2vw;
  background-color: #dad1fb;
  color: #582fff;
  font-size: 1vw;
  font-weight: 700;

  @media screen and (max-width: 600px) {
    font-size: 0.7vw;
  }
`;

//연락처
const Introduce = styled.div`
  h2 {
    font-size: 1vw;
    font-weight: 700;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
      margin: 1vw 0;
    }
  }
  div {
    font-size: 1vw;
    font-weight: 400;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
    }
  }
`;


const MypageInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;
`;

const CareerKeywordContainer = styled.div`
  h2{
    font-size: 1vw;
  font-weight: 700;
  }

  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;

const ContentWrapper1 = styled.div`
  width: 2vw;
  font-size: 1vw;
  padding: 0.2vw 0.5vw;
  cursor: pointer;
  background: #ffffff;
  color: #582fff;
  border-radius: 5vw;
  border: 0.1vw solid #582fff;
`;

const DepartmentContainer = styled.div`
  h2 {
    font-size: 1vw;
    font-weight: 700;
  }

  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;
const ContentWrapper2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5vw;
  font-size: 1vw;
  font-weight: 400;

  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;

const PersonalContainer = styled.div`
  h2 {
    font-size: 1vw;
    font-weight: 700;
  }

  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;
const ContentWrapper3 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3vw;
  font-size: 1vw;
  font-weight: 400;

  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;
const VerticalDivider = styled.div`
  border-left: 0.02vw solid #d9d9d9;
`;

const KeywordItem = styled.div`
  font-size: 1vw;
  font-weight: 400;
`;
// 나누기 선
const HorizontalDivider = styled.div`
  width: 100%;
  height: 0.01vw;
  background: #d9d9d9;
  margin: 2vw 0 2vw 0;
`;

function MypageProfile() {
  const mypageData = JSON.parse(localStorage.getItem("mypageData"));
  
  return (
    <div>
      <MypageProfileContainer>
        <MypageProfileImgWrapper>
          <img src={MypageProfileImg} alt="mypageProfile" />
        </MypageProfileImgWrapper>
        <MypageInfoWrapper>
          <h2>
            안녕하세요. <span>{mypageData.name}</span>입니다.
          </h2>{" "}
          {/* 데이터 연결 필요 */}
          <EmailWrapper>
            <h2>이메일</h2>
            <div>{mypageData.email}</div>
          </EmailWrapper>
          <PersonalAreaWrapper>
            <h2>관심지역</h2>
            <AreaItem>{mypageData.addressLine}</AreaItem>
          </PersonalAreaWrapper>
          <Introduce>
            <h2>연락처</h2>
            <div>{mypageData.phoneNumber}</div>
          </Introduce>
        </MypageInfoWrapper>
        {/*<ShowProfile>보여지는 프로필 설정하기</ShowProfile>*/}
      </MypageProfileContainer>

      <HorizontalDivider />
      <MypageInfoContainer>
        <CareerKeywordContainer>
          <h2>내 커리어 키워드</h2>
          <ContentWrapper1>
            {mypageData.keywordNameList.map((keyword, index) => (
              <KeywordItem key={index}>{keyword}</KeywordItem>
            ))}
          </ContentWrapper1>
        </CareerKeywordContainer>

        <DepartmentContainer>
          <h2>내가 속한 학교 혹은 단체 및 회사</h2>
          <ContentWrapper2>
            <div>{mypageData.company}</div>
            <div>{mypageData.department}</div>
          </ContentWrapper2>
        </DepartmentContainer>

        <PersonalContainer>
          <h2>나이 및 성별</h2>
          <ContentWrapper3>
            <div>{mypageData.age}</div>
            <VerticalDivider />
            <div>{mypageData.gender}</div>
          </ContentWrapper3>
        </PersonalContainer>
      </MypageInfoContainer>
    </div>
  );
}

export default MypageProfile;
