import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MypageProfileImg from "../../assets/images/mypage_profile.png";
import Area from "../home/Area";
import KeywordList from "../home/KeywordList";
import AffiliationInput from "../signup/AffiliationInput";

import {
  Gender,
} from "../signup/ParticipantStyle";

//전체 페이지
const MypageProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12vw;
  align-items: center;
`;

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
    margin-bottom: 0.5vw;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
    }
  }
  span {
    color: #582fff;
  }
`;
const NameContainer = styled.div`
  input {
    padding: 0.7vw 0 0.7vw 0.7vw;
    border: 0.1rem solid #838383;
    border-radius: 0.5vw;
    cursor: pointer;
    background-color: #ffffff;
    text-align: start;
    color: #757575;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
      width: 20vw;
      border-radius: 5px;
      border: 0.05rem solid #838383;
      padding: 0.7vw 0 0.7vw 0.7vw;
    }
  }
`;

const EmailContainer = styled.div`
  input {
    padding: 0.7vw 0 0.7vw 0.7vw;
    border: none;
    background-color: #ffffff;
    text-align: start;
    color: #757575;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
      width: 20vw;
      border-radius: 0.5vw;
      border: 0.05rem solid #838383;
      padding: 0.7vw 0 0.7vw 0.7vw;
    }
  }
`;

const PlaceContainer = styled.div`

`;

const IntroduceContainer = styled.div`
  input {
    padding: 0.7vw 0 0.7vw 0.7vw;
    border: 0.1rem solid #838383;
    border-radius: 8px;
    cursor: pointer;
    background-color: #ffffff;
    text-align: start;
    color: #757575;


    @media screen and (max-width: 600px) {
      font-size: 1vw;
      border-radius: 0.5vw;
      border: 0.05rem solid #838383;
      padding: 0.7vw 0 0.7vw 0.7vw;
    }
  }
`;

const MypageInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vw;
`;

const CareerKeywordContainer = styled.div`
  h2 {
    font-size: 1vw;
    font-weight: 700;
  }
`

const DepartmentContainer = styled.div`
  h2 {
    font-size: 1vw;
    font-weight: 700;
  }

  @media screen and (max-width: 600px) {
    font-size: 2vw;
  }

   input {
    padding: 0.7vw 0 0.7vw 0.7vw;
    border: 0.1vw solid #838383;
    border-radius: 8px;
    cursor: pointer;
    background-color: #ffffff;
    text-align: start;
    color: #757575;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
      border-radius: 0.5vw;
      border: 0.05vw solid #838383;
      padding: 0.7vw 0 0.7vw 0.7vw;
    }
  }
`;

const PersonalContainer = styled.div`
  h2 {
    font-size: 1vw;
    font-weight: 700;
  }

  @media screen and (max-width: 600px) {
    font-size: 2vw;
  }
`;
const ContentWrapper3 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5vw;
  font-size: 1vw;
  font-weight: 400;

  @media screen and (max-width: 600px) {
    font-size: 2vw;

    display: flex;
    flex-direction: column;
    gap: 2vw;
  }
`;
const VerticalDivider = styled.div`
  border-left: 0.02vw solid #d9d9d9;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const Age = styled.div`
  input {
    padding: 0.7vw 0 0.7vw 0.7vw;
    border: 0.1vw solid #838383;
    border-radius: 8px;
    cursor: pointer;
    background-color: #ffffff;
    text-align: start;
    color: #757575;

    @media screen and (max-width: 600px) {
      font-size: 1vw;
      border-radius: 0.5vw;
      border: 0.05vw solid #838383;
      padding: 0.7vw 0 0.7vw 0.7vw;
    }
  }
`;

function MypageProfileCorrection() {
  // 모달 창의 열림 여부와 선택된 지역 정보 및 추가 정보를 상태로 관리합니다.
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("seoul");
  const [selectedCity, setSelectedCity] = useState("");
  const [email, setEmail] = useState(""); // 추가: 이메일 상태
  const [name, setName] = useState(""); // 이름 추가
  const [introduce, setIntroduce] = useState(""); // 한줄 소개 추가

  // useEffect를 사용하여 컴포넌트가 처음 마운트될 때 실행될 로직 추가
  // useEffect를 사용하여 컴포넌트가 처음 마운트될 때 실행될 로직 추가
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 가져와서 이메일을 설정합니다.
    const mypageData = JSON.parse(localStorage.getItem("mypageData"));
    if (mypageData && mypageData.email) {
      setEmail(mypageData.email);
    }
  }, []);

  // 모달 창을 열거나 닫는 함수를 정의합니다.
  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  // 모달 닫기 함수를 정의합니다.
  const closeModal = () => {
    setModalOpen(false);
  };

  // 시/도를 선택할 때 호출되는 함수입니다.
  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setSelectedCity("");
  };

  // 시/군/구를 선택할 때 호출되는 함수입니다.
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setModalOpen(false);
  };

  //모든 항목이 입력되었는지 확인

  const [affiliation, setAffiliation] = useState(""); // 추가: 소속 상태
  const mypageData = JSON.parse(localStorage.getItem("mypageData"));
  
  return (
    <div>
      <MypageProfileContainer>
        <MypageProfileImgWrapper>
          <img src={MypageProfileImg} alt="mypageProfile" />
        </MypageProfileImgWrapper>
        <MypageInfoWrapper>
          <NameContainer>
            <h2>이름</h2>
            <input
              type="text"
              placeholder={mypageData.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </NameContainer>


          <EmailContainer>
            <h2>이메일</h2>
            <input
              type="email"
              value={email}
              disabled // 수정 불가능하도록 설정
            />
          </EmailContainer>

          <PlaceContainer>
            <h2>관심지역</h2>
            <Area
              selectedArea={selectedArea}
              handleAreaSelect={handleAreaSelect}
              selectedCity={selectedCity}
              handleCitySelect={handleCitySelect}
              isModalOpen={isModalOpen}
              handleModalToggle={handleModalToggle}
              closeModal={closeModal}
              buttonText="선택하기"

            />
          </PlaceContainer>

          <IntroduceContainer>
            <h2>연락처</h2>
            <input
              type="text"
              placeholder="연락처를 남겨주세요!"
              value={introduce}
              onChange={(e) => setIntroduce(e.target.value)}
            />
          </IntroduceContainer>
        </MypageInfoWrapper>
        {/*<ShowProfile>보여지는 프로필 설정하기</ShowProfile>*/}
      </MypageProfileContainer>
      <MypageInfoContainer>
        <CareerKeywordContainer>
          <h2>내 커리어 키워드</h2>
          <KeywordList />
        </CareerKeywordContainer>

        <DepartmentContainer>
          {/* <h2>내가 속한 학교 혹은 단체 및 회사</h2> */}
       <AffiliationInput/>
        </DepartmentContainer>

        <PersonalContainer>
          <h2>나이 및 성별</h2>
          <ContentWrapper3>
            <Age>
              <input type="number" placeholder="숫자만 입력해주세요" />
            </Age>
            <VerticalDivider />
            <Gender>
              <input type="radio" id="male" name="gender" value="male" />
              <label htmlFor="male">남성</label>
              <input type="radio" id="female" name="gender" value="female" />
              <label htmlFor="female">여성</label>
            </Gender>
          </ContentWrapper3>
        </PersonalContainer>
      </MypageInfoContainer>{" "}
    </div>
  );
}

export default MypageProfileCorrection;
