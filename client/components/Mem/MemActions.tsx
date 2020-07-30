import React from "react";
import styled from "styled-components";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MemLikes = styled.div`
  display: grid;
  grid-template-areas: "like counter dislike";
  grid-template-columns: 40px 80px 40px;
  grid-template-rows: 40px;
  gap: 8px;

  .like {
    grid-area: like;
    background: ${({ theme }) => theme.colors.success};
    font-weight: 400;
    font-size: 2.5rem;
  }

  .dislike {
    grid-area: dislike;
    background: ${({ theme }) => theme.colors.danger};
    font-weight: 400;
    font-size: 2.5rem;
  }

  .counter {
    grid-area: counter;
    background: #484848;

    .likes {
      color: ${({ theme }) => theme.colors.success};
    }

    .dislikes {
      color: ${({ theme }) => theme.colors.danger};
    }

    .divider {
      margin: 0 5px;
    }
  }

  .like,
  .dislike,
  .counter {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  i {
    margin-right: 5px;
  }
`;

const MemActions: React.FC = () => {
  return (
    <FlexWrapper>
      <MemLikes>
        <div className="like">+</div>
        <div className="dislike">-</div>
        <div className="counter">
          <span className="likes">12</span>
          <span className="divider">/</span>
          <span className="dislikes">3</span>
        </div>
      </MemLikes>
      <ShareButton className="button is-link">
        <i className="fab fa-facebook-square"></i>Udostępnij
      </ShareButton>
    </FlexWrapper>
  );
};

export default MemActions;
