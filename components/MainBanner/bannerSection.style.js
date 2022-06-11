import styled from "styled-components";

const MainBanner = styled.section`
  background-image: url(${require("./../public/assets/homepage/heroImage.png")});
  background-size: cover;

  width: 100%;
  height: 500px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 3rem;
    margin-bottom: 60px;
    margin-top: 50px;
  }

  h3 {
    width: 100%;
    max-width: 672px;
    text-align: center;
  }
  h3 span {
    color: #4cdc8f;
    font-weight: bold;
  }

  .MuiTypography-subtitle1 {
    margin-bottom: 20px;
  }

  .MuiButton-contained {
    background-color: #ff0144;
    padding: 15px 40px;
    border-radius: 10px;
  }

  .MuiButton-text {
    color: #fff;
  }
  .LrnMore {
    color: #fff;
    margin-top: 20px;
  }

  .LrnMore svg {
    font-size: 1rem;
    margin-bottom: 0;
    margin-left: 5px;
    margin-top: 0;
  }
`;
export default MainBanner;
