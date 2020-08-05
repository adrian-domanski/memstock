import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Button } from "../utils/styled/components/components";

const StyledNoScroll = createGlobalStyle`
  html {
    overflow-y: hidden;
  }
`;

const StyledModal = styled.div`
  .modal-card {
    overflow: auto;
    transform: translateY(0);
    opacity: 1;
    animation: ease-in 0.2s swipeUp;
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

interface Props {
  title?: string;
  body?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >;
  actionSubmit?: () => void;
  actionClose: () => void;
  isOpen: boolean;
  actionProgress: boolean;
}

const Modal: React.FC<Props> = ({
  title = "Czy chcesz kontynuować?",
  body = "",
  actionClose,
  actionSubmit,
  isOpen,
  actionProgress,
}) => {
  return (
    <>
      {isOpen && <StyledNoScroll />}
      <StyledModal className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head is-radiusless">
            <p className="modal-card-title">{title}</p>
            <button
              className="delete"
              type="button"
              onClick={actionClose}
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            {actionProgress ? "Proszę czekać..." : body}
          </section>
          <footer className="modal-card-foot is-radiusless">
            <Button className="is-primary" onClick={actionClose}>
              Nie
            </Button>
            <Button
              className={`is-primary light ${
                actionProgress ? "is-loading" : ""
              }`}
              onClick={actionSubmit}
            >
              Tak
            </Button>
          </footer>
        </div>
      </StyledModal>
    </>
  );
};

export default Modal;
