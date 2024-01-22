import styled from "styled-components";

const DetailContainer = styled.div`
  width: 808px;
  backgroud: green;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 471px;
  background: #d9d9d9;
`;

const Menu = styled.div`
  width: 100%;
  height: 10px; //임시
  background: red;
  margin: 54px 0 19px 0;
`;

const HorizontalDivider = styled.div`
  width: 100%;
  height: 2px;
  background: #d9d9d9;
  margin: 19px 0 29px 0; //임시
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 50px; //임시
  background: red; //임시
  margin: 27px 0 28px 0;
`;

const FileContainer = styled.div`
  width: 100%;
  height: 50px; //임시
  background: red;
  margin: 56px 0 56px 0;
`;

const PlaceContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 65px 0 50px 0;
  display: block;
`;

const NoticeContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 50px 0 56px 0;
  display: block;
`;

const NoticeContent = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(88.35, 46.69, 255, 0.17);

  margin: 15px 0 0 0;
  padding: 33px 0 29px 0;

  text-align: center;
  display: block;

  color: #838383;
  font-size: 15px;
  font-family: "Noto Sans KR";
  font-weight: 500;
  word-wrap: break-word;
`;

const Subtitle = styled.div`
  color: black;
  font-size: 20px;
  font-family: "Noto Sans KR";
  font-weight: 500;
  word-wrap: break-word;
`;

export {
  DetailContainer,
  Thumbnail,
  Menu,
  HorizontalDivider,
  InfoContainer,
  FileContainer,
  PlaceContainer,
  NoticeContainer,
  NoticeContent,
  Subtitle,
};
