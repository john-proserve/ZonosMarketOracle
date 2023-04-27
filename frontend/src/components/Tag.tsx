import { PlusCircleDuotoneIcon } from "@zonos/amino/icons/PlusCircleDuotoneIcon";
import { useState } from "react";
import styled from "styled-components";
import { Spacer } from "./Spacer";
import { MinusCircleDuotoneIcon } from "@zonos/amino/icons/MinusCircleDuotoneIcon";

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 50px;
  border: 1.5px dashed var(--amino-gray-300);
  padding: var(--amino-space-4) var(--amino-space-8);
  font-weight: 500;
  opacity: 0.8;
  transition: all 150ms ease-in-out;
  cursor: default;
  background: white;
  user-select: none;
  align-items: center;

  svg {
    opacity: 0.8;
    color: white;
    height: 18px;
    width: 18px;

    path:first-of-type {
      fill: var(--amino-gray-900);
    }
  }

  &:hover {
    border: 1.5px dashed var(--amino-gray-400);
    opacity: 1;
    background: var(--amino-gray-50);
  }

  &.active {
    opacity: 1;
    border: 1.5px solid transparent;
    background: var(--amino-blue-600);
    color: #fff;

    &:hover {
        opacity: .8;
    }

    svg {
      color: var(--amino-blue-600);
      opacity: 1;

      path:first-of-type {
        fill: #fff;
        opacity: .8;
      }
    }
  }
`;

export const Tag = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: (e: any) => void;
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleToggleActive = () => {
    onChange(!active);
    setActive(!active);
  };

  return (
    <TagWrapper className={active ? "active" : ""} onClick={handleToggleActive}>
      {active ? <MinusCircleDuotoneIcon /> : <PlusCircleDuotoneIcon />}
      <Spacer size={5} />
      {label}
    </TagWrapper>
  );
};
