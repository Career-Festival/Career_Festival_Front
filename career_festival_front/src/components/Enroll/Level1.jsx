import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Backicon from "../../assets/images/keyboard-left-arrow-button.png";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  text-align: center;
  padding: 15vw;
`;

// 주요 제목 스타일 정의
const Main = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  font-size: 1.2rem;
`;

const InputField = styled.input`
  width: 300px;
  padding: 10px;
  margin-top: 2vw;
  font-size: 1rem;
  border: 0.1vw solid #838383;
  border-radius: 0.5vw;
`;

const Contents = styled.div`
  font-size: 0.8rem;
  margin-top: 20px;
  white-space: pre-line;
`;

const StyledText = styled.span`
  color: #582fff;
  font-weight: bold;
`;

// 다음 버튼 스타일 정의
const NextButton = styled.button`
  margin-top: 2vw;
  padding: 0.8vw 4vw;
  font-size: 1rem;
  background-color: #582fff;
  color: #fff;
  border: none;
  border-radius: 0.5vw;
  cursor: pointer;
  &:hover {
    background-color: #4700a6;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  margin-top: -10vw;
  margin-right: 70vw;
  img {
    width: 20px;
    margin: 2vw;
  }
`;


// 주최자 프로필 개설 페이지 컴포넌트
const Level1 = () => {
  const [organizerName, setOrganizerName] = useState("");

  // 주최자 이름 입력 시 상태 업데이트 및 로컬 스토리지에 저장
  const handleNameChange = (event) => {
    const name = event.target.value;
    setOrganizerName(name);
    localStorage.setItem("organizerName", name);
  };

  // 다음 버튼 클릭 시 이동 및 이름 유효성 검사
  const handleNextClick = () => {
    if (organizerName.trim() === "") {
      alert("이름을 입력하세요");
    } else {
      // Level2로 이동
      window.location.href = "/register/Level2";
    }
  };

  return (
    <Container>
      <BackLink to="/">
        {" "}
        {/* 메인 화면으로 이동하는 BackLink 컴포넌트 추가 */}
        <img src={Backicon} alt="Backicon" />
      </BackLink>
      <Main>주최자 프로필 개설</Main>
      <InputContainer>
        <label htmlFor="organizerName">주최자의 이름을 입력해주세요.</label>
        <Contents>
          커리어페스티벌에서 <StyledText>프로필명</StyledText>이 됩니다.
          {"\n"}웹 내에서 공개될 프로필로 참가자들에게 보여질 내용입니다.
        </Contents>

        <InputField
          type="text"
          placeholder="예시) 박시현"
          id="organizerName"
          value={organizerName}
          onChange={handleNameChange}
        />
      </InputContainer>

      <NextButton onClick={handleNextClick}>다음</NextButton>
    </Container>
  );
};

export default Level1;
