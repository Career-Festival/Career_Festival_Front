import React, { useState } from "react";
import styled from "styled-components";

const PickContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vw;
  @media screen and (max-width: 600px) {
    font-size: 1vw;
  }
`;

const PickLabel = styled.label`
  margin-right: 1vw;
`;

const Pick = () => {
  const [selectedOption, setSelectedOption] = useState("seminar");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <PickContainer>
      <PickLabel>
        <input
          type="radio"
          value="seminar"
          checked={selectedOption === "seminar"}
          onChange={handleOptionChange}
        />
        강연/세미나
      </PickLabel>
      <PickLabel>
        <input
          type="radio"
          value="conference"
          checked={selectedOption === "conference"}
          onChange={handleOptionChange}
        />
        학술대회
      </PickLabel>
      <PickLabel>
        <input
          type="radio"
          value="exhibition"
          checked={selectedOption === "exhibition"}
          onChange={handleOptionChange}
        />
        전시/박람회
      </PickLabel>
      <PickLabel>
        <input
          type="radio"
          value="other"
          checked={selectedOption === "other"}
          onChange={handleOptionChange}
        />
        기타
      </PickLabel>
    </PickContainer>
  );
};

export default Pick;
