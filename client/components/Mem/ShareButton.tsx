import React from "react";
import styled from "styled-components";
import { FacebookProvider, ShareButton } from "react-facebook";

const StyledShareButton = styled(ShareButton)`
  display: flex;
  align-items: center;
  min-height: 40px;

  span {
    padding-right: 8px;
  }

  @media screen and (max-width: 998px) {
    span {
      display: none;
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
        <i aria-hidden="true" className="fas fa-share"></i>
      </StyledShareButton>
    </FacebookProvider>
  );
};

export default FBShareButton;
