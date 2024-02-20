import React from "react";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Banner from "../components/home/Banner";
import Filter from "../components/home/Filter";
import Checkbox from "../components/home/Checkbox";
import InterestArea from "../components/signup/InterestArea";
import FilterKeyword from "../components/home/Filterkeyword";
import Recommend from "../components/home/Recommend";
import dummy from "../db/RecommendedEvents.json";
import { Link } from "react-router-dom";
import axios from "axios";

//페이징
import Pagination from "../components/home/Pagination";

//주최자
import organizationsData from "../db/organizationsData.json";
import OrganizationList from "../components/home/OrganizationList";
// import buttonLeft from "../assets/images/bannerleftarrow.png";
// import buttonRight from "../assets/images/bannerrightarrow.png";

// 중간 컨테이너에 대한 스타일링
const MiddleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3vw;
  padding: 4vw 0 2vw 0;
`;
// 필터 및 지역 컴포넌트를 담는 컨테이너에 대한 스타일링
const FilterAndAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;
`;

//필터
const FilterContainer = styled.div`
  width: 100%;
  color: #582fff;
  font-size: 1.2rem;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;
// 필터 초기화 버튼에 스타일을 적용한 컴포넌트
const StyledResetButton = styled.button`
  width: 100%;
  background-color: transparent;
  color: #838383;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 4vw;
  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
  &:hover {
    text-decoration: underline;
  }
`;
// 필터 단락에 대한 스타일링
const FilterP = styled.p`
  font-weight: bold;
  color: #000000;
`;

//지역
const AreaContainer = styled.div`
  //width: 100%;
  //color: #000000;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;
const Area = styled.div`
  width: 100%;
  margin-top: 1vw;
`;

//행사유형
const Eventtype = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #000000;
  margin-top: -1vw;
  font-size: 1rem;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;

// 행사 목록 컨테이너에 대한 스타일링
const Eventlist = styled.div``;

// 페스티벌 리스트 래퍼에 대한 스타일링
const FestivalListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 15vw);
  gap: 2vw;
  font-size: 0.9rem;
  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;

//키워드
const KeywordContainer = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 1.8vw;
  }
`;

// 하단-주최자
const LowerContaniner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f9f7ff;
  padding: 1vw 0 4vw 0;
`;

//주최자
const OrganizationListContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 1.3vw;
    font-weight: bold;
  }

  span {
    color: #582fff;
    font-size: 1.3vw;
  }
`;

const OrganizationslistWraper = styled.div`
  //width: 100%;
  margin: 0 auto;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

const OrganizationListBoxWrapper = styled.div`
  // 그리드
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3vw;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2vw;
`;

const Button = styled.button`
  background: transparent;
  color: #838383;
  border: none;
  cursor: pointer;
  font-size: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftButton = styled(Button)`
  margin-right: 10px;
`;

const RightButton = styled(Button)`
  margin-left: 10px;
`;

const FestivalListPage = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  //지역
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("seoul");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);

  // 행사 유형을 선택할 때 호출되는 함수입니다.
  const handleEventTypeSelect = (eventType) => {
    if (selectedEventTypes.includes(eventType)) {
      setSelectedEventTypes(
        selectedEventTypes.filter((type) => type !== eventType)
      );
    } else {
      setSelectedEventTypes([...selectedEventTypes, eventType]);
    }
  };

  // 선택된 필터를 제거하는 함수
  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  // 필터 초기화 함수
  const resetFilters = () => {
    setSelectedFilters([]);
    setSelectedArea("seoul");
    setSelectedCity("");
    setSelectedEventTypes([]);
  };

  //지역
  // useEffect를 사용하여 컴포넌트가 처음 마운트될 때 실행될 로직 추가
  useEffect(() => {
    // 초기값으로 서울을 선택하도록 설정
    handleAreaSelect("seoul");
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

  // 페이징 관련 state
  const itemsPerPage = 9; // 페이지당 보여줄 항목 수
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지에 해당하는 데이터를 반환하는 함수
  const getCurrentPageData = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const recommendedByPerson = dummy.RecommendedByPerson || [];
    return recommendedByPerson.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //주최자
  const organizationsList = organizationsData.OrganizationsList;
  const [startIndex, setStartIndex] = useState(0);

  // 주최자 목록에서 보여질 데이터 슬라이스를 계산합니다.
  const organizationsListSlice = organizationsList.slice(
    startIndex,
    startIndex + 4
  );

  // 오른쪽 버튼 클릭 시 다음 4개의 항목 데이터를 보여주는 함수
  const handleRightButtonClick = () => {
    if (startIndex + 4 < organizationsList.length) {
      setStartIndex(startIndex + 4);
    }
  };

  // 왼쪽 버튼 클릭 시 이전 4개의 항목 데이터를 보여주는 함수
  const handleLeftButtonClick = () => {
    if (startIndex - 4 >= 0) {
      setStartIndex(startIndex - 4);
    }
  };

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
  const [eventNames, setEventNames] = useState([]);
  const [eventViews, setEventViews] = useState([]);
  const [eventRegion, setEventRegion] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      //로그인이 안된 경우 (토큰, params 모두 null)
      try {

        // 모든 쿼리 매개변수가 null인 경우
        const response = await axios.get('http://localhost:9000/festival-list', {
          params: {
            category: null,
            keywordName: null,
            city: null,
            addressLine: null
          }
        });

        // eventViews datetime 변환 함수
        const modifiedEvent = (events) => {
          return events.map(event => ({
            ...event,
            recruitmentStart: formatDateTime(event.recruitmentStart),
            recruitmentEnd: formatDateTime(event.recruitmentEnd)
          }));
        };

        const modifiedEventViews = modifiedEvent(response.data.eventViews);
        setEventViews(modifiedEventViews);

        console.log('서버로부터 받은 데이터:', response.data);
        console.log(modifiedEventViews);
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
      }
    };

    // fetchData 함수 실행
    fetchData();

  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 함

  return (
    <div>
      {/* 상단 영역 */}
      <Banner />

      {/* 중간 영역 */}
      <MiddleContainer>
        {/* 필터, 지역, 행사유형 영역 */}
        <FilterAndAreaContainer>
          <FilterContainer>
            필터
            {/* 필터 초기화 버튼 */}
            <StyledResetButton onClick={resetFilters}>
              필터 초기화 ⟳
            </StyledResetButton>
            <FilterP>행사분야</FilterP>
            <Filter
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </FilterContainer>
          <AreaContainer>
            지역
            <Area>
              <InterestArea
                style={{}}
                selectedArea={selectedArea}
                handleAreaSelect={handleAreaSelect}
                selectedCity={selectedCity}
                handleCitySelect={handleCitySelect}
                isModalOpen={isModalOpen}
                handleModalToggle={handleModalToggle}
                closeModal={closeModal}
                buttonText="전체"
              />
            </Area>
          </AreaContainer>
          <Eventtype>
            행사유형
            <Checkbox
              selectedOptions={selectedEventTypes}
              handleOptionSelect={handleEventTypeSelect}
            />
          </Eventtype>
        </FilterAndAreaContainer>

        {/* 행사목록 영역 */}
        <Eventlist>
          <KeywordContainer>
            {eventViews.length} 개의 행사를 찾았어요!
          </KeywordContainer>
          <FilterKeyword
            selectedFilters={selectedFilters}
            removeFilter={removeFilter}
          />

          <FestivalListWrapper>
            {eventViews.map((item) => (
              <Recommend
                eventId={item.eventId}
                eventMainFileUrl={item.eventMainFileUrl}
                eventName={item.eventName}
                recruitmentStart={item.recruitmentStart}
                recruitmentEnd={item.recruitmentEnd}
                isLiked={item.isLiked}
                eventCost={item.eventCost}
                organizerProfileUrl={item.organizerProfileUrl}
              />
            ))}
          </FestivalListWrapper>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(eventViews.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </Eventlist>
      </MiddleContainer>
      <LowerContaniner>
        {/*주최자*/}
        <OrganizationListContainer>
          <span>인기 주최자가 궁금하세요?</span>
          <OrganizationslistWraper>
            <ButtonContainer>
              <LeftButton onClick={handleLeftButtonClick}>◁</LeftButton>
              <OrganizationListBoxWrapper>
                {organizationsListSlice.map((item) => {
                  return (
                    <OrganizationList
                      profile={item.profile}
                      OrganizationName={item.OrganizationName}
                      uploadedNumber={item.uploadedNumber}
                      subscribed={item.subscribed}
                      subscriberNumber={item.subscriberNumber}
                    />
                  );
                })}
              </OrganizationListBoxWrapper>
              <RightButton onClick={handleRightButtonClick}>▷</RightButton>
            </ButtonContainer>
          </OrganizationslistWraper>
        </OrganizationListContainer>
      </LowerContaniner>
    </div>
  );
};

export default FestivalListPage;
