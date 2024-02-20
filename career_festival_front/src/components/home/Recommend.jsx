// src/components/home/Recommend.jsx
import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import emptyStarIcon from "../../assets/images/emptyStarIcon.png";

/* 전체 틀
적용되는 페이지에 따라 사이즈가 다르게 들어가도록 함
따라서 해당 컴포넌트 사용시, 컴포넌트가 들어가는 컨테이너의 크기를 vw 단위로 맞추고
그리드의 가로폭 크기도 vw단위로 고정할것
*/
const RecommendCardcontainer = styled.div`
  //border: solid red;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

//행사 이미지 (600*400또는 6:4비율로 받을 것)
const RecommendMainImgWrapper = styled.div`
  //border: solid green;
  border-radius: 10%;
  width: 100%;
  height: 0;
  padding-bottom: 66.6667%; /* 400 / 600 * 100% */
  position: relative;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

//행사 이름
const RecommendTitleWrapper = styled.div`
  //border: solid green;
  width: 100%;
  padding: 0.7em 0;
  overflow: hidden;
  text-overflow: ellipsis;
  //word-break: break-all;

  font-size: 1.2em;
  font-weight: 700;
`;

//행사 정보: 제목 하단 전체
const RecommendInfoWrapper = styled.div`
  //border: solid green;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

//행사 시간, 즐겨찾기 라인
const RecommandDetailWrapper = styled.div`
  //border: solid skyblue;
  width: 80%;
  display: block;
  font-size: 1em;
  font-weight: 500;
`;

//행사 시간
const RecommendTimeInfoWrapper = styled.div`
  //border: solid yellow;
  width: 100%;
  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

// 즐겨찾기, 가격
const RecommendIconWapper = styled.div`
  //border: solid yellow;

  display: flex;
  flex-direction: row;
  align-content: center;
  padding-top: 0.7em;

  color: #582fff;
  font-weight: 700;
`;

//즐겨찾기 아이콘
const StarIcon = styled.img`
  width: 1.3em;
  height: 1.3em;
  margin-right: 0.5rem;
  align-self: center;
`;

// 주최자 프로필 이미지 (400*400 또는 1:1 비율로 고정되서 받을 것)
const RecommendOrganizerImgWrapper = styled.div`
  //border: solid skyblue;
  width: 20%;
  aspect-ratio: 1/1;

  img {
    width: 100%;
    border-radius: 50%;
  }
`;
//행사 상세페이지 가는 버튼 링크
const StyledLink = styled(Link)`
  text-decoration: none; // 밑줄 제거
  color: #000000;
  // 여기에 추가적인 스타일을 적용할 수 있습니다.
`;

const Recommend = ({
  eventMainFileUrl,
  eventName,
  recruitmentStart,
  recruitmentEnd,
  isLiked,
  eventCost,
  organizerProfileUrl,
  eventId,
}) => {
  return (

    <StyledLink to={`/event/${eventId}`}> 
      {" "}
      {/* 지금은 영상을 찍기 위함 */}

      <RecommendCardcontainer>
        <RecommendMainImgWrapper>
          <img src={eventMainFileUrl} alt="행사 이미지" />
        </RecommendMainImgWrapper>

        <RecommendTitleWrapper title={eventName}>
          {eventName}
        </RecommendTitleWrapper>

        <RecommendInfoWrapper>
          <RecommandDetailWrapper>
            <RecommendTimeInfoWrapper>
              <div title={recruitmentStart}>{recruitmentStart} 부터</div>
              <div title={recruitmentEnd}>{recruitmentEnd} 까지</div>
            </RecommendTimeInfoWrapper>

            <RecommendIconWapper>
              <div>
                <StarIcon src={emptyStarIcon} alt="저장" />{" "}
                {/*백엔드에서 나오면 바꾸기*/}{" "}
              </div>
              <div>{eventCost}</div>
            </RecommendIconWapper>
          </RecommandDetailWrapper>

          <RecommendOrganizerImgWrapper>
            <img src={organizerProfileUrl} alt="주최자 이미지" />
          </RecommendOrganizerImgWrapper>
        </RecommendInfoWrapper>
      </RecommendCardcontainer>
    </StyledLink>
  );
};

export default Recommend;
