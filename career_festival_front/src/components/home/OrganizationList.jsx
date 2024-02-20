import React from 'react';
import styled from 'styled-components';
import  '../../db/organizationsData.json';
import { useNavigate } from 'react-router-dom';

const OrganizationBox = styled.div`
  border-radius: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  gap: 1vw;
  padding: 1vw;
  background-color: white;
  box-shadow: 0 4px 4px 0 rgb(0, 0, 0, 0.25);
`;


const OrganizationProfileImg = styled.div`
  //border: 1px solid red;
  //width: 100%;
  //height: 50%;
  display: flex;
  flex-direction: column;

  img{
    width: 50%;
    border-radius: 50%;
    align-self: center;
  }
  
`
const OrganizationInfo = styled.div`
  //border: 1px solid red;
  // position: relative;
  // display: flex;
  // flex-direction: column;
  text-align: center;
  font-weight: bold;
`;

const OrganizationNameWrapper = styled.div`
  //border: 1px solid red;
  font-size: 1rem;
  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
`;
const UploadedNumberWrapper = styled.div`
  //border: 1px solid red;

  margin-top: 1vw;
  color: #838383;
  font-size: 1vw;
  span {
    color: #582fff;
    font-size: 1vw;
  }
`;


const SubscribeButtonWrapper = styled.div`
  //border: 1px solid red;

  width: 100%;
  height: 20%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    font-size:1vw;
    margin: 0 0.5vw auto;
    padding: 0.5vw;
    border-radius: 5px;
    border: none;
    background-color: #582fff;
    color: #ffff;
    cursor: pointer; // 커서를 손가락 모양으로 변경
    transition: background-color 0.3s; // 호버 효과
    &:hover {
      background-color: #401f80; // 호버 시 배경색 변경
    }
  }
`;

const OrganizationList = (props) => {

  const navigate = useNavigate();

    const onClickOrganizationProfile = () => {
      // navigate(`/organizationinfo/${props.OrganizationName}`, {
      //   state: props,
      // });
     alert("정보를 준비중입니다!!");
    };

  return (
    <OrganizationBox onClick={onClickOrganizationProfile}>
      <OrganizationProfileImg>
        <img src={props.organizerProfileFileUrl} alt="주최자 이미지" />
      </OrganizationProfileImg>

      <OrganizationInfo>
        <OrganizationNameWrapper title={props.organizerName}>
          {props.organizerName.length > 10
            ? `${props.organizerName.slice(0, 10)}...`
            : props.organizerName}
        </OrganizationNameWrapper>

        <UploadedNumberWrapper>
          <span>{props.countEvent}</span>개의 행사
        </UploadedNumberWrapper>
      </OrganizationInfo>
      <SubscribeButtonWrapper>
        <button>구독하기</button>
      </SubscribeButtonWrapper>
    </OrganizationBox>
  );
};

export default OrganizationList;