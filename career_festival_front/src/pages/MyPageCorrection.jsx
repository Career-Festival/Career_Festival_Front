import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'
import  "../db/organizationsData.json"
import dummy from "../db/RecommendedEvents.json"
import Recommend from '../components/home/Recommend'
import MypageProfileCorrection from '../components/mypage/MypageProfileCorrection'



//전체 페이지
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3vw 15vw;
    gap: 3vw;
`

//마이페이지 프로필
const MypageProfileContainer = styled.div`
  //background-color: aliceblue;
  border-radius: 12px;
  box-shadow: 0 4px 4px 0 rgb(0, 0, 0, 0.25);
  padding: 5vw 7vw 5vw 7vw;
`

// 나누기 선
const HorizontalDivider = styled.div`
  width: 100%;
  height: 0.01vw;
  background: #d9d9d9;
  margin: 4vw 0 4vw 0;
`



const MypageButtonContainer = styled(Link)`
  //background-color: aliceblue;
  margin: 0 auto;
`


//수정하기 버튼
const CorrectionButton = styled.button`
  width: 14vw;
  height: 3vw;
  font-size: 1rem;
  font-weight: 700;
  color: #ffff;
  background-color: #582FFF;
  border-radius: 10px;
  border: none;

  @media screen and (max-width: 600px) {
        font-size: 2vw;
        }

`



//행사 리스트
const FestivalListContainer = styled.div`
    //background-color: beige;
    width: 100%;
    gap: 1vw;
    margin: 5vw 0;
`

//안내 문구, 버튼
const FestivalListTitle = styled.div`
    display: flex;
    flex-direction: row;
    h4{
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0 0 1vw 0;

        @media screen and (max-width: 600px) {
        font-size: 2.4vw;
        }

    }
`


const InterestFestivalListWrapper = styled.div`
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

const DeterminedFestivalListWrapper = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  grid-template-columns: repeat(4, 16vw);
  gap: 2vw;
  font-size: 0.9rem;
  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`






const MyPageCorrection = (props) => {
  

  return (
    
    <InfoContainer>
      <MypageProfileContainer>
        <MypageProfileCorrection/>
        <HorizontalDivider/>
      </MypageProfileContainer>

      <MypageButtonContainer link to = "/mypage">
        <CorrectionButton>수정완료</CorrectionButton>
      </MypageButtonContainer>


      {/* <FestivalListContainer>
          <FestivalListTitle>
                  <h4>내가 관심있는 행사</h4>
          </FestivalListTitle>

          <InterestFestivalListWrapper>
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
          </InterestFestivalListWrapper>
      </FestivalListContainer>


      <FestivalListContainer>
          <FestivalListTitle>
                  <h4>내가 참석 확정한 행사</h4>
          </FestivalListTitle>

          <DeterminedFestivalListWrapper>
              {dummy.RecommendedByPerson.slice(0, 4).map((item) => (
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
          </DeterminedFestivalListWrapper>
      </FestivalListContainer> */}
  </InfoContainer>  
  )
};

export default MyPageCorrection;
