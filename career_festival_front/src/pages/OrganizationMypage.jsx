import React from "react";
import styled from "styled-components";
import { Link, useLocation, useParams } from 'react-router-dom'
import  "../db/organizationsData.json"
import OrganizationInsight from '../components/organization/OrganizationInsight'
import dummy from "../db/RecommendedEvents.json"
import Recommend from '../components/home/Recommend'
import MypageProfile from '../components/mypage/MypageProfile'







//전체 페이지
const OrganizationInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3vw 15vw;
    gap: 3vw;
`

//주최자 마이페이지 프로필
const OrganizationMypageProfileContainer = styled.div`
  //background-color: aliceblue;
  border-radius: 12px;
  box-shadow: 0 4px 4px 0 rgb(0, 0, 0, 0.25);
  padding: 5vw 7vw 5vw 7vw;

`

const OrganizationMypageButtonContainer = styled(Link)`
  //background-color: aliceblue;
  margin: 0 auto;
`
const CorrectionButton = styled.button`
  width: 14vw;
  height: 3vw;
  font-size: 1rem;
  font-weight: 700;
  color: #ffff;
  background-color: #838383;
  border-radius: 10px;
  border: none;

`


//주최자 인사이트
const OrganizationInsightContainer = styled.div`
    //background-color: beige;
    width: 100%;

`


//행사 리스트
const OrganizationFestivalListContainer = styled.div`
    //background-color: beige;
    width: 100%;
    gap: 1vw;
`

//안내 문구, 버튼
const OrganizationFestivalListTop = styled.div`
    display: flex;
    flex-direction: row;
`

//안내 문구만
const OrganizationFestivalListDiv = styled.div`
     h4{
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0;

        @media screen and (max-width: 600px) {
        font-size: 2.4vw;
        }

    }

    h2{
        font-size: 1rem;
        font-weight: 400;
        margin: 0.5vw 0 1.5vw 0;

        @media screen and (max-width: 600px) {
        font-size: 2vw;
        }
    }
`

//다음 버튼 위치 지정
const NextLink = styled(Link)`
  position: absolute;
  right:15vw;
`
    

// 다음 버튼 스타일 정의
const NextButton = styled.button`
  padding: 1vw 4vw;
  font-size: 1rem;
  background-color: #582fff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;



const OrganizationFestivalListWrapper = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  grid-template-columns: repeat(3, 22vw);
  gap: 2vw;
  font-size: 0.9rem;
  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`





// 주최자 프로필 개설 페이지 컴포넌트
const OrganizationMypage = (props) => {
  //이 부분은 불필요 데이터 들어오면 수정
  const {OrganizationName} = useParams();
  const {state} = useLocation();
  console.log(OrganizationName);
  console.log(state);


  return (
    
    <OrganizationInfoContainer>
      <OrganizationMypageProfileContainer>
        <MypageProfile/>
      </OrganizationMypageProfileContainer>

      <OrganizationMypageButtonContainer Link to ="/organization-mypage-correction">
        <CorrectionButton>수정하기</CorrectionButton>
      </OrganizationMypageButtonContainer>

{/* 
       <OrganizationInsightContainer>
            <OrganizationInsight
                subscriberNumber = {props.subscriberNumber} //데이터 받아와야함
                uploadedNumber = {props.uploadedNumber} //데이터 받아와야함
            />
        </OrganizationInsightContainer> */}



        <OrganizationFestivalListContainer>
            <OrganizationFestivalListTop>
                <OrganizationFestivalListDiv>
                    <h4>행사목록</h4>
                    <h2>그동안 등록했던 행사들을 볼 수 있습니다.</h2>
                </OrganizationFestivalListDiv>
                <NextLink to="/register/Level6">
                    <NextButton>행사 개설하기</NextButton>
                </NextLink>
            </OrganizationFestivalListTop>


            {/* <OrganizationFestivalListWrapper>
                {dummy.RecommendedByPerson.slice(0, 3).map((item) => (
                <Recommend
                key={item.eventName}
                mainImg={item.mainImg}
                eventName={item.eventName}
                recruitmentStart={item.recruitmentStart}
                recruitmentEnd={item.recruitmentEnd}
                isLiked={item.isLiked}
                price={item.price}
                profile={item.profile}
              />
            ))}
            </OrganizationFestivalListWrapper> */}
        </OrganizationFestivalListContainer>
    </OrganizationInfoContainer>  
  )
};

export default OrganizationMypage;
