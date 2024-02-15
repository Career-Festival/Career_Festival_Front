// 키워드를 어떤걸 고르는지에 따라 되거나 안되거나 그럼 수정필요!!!!!!

import React, { useState, useEffect } from "react";
import InterestArea from "./InterestArea";
import AffiliationInput from "./AffiliationInput";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios를 임포트합니다.
import {
  Container,
  Title,
  Subtitle,
  Subtitle2,
  EmailInput,
  TelInput,
  KeyworldOptionList,
  KeywordButton,
  TwoButton,
  LaterSave,
  Save
} from "./OrganizerStyle";

const Organizer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("seoul");
  const [selectedCity, setSelectedCity] = useState("");
  const [email, setEmail] = useState(""); // 추가: 이메일 상태
  const [phoneNumber, setPhoneNumber] = useState(""); // 추가: 전화번호 상태
  const [affiliation, setAffiliation] = useState(""); // 추가: 소속 상태
  const [department, setDepartment] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]); // 추가: 선택된 키워드 상태
  // 기타 키워드 입력을 위한 상태 추가
  const [customKeyword, setCustomKeyword] = useState("");
  const [customKeywords, setCustomKeywords] = useState([]);

  const [token, setToken] = useState("");

  // useEffect를 사용하여 컴포넌트가 처음 마운트될 때 실행될 로직 추가
  useEffect(() => {

    const tokenFromStorage = getTokenFromLocalStorage();
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      console.log("로컬 스토리지에서 토큰을 가져왔습니다:", tokenFromStorage);
    } else {
      // 토큰이 없는 경우 다른 작업 수행
    }
  }, []);

  const navigate = useNavigate();

  const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token;
  };

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

  // 커리어 키워드 선택 시 호출되는 함수입니다.
  const handleKeywordSelect = (keyword) => {
    // 이미 선택된 키워드인지 확인 후 토글
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords((prevKeywords) =>
        prevKeywords.filter((kw) => kw !== keyword)
      );
    } else {
      setSelectedKeywords((prevKeywords) => [...prevKeywords, keyword]);
    }
  };

  // 기타 키워드를 추가하는 함수
  const addCustomKeyword = () => {
    if (customKeyword.trim() !== "") {
      setSelectedKeywords((prevKeywords) => [...prevKeywords, customKeyword]);
      setCustomKeywords((prevCustomKeywords) => [
        ...prevCustomKeywords,
        customKeyword
      ]);
      setCustomKeyword(""); // 입력 필드 초기화
    }
  };

  // 기타 키워드를 삭제하는 함수
  const removeCustomKeyword = (keywordToRemove) => {
    setSelectedKeywords((prevKeywords) =>
      prevKeywords.filter((kw) => kw !== keywordToRemove)
    );
    setCustomKeywords((prevCustomKeywords) =>
      prevCustomKeywords.filter((kw) => kw !== keywordToRemove)
    );
  };

  // "다음에입력" 버튼을 눌렀을 때 실행되는 함수
  const handleNextInput = () => {
    const confirmNextInput = window.confirm("정말 다음에 입력하세요?");
    if (confirmNextInput) {
      // 여기서 홈화면으로 이동하도록 설정
      window.location.href = "/"; // 홈화면의 경로에 따라 수정하세요.
    }
    // 다음에 입력하지 않을 경우, 아무 동작도 하지 않음
  };

  // 부가정보를 저장하는 함수입니다.
  const saveAdditionalInfo = () => {
    console.log("부가정보 저장 함수가 호출되었습니다.");

    // 모든 항목이 입력되었는지 확인
    if (
      selectedArea &&
      selectedCity &&
      email &&
      phoneNumber &&
      affiliation &&
      department &&
      (selectedKeywords.length > 0 || customKeywords.length > 0) // 선택된 키워드 또는 기타 키워드가 있어야 함
    ) {
      console.log("부가정보가 유효합니다.");

      // 선택된 키워드와 기타 키워드를 합침
      const allKeywords = [...selectedKeywords, ...customKeywords];

      // 데이터를 백엔드로 전달할 데이터
      const userData = {
        city: selectedArea,
        addressLine: selectedCity,
        email,
        phoneNumber,
        company: affiliation,
        department,
        keywordName: allKeywords // 선택된 키워드와 기타 키워드를 합친 배열을 전송
      };

      console.log("보낼 사용자 토큰:", token);
      console.log("보낼 사용자 데이터:", userData);

      axios
        .patch("http://localhost:9000/organizer", userData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
          }
        })
        .then((response) => {
          console.log("부가정보 저장 완료:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("부가정보 저장 실패:", error.message);
        });
    } else {
      console.error("모든 항목을 완료해야 합니다.");
    }
  };

  // Organizer 컴포넌트의 렌더링 부분입니다.
  return (
    <Container>
      <Title>김커리님, Career Festival에 가입해주셔서 감사합니다.</Title>
      <Subtitle>직접 오프라인 커리어 행사를 개설하고 싶으신가요?</Subtitle>

      <Subtitle2>
        부가정보를 미리 입력하면 더 빠르게 행사 매칭이 가능합니다.
        <br />
        또, 행사에 함께 갈 팀원 모집 시 서로의 프로필 열람이 가능합니다.
      </Subtitle2>
      <hr />

      {/* 관심지역 입력 부분입니다. */}
      <p>관심지역</p>
      <InterestArea
        selectedArea={selectedArea}
        handleAreaSelect={handleAreaSelect}
        selectedCity={selectedCity}
        handleCitySelect={handleCitySelect}
        isModalOpen={isModalOpen}
        handleModalToggle={handleModalToggle}
        closeModal={closeModal}
        buttonText="선택하기"
      />

      {/* 이메일 입력 부분입니다. */}
      <EmailInput>
        <label>이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </EmailInput>

      {/* 전화번호 입력 부분입니다. */}
      <TelInput>
        <label>전화번호</label>
        <input
          type="tel"
          placeholder="전화번호를 입력하세요"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </TelInput>

      {/* 소속 입력 부분입니다. */}
      <AffiliationInput
        affiliation={affiliation}
        department={department}
        setAffiliation={setAffiliation}
        setDepartment={setDepartment}
      />

      {/* 커리어 키워드 입력 부분입니다. */}
      <p>커리어 키워드</p>
      <KeyworldOptionList>
        {[
          "창업",
          "라이프",
          "예술",
          "IT/프로그래밍",
          "마케팅",
          "경제/금융",
          "인문/사회",
          "과학기술",
          "디자인",
          "관광/여행"
        ].map((keyword) => (
          <KeywordButton
            key={keyword}
            onClick={() => handleKeywordSelect(keyword)}
            selected={selectedKeywords.includes(keyword)}
          >
            {keyword}
          </KeywordButton>
        ))}

        {/* 기타 키워드 입력 필드 */}
        <input
          type="text"
          placeholder="기타 키워드 추가"
          value={customKeyword}
          onChange={(e) => setCustomKeyword(e.target.value)}
        />

        {/* 기타 키워드 추가 버튼 */}
        <button onClick={addCustomKeyword}>추가</button>

        {/* 기타 키워드 목록 */}
        {customKeywords.map((customKeyword) => (
          <KeywordButton
            key={customKeyword}
            onClick={() => handleKeywordSelect(customKeyword)}
            selected={selectedKeywords.includes(customKeyword)}
            onRemove={() => removeCustomKeyword(customKeyword)}
          >
            {customKeyword}
          </KeywordButton>
        ))}
      </KeyworldOptionList>
      <hr />

      <TwoButton>
        <LaterSave onClick={handleNextInput}>다음에입력</LaterSave>
        {/* 부가정보 저장하기 버튼 */}
        <Save
          onClick={saveAdditionalInfo}
          disabled={
            !selectedArea ||
            !selectedCity ||
            !email ||
            !phoneNumber ||
            !affiliation ||
            selectedKeywords.length === 0
          }
        >
          부가정보 저장하기
        </Save>
      </TwoButton>
    </Container>
  );
};

export default Organizer;
