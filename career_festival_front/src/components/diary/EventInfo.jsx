// EventInfo.jsx
import React, { useState } from "react";
import styled, { css } from "styled-components";
import Calendar from "./Calendar";
import { useRef } from "react";


const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  margin-top: 2.7vw;
`;

const TitleText = styled.div`
  color: black;
  font-size: 1.4vw;
  font-family: "Noto Sans KR";
  font-weight: 700;
  // word-wrap: break-word;
`;

const TextInput = styled.input`
  width: 100%;
  height: auto;
  color: #838383;
  font-size: 1vw;
  font-family: "Noto Sans KR";
  //font-weight: 400;
  word-wrap: break-word;
  border-radius: 0.6vw;
  border: 0.1vw #838383 solid;
  margin-top: 1.2vw;
  padding: 1vw 0 1vw 1vw;

  &::placeholder {
    color: #838383;
    font-size: 1vw;
    font-family: "Noto Sans KR";
    font-weight: 400;
  }
`;

const KeywordOptionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;
  margin-top: 1vw;
  input {
    font-size: 1vw;
    padding: 0.5vw;
    cursor: pointer;
    background: #ffffff;
    color: #838383;
    border-radius: 2vw;
    border: 0.1vw solid #838383;
  }
  button {
    font-size: 1vw;
  }
`;

const KeywordButton = styled.button`
  font-size: 1vw;
  padding: 0.5vw;
  cursor: pointer;
  background: #ffffff;
  color: #838383;
  border-radius: 2vw;
  border: 0.1vw solid #838383;

  ${(props) =>
    props.selected &&
    css`
      border: 2px solid #582fff;
      color: #582fff;
    `};

  &:hover {
    color: #582fff;
  }
`;


const InputBox = styled.div`
  margin-top: 1vw;
  width: 100%;
  height: auto;
  fill: var(--black-white-white-1000, #fff);
  stroke-width: 0.1vw;
  stroke: var(--Gray-Gray-50, #fafafa);
`;

const Writing = styled.div`
  height: 3.65vw;
  background: var(--Gray-Gray-100, #f2f2f2);
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 1vw;
`;

const Imageplus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1vw;
  margin-left: 0.75vw;
`;

const ImageP = styled.p`
  color: var(--Gray-Gray-700, #464a4d);

  /* Body/Body_small/medium */
  font-family: Pretendard;
  font-size: 0.6vw;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 18px */
  letter-spacing: -0.36px;
`;

const BoldText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: Roboto;
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 166.667% */
`;

const ItalicText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: "Roboto Serif";
  font-size: 1vw;
  font-style: italic;
  font-weight: 400;
  line-height: normal;
`;

const UnderlineText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: "Roboto Serif";
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
`;

const MidlineText = styled.p`
  color: var(--Gray-Gray-900, #17191a);
  font-family: "Roboto Serif";
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: strikethrough;
`;

const InputContent = styled.div`
  width: 100%;
  height: 78%;
  flex-shrink: 0;
  min-height: 20vw;
  flex-grow: 1;
  color: var(--Gray-Gray-500, #9e9e9e);
  font-family: Pretendard;
  font-size: 0.75vw;
  font-style: normal;
  font-weight: 500;
  line-height: 1.2vw;
  padding: 1.5vw; /* 내부 패딩 추가 */
  border: 0.1vw solid #fafafa;
  outline: none; /* 포커스 시 아웃라인 제거 */

  ${({ isBold }) =>
    isBold &&
    css`
      font-weight: bold;
    `}
  ${({ isItalic }) =>
    isItalic &&
    css`
      font-style: italic;
    `}
  ${({ isUnderline }) =>
    isUnderline &&
    css`
      text-decoration: underline;
    `}
  ${({ isStrikethrough }) =>
    isStrikethrough &&
    css`
      text-decoration: line-through;
    `}
`;

const EventInfo = ({ onInfoComplete }) => {
  const [eventName, setEventName] = useState("");
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleInputChange = (inputType, value) => {
    switch (inputType) {
      case "eventName":
        setEventName(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "eventDate":
        setEventDate(value);
        break;
      case "keywords":
        setKeywords(value);
        break;
      default:
        break;
    }
  };


  const checkInfoComplete = () => {
    return eventName && title && eventDate && keywords;
  };

  const handleBlur = () => {
    const isComplete = checkInfoComplete();
    onInfoComplete(isComplete);
  };

   const [selectedKeywords, setSelectedKeywords] = useState([]); // 추가: 선택된 키워드 상태
   // 기타 키워드 입력을 위한 상태 추가
   const [customKeyword, setCustomKeyword] = useState("");
   const [customKeywords, setCustomKeywords] = useState([]);

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
         customKeyword,
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

    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);

    const toggleBold = () => setIsBold(!isBold);
    const toggleItalic = () => setIsItalic(!isItalic);
    const toggleUnderline = () => setIsUnderline(!isUnderline);
  const toggleStrikethrough = () => setIsStrikethrough(!isStrikethrough);
  

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file && file.type.substr(0, 5) === "image") {
        setImageFile(file);
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = "50%";
        contentEditableRef.current.appendChild(img);
      }
  };
  
    const [imageFile, setImageFile] = useState(null);

  
   const [selectedImage, setSelectedImage] = useState(null);
   const fileInputRef = useRef(null);
   const contentEditableRef = useRef(null);

   const triggerFileInput = () => {
     fileInputRef.current.click();
   };



  return (
    <InfoContainer>
      <InputContainer>
        <TitleText>행사 정보</TitleText>
        <TextInput
          placeholder="행사명을 입력해주세요."
          onChange={(e) => handleInputChange("eventName", e.target.value)}
          onBlur={handleBlur}
        />
        <TextInput
          placeholder="글의 제목을 입력해주세요."
          onChange={(e) => handleInputChange("title", e.target.value)}
          onBlur={handleBlur}
        />
      </InputContainer>

      <InputContainer>
        <TitleText>행사 일자</TitleText>
        <Calendar />
      </InputContainer>

      <InputContainer>
        <TitleText>행사 커리어 키워드</TitleText>
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
            "관광/여행",
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
        </KeywordOptionList>
      </InputContainer>
      <InputContainer>
        <TitleText>행사 일기</TitleText>
        <InputBox>
          <Writing>
            <Imageplus onClick={triggerFileInput}>
              <img
                src={Image}
                alt="사진 추가"
                style={{ width: "1.2vw", height: "1.2vw" }}
              />
              <ImageP>이미지추가</ImageP>
            </Imageplus>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              accept="image/*"
            />

            <BoldText onClick={toggleBold}>Bold</BoldText>
            <ItalicText onClick={toggleItalic}>Italic</ItalicText>
            <UnderlineText onClick={toggleUnderline}>Underline</UnderlineText>
            <MidlineText onClick={toggleStrikethrough}>Midline</MidlineText>
          </Writing>

          <InputContent
            ref={contentEditableRef}
            contentEditable
            placeholder="내용을 입력하세요."
            isBold={isBold}
            isItalic={isItalic}
            isUnderline={isUnderline}
            isStrikethrough={isStrikethrough}
          />
        </InputBox>
      </InputContainer>
    </InfoContainer>
  );
};

export default EventInfo;
