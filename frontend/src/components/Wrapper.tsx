import styled from "styled-components";

export const Wrapper = styled.div`
  @media (min-width: 640px) {
    max-width: 95vw;
  }
  @media (min-width: 1280px) {
    max-width: 85vw;
  }
  @media (min-width: 1536px) {
    max-width: 45vw;
  }

  display: flex;
  margin: 0 auto;
  flex: 1;
  padding: var(--amino-space-24);
`;
