import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import search from "../../assets/images/search.png";
import setting from "../../assets/images/setting.png";

// 헤더 컨테이너 스타일
const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0 0.3vw 0.3vw rgba(0, 0, 0, 0.25);
  margin: 2vw 0 0.5vw 0;
`;

// 로고와 검색창을 포함한 컨테이너 스타일
const LogoSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  margin-bottom: 1vw;
  //margin-right: 3vw;
`;

// 로고 이미지 스타일
const LogoImage = styled.img`
  width: 18vw;
  cursor: pointer;
  padding: 1vw;
`;

// 검색 아이콘 스타일
const SearchImage = styled.img`
  width: 1.3%;
  //height: 1vw;
  margin-left: 1vw;
  position: absolute;
`;

// 검색 아이콘과 검색 입력창을 포함하는 컨테이너 스타일
const SearchItem = styled.div`
  //width: 40%;
  display: flex;
  align-items: center;
  color: #582fff;
`;

// 검색 입력창 스타일
const SearchInput = styled.input`
  // width: 50%;
  border: 0.2vw solid #582fff;
  border-radius: 0.5vw;
  padding: 0.7vw 15vw 0.7vw 2.7vw;
  font-size: 0.8vw;
  outline: none;
`;

// 검색 버튼 스타일
const SearchButton = styled.button`
  background-color: #582fff;
  color: #ffffff;
  border: none #582fff;
  border-radius: 0.5vw;
  padding: 0.7vw 1vw;
  font-size: 0.8vw;
  cursor: pointer;
  margin-left: 1vw;

  &:hover {
    background-color: #838383;
  }
`;

// 로그인과 회원가입을 포함하는 컨테이너 스타일
const AuthButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5vw;
`;

// 로그인, 회원가입 버튼 스타일
const Join = styled(Link)`
  background-color: #ffffff;
  color: #838383;
  font-weight: bold;
  font-size: 0.8vw;
  padding: 1vw 0 0.5vw 3vw;
  text-decoration: none;

  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const TextContiner = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5vw;
  font-size: 0.9vw;
`;

// 환경설정 아이콘 스타일
const SettingImage = styled.img`
  width: 1vw;
  height: 1vw;
`;

// 링크 목록을 포함하는 컨테이너 스타일
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 16vw;
  padding: 0.7vw;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    font-size: 0.8vw;
  }
`;

// 각각의 링크 아이템 스타일
const LinkItem = styled(Link)`
  color: #838383;
  text-decoration: none;
  font-weight: bold;
  margin-right: 5vw;
  font-size: 0.8vw;
  transition: color 0.3s; /* 색상 변화에 대한 트랜지션 효과 추가 */

  &:hover {
    color: #582fff;
  }
`;

// 행사등록하기 링크 스타일
const RegisterItem = styled(Link)`
  color: #582fff;
  text-decoration: none;
  font-weight: bold;
  margin-left: 23vw;
  margin-right: 1vw;
  border: none;

  &:hover {
    color: #838383;
  }
`;

// 환영 메시지 스타일
const WelcomeText = styled.span`
  color: #582fff;
  margin-left: 1vw;
`;

// 라인 1
const Line = styled.div`
  margin-top: -1vw;
  width: 100%;
  height: 0.1vw;
  background-color: #d9d9d9;
`;

const VerticalLine = styled.div`
  width: 0.1vw;
  height: 1.5vw;
  background-color: #d9d9d9;
`;

const Header = () => {
  // 검색어
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn, user, logout, fetchMypageInfo } = useAuth(); // useAuth 훅을 통해 isLoggedIn, user 사용

  // 검색어 변경 핸들러
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 버튼 클릭 핸들러
  const handleSearchButtonClick = () => {
    // 여기에서 검색 버튼이 클릭되었을 때 수행할 동작을 추가
    // 예를 들면 검색 결과를 가져오거나 페이지를 이동하는 등의 동작
    console.log("검색어:", searchTerm);

    // 실제 검색 결과가 없을 경우 처리
    const searchResultExists = false;

    // 검색 결과가 없는 경우 메시지를 출력
    if (!searchResultExists) {
      alert("찾는 정보가 없습니다.");
    }
  };

  // 마이페이지 버튼 클릭 시 fetchMypageInfo 함수 호출 및 2초 대기 설정
  const handleMypageButtonClick = () => {
    fetchMypageInfo(); // fetchMypageInfo 함수 호출
  };

  // 로그인 정보 확인 및 로그 출력
  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("user 정보:", user);
  }, [isLoggedIn, user]);

  return (
    <HeaderContainer>
      <LogoSearchContainer>
        <Link to="/">
          <LogoImage src={logo} alt="logo" />
        </Link>
        <SearchItem>
          <SearchImage src={search} alt="search" />
          <SearchInput
            onChange={handleSearchTermChange}
            value={searchTerm}
            placeholder="2024년도 취업 세미나"
          />
          <SearchButton onClick={handleSearchButtonClick}>검색</SearchButton>
        </SearchItem>
        <AuthButtonsContainer>
          <Join
            to={isLoggedIn ? "/" : "/login"}
            onClick={() => {
              if (isLoggedIn) {
                const confirmLogout = window.confirm("로그아웃하시겠습니까?");
                if (confirmLogout) {
                  logout();
                }
              }
            }}
          >
            {isLoggedIn ? "로그아웃" : "로그인"}
          </Join>

          <Join to={isLoggedIn ? "/settingpage" : "/join"}>
            {isLoggedIn ? (
              <SettingImage src={setting} alt="setting" />
            ) : (
              "회원가입"
            )}
          </Join>
        </AuthButtonsContainer>
      </LogoSearchContainer>
      <Line />
      <LinkContainer>
        <LinkItem to="/festival-list">행사목록</LinkItem>
        <LinkItem to="/diary" onClick={handleMypageButtonClick}>기록장</LinkItem>
        {/* 마이페이지 버튼 */}
        <LinkItem to="/mypage" onClick={handleMypageButtonClick}>
          마이페이지
        </LinkItem>
        <TextContiner>
          <RegisterItem to="/register/level1">행사개설하기</RegisterItem>
          {/* <RegisterItem to="/register/level1">행사개설하기</RegisterItem> 
            해당 ID에 주최자 페이지가 있다면
            level1말고 level6으로 이동해서 행사등록만하기
          */}
          <VerticalLine />
          <WelcomeText>
            {isLoggedIn
              ? `${user.userName} 님 환영합니다!`
              : "로그인 해주세요!"}
            {/* {isLoggedIn ? `${user} 님 환영합니다!` : "로그인 해주세요!"}/ */}
          </WelcomeText>
        </TextContiner>
      </LinkContainer>
    </HeaderContainer>
  );
};

export default Header;
