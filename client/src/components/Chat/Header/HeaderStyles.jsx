import styled from "styled-components";

export const HeaderWrapper = styled.div`
  @media (min-width: 350px) and (max-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem 0 0.5rem 1.2rem;
    margin: 1rem 0;
  }
`;

export const ImageWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  @media (min-width: 350px) and (max-width: 700px) {
    width: 3rem;
    height: 3rem;
    border-radius: 6249.938rem;
    overflow: hidden;
    margin: 0 0.6rem;
    background-color: #ffffff;
  }
`;
