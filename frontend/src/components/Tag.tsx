import { PlusCircleDuotoneIcon } from "@zonos/amino/icons/PlusCircleDuotoneIcon";
import { useState } from "react";
import styled from "styled-components";
import { Spacer } from "./Spacer";
import { MinusCircleDuotoneIcon } from "@zonos/amino/icons/MinusCircleDuotoneIcon";
import { motion, useAnimation } from "framer-motion";

const TagWrapper = styled(motion.div)`
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
    height: 18px;
    width: 18px;
    fill: var(--amino-gray-900);
    color: white;
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
      opacity: 0.8;
    }

    svg {
      fill: white;
      color: var(--amino-blue-600);
    }
  }
`;

const MinusCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const PlusCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

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
  const control = useAnimation();

  const handleToggleActive = () => {
    onChange(!active);
    setActive(!active);
    control
      .start({
        scale: 1.05,
        transition: { duration: 0.10 },
      })
      .then(() => {
        control.start({
          scale: 1,
          transition: { duration: 0.10 },
        });
      });
  };

  return (
    <TagWrapper
      className={active ? "active" : ""}
      onClick={handleToggleActive}
      animate={control}
    >
      <motion.div
        animate={{ rotate: active ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <PlusCircle />
      </motion.div>
      <Spacer size={5} />
      {label}
    </TagWrapper>
  );
};
