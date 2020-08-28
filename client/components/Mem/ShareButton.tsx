import React from "react";
import styled from "styled-components";
import { FacebookProvider, ShareButton } from "react-facebook";

const StyledShareButton = styled(ShareButton)`
  &&& {
    display: flex;
    align-items: center;
    min-height: 40px;
    background-color: ${({ theme }) => theme.colors.accentBackground};
    transition: background-color 0.2s ease-in-out;

    :hover {
      background-color: #1b716e;
    }

    span {
      padding-right: 8px;
    }

    @media screen and (max-width: 998px) {
      span {
        display: none;
      }
    }
  }
`;

interface IProps {
  memId: string;
}

const FBShareButton: React.FC<IProps> = ({ memId }) => {
  return (
    <FacebookProvider appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}>
      <StyledShareButton
        className="button is-link"
        href={`${process.env.CLIENT_URL}/mem/${memId}`}
      >
        <span>Udostępnij</span>
        <i className="fas fa-share"></i>
      </StyledShareButton>
    </FacebookProvider>
  );
};

export default FBShareButton;
