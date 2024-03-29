import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import InterestArea from "../signup/InterestArea"; // 관심지역 컴포넌트 import
import imageIcon from "../../assets/images/frame_gallery_image.png";
import StartCalendar from "../Enroll/StartCalendar";
import EndCalendar from "../Enroll/EndCalendar";
import Clock from "../Enroll/Clock";
import { useAuth } from "../../context/AuthContext";

import {
  NextButton,
  PurpleTitle,
  Title,
  Level7Container,
  SubTitle,
  HL, //HorizenLine
  KeyworldOptionList,
  KeywordButton,
  InputFestivalName, // 추가: InputFestivalName 컴포넌트 import
  InputIntroduce,
  FestivalInformation, // 추가: 행사 정보 입력 컴포넌트 import
  FestivalInformationInput, // 추가: 행사 정보 입력 컴포넌트 import
  AddOther,
  AddOtherButton,
  AddURL,
  FestivalFee,
  ManagerName,
  ManagerEmail,
  AttachmentButton,
  ImageIcon,
  ImageAddButton,
  ImageAddButton2,
  TitleImage,
  StartDate,
  EndDate,
  Term,
  DetailedLocationInput
} from "./Level7Style"; // Level7Style 파일에서 스타일 요소들을 불러옴

const Level7 = () => {
  // 키워드
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [customKeyword, setCustomKeyword] = useState("");
  const [customKeywords, setCustomKeywords] = useState([]); // 초기값을 빈 배열로 변경
  // 행사명 및 간단 소개
  const [eventName, setEventName] = useState("");
  const [eventIntroduction, setEventIntroduction] = useState(""); // 간단 소개 상태 추가
  // 이미지 추가
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일 상태 추가
  const [externalSiteUrl, setExternalSiteUrl] = useState(""); // 외부 사이트 URL 상태 추가
  // 이미지 업로드 및 관련 상태와 함수 정의
  const [selectedMainImage, setSelectedMainImage] = useState(null); // 대표이미지 파일 상태 추가
  // 행사정보이미지 업로드 및 관련 상태와 함수 정의
  const [selectedEventInfoImage, setSelectedEventInfoImage] = useState(null); // 행사정보이미지 파일 상태 추가

  // 관심지역
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("seoul");
  const [selectedCity, setSelectedCity] = useState("");

  // 행사 정보
  const [eventInfo, setEventInfo] = useState(""); // 행사 정보 상태 추가

  // 행사 참가비, 담당자 정보 상태 정의
  const [entryFee, setEntryFee] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const { registerEvent } = useAuth(); // AuthContext에서 registerEventStep12 함수 가져오기

  const [detailedLocation, setDetailedLocation] = useState("");

  // Level7 컴포넌트 내에서 모든 입력 요소들의 상태를 수집하여 addData 객체로 만듦
  const addData = {
    keywordName: selectedKeywords,
    eventName: eventName,
    description: eventIntroduction,
    city: selectedArea,
    addressLine: selectedCity,
    link: externalSiteUrl,
    eventContent: eventInfo,
    eventCost: entryFee,
    managerName: contactName,
    managerEmail: contactEmail,
    selectedMainImage: selectedMainImage,
    selectedEventInfoImage: selectedEventInfoImage,
    address: detailedLocation
  };

  // 버튼의 활성화 여부를 결정할 상태 추가
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // 함수 정의
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

  const removeCustomKeyword = (keywordToRemove) => {
    setSelectedKeywords((prevKeywords) =>
      prevKeywords.filter((kw) => kw !== keywordToRemove)
    );
    setCustomKeywords((prevCustomKeywords) =>
      prevCustomKeywords.filter((kw) => kw !== keywordToRemove)
    );
  };
  // 대표 이미지 파일 업로드 input에 대한 참조 생성
  const mainImageInputRef = useRef(null);

  // 대표이미지 파일 선택 시 실행될 함수
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0]; // 선택된 파일 가져오기
    setSelectedMainImage(file); // 선택된 파일 상태 업데이트
  };

  // 대표이미지 업로드 버튼 클릭 시 실행될 함수
  const handleMainImageUploadButtonClick = () => {
    mainImageInputRef.current.click();
  };
  // 행사정보이미지 파일 업로드 input에 대한 참조 생성
  const eventInfoImageInputRef = useRef(null);

  // 행사정보이미지 파일 선택 시 실행될 함수
  const handleEventInfoImageUpload = (e) => {
    const file = e.target.files[0]; // 선택된 파일 가져오기
    setSelectedEventInfoImage(file); // 선택된 파일 상태 업데이트
  };

  // 행사정보이미지 업로드 버튼 클릭 시 실행될 함수
  const handleEventInfoImageUploadButtonClick = () => {
    eventInfoImageInputRef.current.click();
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

  // 버튼 클릭 시 행사 등록 함수 호출
  const handleEventRegistration = () => {
    // 로컬 스토리지에서 category 값 가져오기
    const storedCategory = localStorage.getItem("category");

    // 만약 category 값이 "기타"라면 customEventType 값을 가져옴
    let categoryValue = storedCategory;
    let value = storedCategory;
    if (storedCategory === "기타") {
      const storedCustomEventType = localStorage.getItem("customEventType");
      console.log("사용자 정의 이벤트 유형:", storedCustomEventType);
      categoryValue = storedCustomEventType; // "기타"일 경우 customEventType 값을 categoryValue에 할당
      value = storedCustomEventType;
    }

    // 로그 출력
    console.log("저장된 카테고리 값:", storedCategory);
    console.log("최종 카테고리 값:", categoryValue);

    // addData 객체에 category 값을 설정
    const updatedAddData = {
      ...addData,
      category: value
    };

    // 로그 출력
    console.log("업데이트된 추가 데이터:", updatedAddData);

    // registerEvent 함수를 호출하고 updatedAddData 객체를 전달
    registerEvent(updatedAddData);
  };

  // 모든 요소가 입력되었는지 확인하는 함수 정의
  const checkAllInputsFilled = () => {
    // 필수 입력 요소의 상태를 모두 검사하여 빈 문자열인지 여부를 확인
    const isEventNameFilled = eventName.trim() !== "";
    const isEventIntroductionFilled = eventIntroduction.trim() !== ""; // 간단 소개 입력 여부 확인
    const isEventInfoFilled = eventInfo.trim() !== "";
    const isEntryFeeFilled = entryFee.trim() !== "";
    const isContactNameFilled = contactName.trim() !== "";
    const isContactEmailFilled = contactEmail.trim() !== "";
    const isMainImageUploaded = selectedMainImage !== null; // 대표이미지 업로드 여부 확인

    // 모든 필수 입력 요소가 채워져 있으면 버튼을 활성화하고,
    // 하나라도 비어 있으면 버튼을 비활성화
    setIsButtonEnabled(
      isEventNameFilled &&
        isEventIntroductionFilled && // 간단 소개 입력 여부 추가
        isEventInfoFilled &&
        isEntryFeeFilled &&
        isContactNameFilled &&
        isContactEmailFilled &&
        isMainImageUploaded // 대표이미지가 업로드되었는지 여부 추가
    );
  };
  // useEffect를 사용하여 모든 입력 요소의 상태 변화를 감지하고,
  // 상태가 변경될 때마다 모든 요소가 입력되었는지 확인하는 함수를 호출합니다.
  useEffect(() => {
    checkAllInputsFilled();
  }, [
    eventName,
    eventIntroduction, // 간단 소개 상태 추가
    eventInfo,
    entryFee,
    contactName,
    contactEmail,
    selectedMainImage
  ]);
  return (
    <Level7Container>
      <PurpleTitle>기본설정</PurpleTitle>
      <SubTitle>행사에 대한 기본설정이에요.</SubTitle>
      <HL />
      <Title>모집기간</Title>
      <Term>
        <StartDate>
          시작일
          <StartCalendar />
          <Clock />
        </StartDate>
        <EndDate>
          마감일
          <EndCalendar />
          <Clock />
        </EndDate>
      </Term>
      <PurpleTitle>행사 상세 정보</PurpleTitle>
      <SubTitle>행사에 대해 자세히 설명해주세요!</SubTitle>
      <HL />
      {/* 추가: 커리어 키워드 입력 부분입니다. */}
      <Title>행사분야</Title>
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
        <AddOther
          type="text"
          placeholder="기타 키워드 추가"
          value={customKeyword}
          onChange={(e) => setCustomKeyword(e.target.value)}
        />

        {/* 기타 키워드 추가 버튼 */}
        <AddOtherButton onClick={addCustomKeyword}>추가</AddOtherButton>

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
      <Title>행사명</Title>
      {/* 행사명 입력 부분을 컴포넌트로 교체 */}
      <InputFestivalName
        placeholder="행사명을 입력하세요"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <Title>간단 소개</Title>
      {/* 간단 소개 입력 부분을 컴포넌트로 교체 */}
      <InputIntroduce
        placeholder="간단소개 입력 (최대 30자)"
        value={eventIntroduction} // 간단 소개 상태 값으로 변경
        onChange={(e) => setEventIntroduction(e.target.value)}
      />
      <Title>행사 위치</Title>
      {/* 관심지역 컴포넌트 */}
      <InterestArea
        selectedArea={selectedArea}
        handleAreaSelect={handleAreaSelect}
        selectedCity={selectedCity}
        handleCitySelect={handleCitySelect}
        isModalOpen={isModalOpen}
        handleModalToggle={handleModalToggle}
        closeModal={closeModal}
        buttonText="행사위치 선택"
      />
      <DetailedLocationInput
        type="text"
        placeholder="자세한 위치를 입력하세요"
        value={detailedLocation}
        onChange={(e) => setDetailedLocation(e.target.value)}
      />
      <Title>대표이미지</Title>
      <TitleImage>
        <ImageAddButton2 onClick={handleMainImageUploadButtonClick}>
          <ImageIcon src={imageIcon} alt="이미지 첨부 아이콘" />
          <span>이미지 추가</span>
        </ImageAddButton2>

        {/* 대표 이미지 파일 업로드 input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageUpload}
          style={{ display: "none" }} // 화면에 보이지 않도록 스타일 지정
          ref={mainImageInputRef} // ref 연결
        />

        {/* 대표 이미지 파일 미리보기를 위한 img 요소 */}
        {selectedMainImage && (
          <div>
            <img
              src={URL.createObjectURL(selectedMainImage)}
              alt="대표 이미지"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                marginLeft: "10vw"
              }} // 이미지 크기 조절 스타일 추가
            />
          </div>
        )}
      </TitleImage>
      <Title>행사 일정</Title>
      <Term>
        <StartDate>
          시작일
          <StartCalendar />
          <Clock />
        </StartDate>
        <EndDate>
          마감일
          <EndCalendar />
          <Clock />
        </EndDate>
      </Term>

      <Title>행사 신청 외부사이트</Title>
      <AddURL
        type="url"
        placeholder="URL을 입력하세요"
        value={externalSiteUrl}
        onChange={(e) => setExternalSiteUrl(e.target.value)}
      />
      <Title>행사 정보</Title>
      {/* 행사 정보 입력 부분 */}
      <FestivalInformation>
        <FestivalInformationInput
          placeholder="행사에 대한 정보를 최대 5000자까지 입력하세요."
          value={eventInfo}
          onChange={(e) => setEventInfo(e.target.value)}
        />
        {/* 행사정보이미지 업로드 input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleEventInfoImageUpload}
          style={{ display: "none" }} // 화면에 보이지 않도록 스타일 지정
          ref={eventInfoImageInputRef} // ref 연결
          id="event-info-image-upload-input" // id 추가
        />

        {/* AttachmentButton에 onClick 이벤트 핸들러 추가 */}
        <AttachmentButton>
          <ImageAddButton onClick={handleEventInfoImageUploadButtonClick}>
            <ImageIcon src={imageIcon} alt="행사 정보 이미지 첨부 아이콘" />
            <span>이미지 추가</span>
          </ImageAddButton>
          {/* 선택된 이미지 파일 이름 표시 */}
          {selectedEventInfoImage && <p>{selectedEventInfoImage.name}</p>}
          {/* 글자 입력 수 표시 */}
          <p>
            <span style={{ color: "#582fff" }}>{eventInfo.length}</span>/5000
            글자 입력됨
          </p>
        </AttachmentButton>
      </FestivalInformation>
      <Title>행사 참가비</Title>
      <FestivalFee
        type="text"
        placeholder="행사 참가비를 입력하세요"
        value={entryFee}
        onChange={(e) => setEntryFee(e.target.value)}
      />
      <h2>담당자 정보</h2>
      <Title>이름</Title>
      <ManagerName
        type="text"
        placeholder="담당자 이름을 입력하세요"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
      />

      <Title>이메일</Title>
      <ManagerEmail
        type="email"
        placeholder="담당자 이메일을 입력하세요"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
      />
      {/* 버튼의 disabled 속성을 isButtonEnabled 상태에 바인딩하여 활성화 여부를
      조절합니다. */}
      <Link to="/organization-mypage">
        <NextButton
          onClick={handleEventRegistration}
          disabled={!isButtonEnabled}
        >
          행사개설
        </NextButton>
      </Link>
    </Level7Container>
  );
};

export default Level7;
