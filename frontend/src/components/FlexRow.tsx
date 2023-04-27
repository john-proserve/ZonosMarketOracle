import styled from "styled-components";

export const FlexRow = styled.div<{ flexChildren?: boolean }>(
  (props) => `
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
        flex: ${props.flexChildren ? 1 : 'unset'};
    }
`
);
