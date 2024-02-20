// 키워드를 어떤걸 고르는지에 따라 되거나 안되거나 그럼 수정필요!!!!!!



import React, { useState, useEffect } from "react";
import InterestArea from "./InterestArea";
import AffiliationInput from "./AffiliationInput";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Subtitle,
  Subtitle2,
  Gender,
  Age,
  EmailInput,
  TelInput,
  KeywordOptionList,
  KeywordButton,
  TwoButton,
  LaterSave,
  Save,
} from "./ParticipantStyle";
import { useAuth } from "../../context/AuthContext";

const Participant = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("seoul");
  const [selectedCity, setSelectedCity] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [customKeyword, setCustomKeyword] = useState("");
  const [customKeywords, setCustomKeywords] = useState([]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const { saveAdditionalInfo } = useAuth();


  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setSelectedCity("");
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setModalOpen(false);
  };

  const handleKeywordSelect = (keyword) => {
    const updatedKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter((kw) => kw !== keyword)
      : [...selectedKeywords, keyword];
    setSelectedKeywords(updatedKeywords);
  };

  const addCustomKeyword = () => {
    if (customKeyword.trim() !== "") {
      setSelectedKeywords([...selectedKeywords, customKeyword]);
      setCustomKeywords([...customKeywords, customKeyword]);
      setCustomKeyword("");
    }
  };

  const removeCustomKeyword = (keywordToRemove) => {
    setSelectedKeywords(
      selectedKeywords.filter((kw) => kw !== keywordToRemove)
    );
    setCustomKeywords(customKeywords.filter((kw) => kw !== keywordToRemove));
  };

  const handleNextInput = () => {
    const confirmNextInput = window.confirm("정말 다음에 입력하세요?");
    if (confirmNextInput) {
      window.location.href = "/";
    }
  };

  const handleSaveAdditionalInfo = () => {
    console.log("부가정보 저장 함수가 호출되었습니다.");
    // 모든 항목이 입력되었는지 확인
    if (
      !gender ||
      !age ||
      !selectedArea ||
      !selectedCity ||
      !email ||
      !phoneNumber ||
      !affiliation ||
      !department ||
      selectedKeywords.length === 0
    ) {
      console.error("모든 항목을 완료해야 합니다.");
      return;
    }

    const intAge = parseInt(age);
    const userData = {
      gender,
      age: intAge,
      city: selectedArea,
      addressLine: selectedCity,
      email,
      phoneNumber,
      company: affiliation,
      department,
      keywordName: [...selectedKeywords, ...customKeywords]
    };

    console.log("보낼 사용자 데이터:", userData);

    saveAdditionalInfo(userData);
    setTimeout(() => {
      saveAdditionalInfo(userData); // 첫 번째 호출
      saveAdditionalInfo(userData); // 두 번째 호출
      saveAdditionalInfo(userData); // 세 번째 호출
    }, 1000);
  };
  
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container>
      <Title>{user.userName}님, Career Festival에 가입해주셔서 감사합니다.</Title>
      <Subtitle>
        나에게 맞는{" "}
        <span style={{ fontWeight: "bold" }}>오프라인 커리어 행사</span>를 찾고
        싶으신가요?
      </Subtitle>
      <Subtitle2>
        부가정보를 미리 입력하면 더 빠르게 행사 매칭이 가능합니다. <br />
        또, 행사에 함께 갈 팀원 모집 시 서로의 프로필 열람이 가능합니다.
      </Subtitle2>
      <hr />

      <label style={{ fontWeight: "bold", fontSize: "15px" }}>성별</label>
      <Gender>
        <input
          type="radio"
          id="male"
          name="gender"
          value="남성"
          onChange={() => setGender("남성")}
        />
        <label htmlFor="male">남성</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="여성"
          onChange={() => setGender("여성")}
        />
        <label htmlFor="female">여성</label>
      </Gender>

      <Age>
        <label style={{ fontWeight: "bold", fontSize: "15px" }}>나이</label>
        <input
          style={{ fontSize: "12px" }}
          type="number"
          placeholder="숫자로만 적어주세요!"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Age>

      <label style={{ fontWeight: "bold", fontSize: "15px" }}>관심지역</label>
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

      <EmailInput>
        <label style={{ fontWeight: "bold", fontSize: "15px" }}>이메일</label>
        <input
          style={{ fontSize: "12px" }}
          type="email"
          placeholder="예시) test@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </EmailInput>

      <TelInput>
        <label style={{ fontWeight: "bold", fontSize: "15px" }}>전화번호</label>
        <input
          style={{ fontSize: "12px" }}
          type="tel"
          placeholder="예시) 010-1234-1234"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </TelInput>

      <AffiliationInput
        affiliation={affiliation}
        department={department}
        setAffiliation={setAffiliation}
        setDepartment={setDepartment}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
          marginBottom: "10px"
        }}
      >
        <label style={{ fontSize: "15px", fontWeight: "bold" }}>
          커리어 키워드
        </label>
        <label style={{ fontSize: "12px", color: "#583fff" }}>
          관심분야를 골라주세요!
        </label>
      </div>
      <KeywordOptionList>
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
        <input
          type="text"
          placeholder="기타 키워드 추가"
          value={customKeyword}
          onChange={(e) => setCustomKeyword(e.target.value)}
        />
        <button onClick={addCustomKeyword}>추가</button>
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
      </KeywordOptionList>
      <hr />

      <TwoButton>
        <LaterSave onClick={handleNextInput}>다음에 입력</LaterSave>
        <Save
          onClick={handleSaveAdditionalInfo}
          disabled={
            !gender ||
            !age ||
            !selectedArea ||
            !selectedCity ||
            !email ||
            !phoneNumber ||
            !affiliation ||
            !department ||
            selectedKeywords.length === 0
          }
        >
          부가정보 저장하기
        </Save>
      </TwoButton>
    </Container>
  );
};

export default Participant;
