import styled from "styled-components";
import { FlexRow } from "./FlexRow";
import { Spacer } from "./Spacer";
import React, { useEffect, useState } from "react";

export const DataQualityMeter = ({
  progress,
  size = 48,
  strokeWidth = 6,
  backgroundColor = "var(--amino-gray-200)",
  progressColor = "var(--amino-blue-500)",
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  progressColor?: string;
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const circleCircumference = 2 * Math.PI * (size / 2 - strokeWidth);
  const strokeDashoffset =
    circleCircumference - (currentProgress / 100) * circleCircumference;

  const qualityMessages = {
    1: "Very poor - I need more data, otherwise I may produce bad results",
    2: "Poor - With more data, I could improve the quality of my predictions",
    3: "Fair - Additional data would help me refine my predictions",
    4: "Good - I'm producing decent results, but more data could make them better",
    5: "Very good - My predictions are quite accurate, but more data is always helpful",
    6: "Excellent - I'm confident in my predictions, yet more data could enhance their quality",
    7: "Outstanding - My predictions are impressive, but I can still learn from more data",
    8: "Exceptional - Even though my predictions are exceptional, more data could make them even better",
    9: "Near perfect - My predictions are almost perfect, but there's always room for improvement",
    10: "Perfect - My predictions are perfect, but I'll keep learning from new data",
  } as any;

  const noDataMessage = "No data - I can't make any predictions";
  const perfectMessage = "Extraordinary - My predictions surpass all expectations";

  useEffect(() => {
    const updateProgress = () => {
      if (currentProgress !== progress) {
        setCurrentProgress((prevProgress) => {
          if (Math.abs(prevProgress - progress) < 1) {
            return progress;
          }
          return prevProgress + (progress > prevProgress ? 1 : -1);
        });
      }
    };

    const interval = setInterval(updateProgress, 10);
    return () => clearInterval(interval);
  }, [progress, currentProgress]);

  return (
    <FlexRow>
      <CircularProgressWrapper size={size}>
        <BackgroundCircle
          r={size / 2 - strokeWidth}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          backgroundColor={backgroundColor}
        />
        <ProgressCircle
          r={size / 2 - strokeWidth}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          progressColor={progressColor}
          circleCircumference={circleCircumference}
          strokeDashoffset={strokeDashoffset}
        />
      </CircularProgressWrapper>

      <Spacer size={8} />
      <span>
        {progress / 10 === 0
          ? noDataMessage
          : qualityMessages[progress / 10] || perfectMessage}
      </span>
    </FlexRow>
  );
};

const CircularProgressWrapper = styled.svg<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const BackgroundCircle = styled.circle<{ backgroundColor: string }>`
  fill: none;
  stroke: ${(props) => props.backgroundColor};
  stroke-width: ${(props) => props.strokeWidth}px;
`;

const ProgressCircle = styled.circle<{
  progressColor: string;
  circleCircumference: number;
  strokeDashoffset: number;
}>`
  fill: none;
  stroke: ${(props) => props.progressColor};
  stroke-width: ${(props) => props.strokeWidth}px;
  stroke-linecap: round;
  stroke-dasharray: ${(props) => props.circleCircumference}px;
  stroke-dashoffset: ${(props) => props.strokeDashoffset}px;
  transition: all 100ms ease-in-out;

  transform-origin: 50% 50%;
  transform: rotate(-90deg);
`;
