import styled from "styled-components";

export const TransferenceSectionContainer = styled.section`
  @media (min-width: 1024px) {
    max-width: 800px;
  }
`;

export const TransferenceSectionTitle = styled.h2``;

export const TransferenceSectionDescription = styled.p`
  margin-top: 0.5rem;

  span {
    font-weight: 700;
  }
`;

export const TransferenceForm = styled.form`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    margin-top: 1rem;
  }
`;
