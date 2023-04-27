import styled from "styled-components";

export const Spacer = styled.div<{ size: number }>((props) => `
    height: ${props.size}px;
    width: ${props.size}px;
`);