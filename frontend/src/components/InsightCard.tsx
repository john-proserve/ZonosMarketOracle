import styled from "styled-components";
import { Card } from "./Card";
import { Label } from "./Label";
import { ArrowSwapIcon } from "@zonos/amino/icons/ArrowSwapIcon";
import { BigLabel } from "./BigLabel";

const NoPaddingCard = styled(Card)`
  padding: 0;
  margin-top: var(--amino-space-8);
`;

const Problem = styled.div`
  padding: var(--amino-space-24);
  background: linear-gradient(
      180deg,
      rgba(176, 32, 0, 0.102) 5.32%,
      rgba(119, 21, 0, 0) 52.54%
    ),
    #ffffff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: var(--amino-red-900);

  strong {
    color: var(--amino-red-1000);
  }
`;

const Solution = styled.div`
  padding: var(--amino-space-24);
  background: linear-gradient(
      180deg,
      rgba(25, 176, 0, 0.102) 5.32%,
      rgba(17, 119, 0, 0) 52.54%
    ),
    #ffffff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 1px solid #6e6e781a;

  color: var(--amino-green-900);

  strong {
    color: var(--amino-green-1000);
  }
`;

const Icon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0px 0px 0px 1px rgba(110, 110, 120, 0.1),
    0px 1px 2px rgba(10, 10, 11, 0.06), 0px 1px 3px rgba(10, 10, 11, 0.1);
  border-radius: 500px;
  z-index: 10;
  position: relative;
  left: calc(50% - 16px);
  margin-top: -16px;
  margin-bottom: -16px;

  svg {
    fill: var(--amino-gray-700);
    transform: rotate(90deg);
  }
`;

export const InsightCard = ({
  problem,
  suggestion,
  summary,
}: {
  problem: string;
  suggestion: string;
  summary: string;
}) => (
  <div>
    <BigLabel>{summary}</BigLabel>
    <NoPaddingCard>
      <Problem>
        <div>
          <Label>Problem</Label>
          <span>{problem}</span>
        </div>
      </Problem>
      <Icon>
        <ArrowSwapIcon color="gray700" size={16} />
      </Icon>
      <Solution>
        <div>
          <Label>Suggested improvement</Label>
          <span>{suggestion}</span>
        </div>
      </Solution>
    </NoPaddingCard>
  </div>
);
