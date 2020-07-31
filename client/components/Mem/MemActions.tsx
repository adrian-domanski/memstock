import React from "react";
import styled from "styled-components";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MemLikes = styled.div`
  &&& {
    display: grid;
    grid-template-areas: "like counter dislike";
    grid-template-columns: 40px 80px 40px;
    grid-template-rows: 40px;
    gap: 8px;

    .like {
      grid-area: like;
      background: #24964c;
      font-weight: 400;
      font-size: 2.5rem;
      color: ${({ theme }) => theme.colors.white500};
      height: 100%;
      width: 40px;
      display: block;
      padding: 0;
      border: 0;

      :active {
        background: #2d864c;
      }
    }

    .dislike {
      grid-area: dislike;
      background: ${({ theme }) => theme.colors.danger};
      font-weight: 400;
      font-size: 2.5rem;
      color: ${({ theme }) => theme.colors.white500};
      height: 100%;
      width: 40px;
      display: block;
      padding: 0;
      border: 0;

      :active {
        background: #903245;
      }
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
    .dislike {
      transition: background 0.1s ease-in-out;
      :focus {
        box-shadow: none;
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
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  i {
    margin-right: 5px;
  }
`;

interface Props {
  likes: number;
  dislikes: number;
}

const MemActions: React.FC<Props> = ({ likes, dislikes }) => {
  return (
    <FlexWrapper>
      <MemLikes>
        <button className="button like">+</button>
        <button className="button dislike">-</button>
        <div className="counter">
          <span className="likes">{likes}</span>
          <span className="divider">/</span>
          <span className="dislikes">{dislikes}</span>
        </div>
      </MemLikes>
      <ShareButton className="button is-link">
        <i className="fab fa-facebook-square"></i>Udostępnij
      </ShareButton>
    </FlexWrapper>
  );
};

export default MemActions;
