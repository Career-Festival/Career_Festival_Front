// src/components/login/LoginStyle.jsx
import styled from "styled-components";
import { Link } from "react-router-dom"; // Link 추가

// 로그인 컨테이너 스타일
const LoginContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;

  img {
    max-width: 150%; // 이미지의 최대 너비를 100%로 설정
    height: auto; // 비율에 맞게 자동으로 높이 조절
    display: block; // 인라인 요소에서 블록 요소로 변경
    margin: 0 auto; // 가운데 정렬
    margin-bottom: 30px;
    margin-left: -25%; // 이미지를 왼쪽으로 이동하여 가운데 정렬
  }
`;

// 입력 필드 관련 스타일
const Field = styled.div`
  position: relative;
  margin-top: 30px;
`;

// 환영 메시지 스타일
const Welcome = styled.div`
  width: 200%;
  margin-bottom: 50px;
  margin-left: -50%;
  font-family: 'Your Desired Font', sans-serif;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
`;

// SNS 텍스트 스타일
const SocialText = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

// SNS 로그인 버튼 컨테이너 스타일
const SocialButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    height: auto;
    margin: 0 5px;
    border-radius: 40px;
  }
`;

// 입력 필드 스타일
const InputField = styled.input`
  width: 93.5%;
  padding: 9px;
  margin-bottom: 10px;
  color: #565656;
  background: none;
  border: 2px solid #030104;
  border-radius: 5px;

  &:focus {
    + label {
      transform: translate(0.625rem, -1rem);
      border-color: #030104;
    }
  }
`;

// 입력 필드 레이블 스타일
const Label = styled.label`
  position: absolute;
  top: -0.5rem;
  left: -0.25rem;
  transform: translate(0.625rem, 0.625rem);
  color: #030104;
  background-color: #ffffff;
  padding-inline: 0.25rem;
  border: 2px solid transparent;
  pointer-events: none;
  transition: transform 250ms, background-color 250ms, border-color 250ms;
`;

// 일반 버튼 스타일
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #582fff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 40px;
  &:hover {
    background-color: #401f91;
  }
`;

// 회원가입 버튼 스타일
const SignupButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #582fff;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 50px;
  cursor: pointer;

  &:hover {
    background-color: #401f91;
  }
`;

const RememberMe = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: calc(50% + 60px); // 로그인 인풋의 중간에 위치
  margin-top:5px;
  input {
    margin-right: 5px;
  }

  label {
    font-size: 14px;
  }
`;

const PasswordReset = styled(Link)`
  font-size: 14px;
  position: absolute;
  margin-top: 15px;
  display: block;
  text-align: right; // 왼쪽 정렬로 수정
  left: calc(50% + 70px); // 로그인 인풋의 중간에 위치
  transform: translateY(-50%); // 중간 정렬
  text-decoration: none;
  color: #565656;
`;

export {
  LoginContainer,
  Field,
  InputField,
  Label,
  Button,
  SignupButton,
  Welcome,
  SocialText,
  SocialButtonContainer,
  RememberMe,
  PasswordReset,
};