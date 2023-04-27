import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Badge } from "@zonos/amino/components/badge/Badge";
import { Wrapper } from "./Wrapper";

const Header = styled.header`
  height: 53px;
  border-bottom: 1px solid #6E6E781A;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: var(--amino-space-16);

  img {
    margin-right: var(--amino-space-16);
  }
`;

export const AppHeader = () => {
  return (
    <Header>
      <Wrapper>
        <Image
          src="/project-sage-logo.svg"
          alt="SAGE Logo"
          width={100}
          height={32}
          priority
        />
        <Badge color="gray" size="small">
          Experimental AI Analyst
        </Badge>
      </Wrapper>
    </Header>
  );
};
