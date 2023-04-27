import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SageAvatar } from "./SageAvatar";
import { FlexRow } from "./FlexRow";
import { Spacer } from "./Spacer";

const GrayBg = styled.div`
  background: var(--amino-gray-100);
  padding: var(--amino-space-24);
  border-radius: 6px;
`;

const TopAligned = styled(FlexRow)`
  align-items: flex-start;
`;

export const SageMessage = ({ message }: { message: string }) => {
  return (
    <GrayBg>
      <TopAligned>
        <SageAvatar />
        <Spacer size={16} />
        <span>{message}</span>
      </TopAligned>
    </GrayBg>
  );
};
