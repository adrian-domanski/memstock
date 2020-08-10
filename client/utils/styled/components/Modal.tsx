import styled, { createGlobalStyle } from "styled-components";

export const StyledNoScroll = createGlobalStyle`
  html {
    overflow-y: hidden;
  }
`;

export const StyledModal = styled.div`
  .modal-card {
    overflow: auto;
    transform: translateY(0);
    opacity: 1;
    animation: ease-in 0.2s swipeUp;
  }

  .modal-background {
    min-height: 500px;
  }

  .modal-card-head {
    background: ${({ theme }) => theme.colors.dark800};
    border-color: ${({ theme }) => theme.colors.grey700};
  }

  .modal-card-title {
    color: ${({ theme }) => theme.colors.primary};
  }

  .delete {
    width: 30px;
    height: 30px;
    max-width: 30px;
    max-height: 30px;

    ::before,
    ::after {
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  .modal-card-body {
    background: ${({ theme }) => theme.colors.dark600};
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .modal-card-foot {
    border-color: ${({ theme }) => theme.colors.grey700};
    background: ${({ theme }) => theme.colors.dark800};
  }

  @keyframes swipeUp {
    0% {
      opacity: 0;
      transform: translateY(25px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledFileInput = styled.div<{ center?: boolean }>`
  justify-content: center;
  margin-top: 1rem;

  label.file-label {
    .file-cta {
      background-color: unset;
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      transition: color 0.1s ease, border-color 0.1s ease;

      :hover {
        color: ${({ theme }) => theme.colors.primaryDarker};
        border-color: ${({ theme }) => theme.colors.primaryDarker};
      }
    }
  }
`;
