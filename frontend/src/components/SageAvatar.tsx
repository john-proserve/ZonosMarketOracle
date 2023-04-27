import styled from "styled-components";
import Image from "next/image";

const StyledAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 3px;
  background: var(--amino-gray-1300);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: bounce 1s ease-in-out infinite alternate;

  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-2px);
    }
  }
`;

export const SageAvatar = () => (
  <StyledAvatar>
    <Image
      src="/project-sage-icon.svg"
      alt="SAGE Logo"
      width={24}
      height={14}
      priority
    />
  </StyledAvatar>
);
