import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;
