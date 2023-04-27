import styled from "styled-components";

export const Label = styled.strong`
    display: block;
    font-weight: 500;
    color: black;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
        width: 20px;
        height: 20px;
        margin-right: var(--amino-space-4);
    }
`;