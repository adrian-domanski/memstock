import styled from "styled-components";

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LikeButton = styled.button<{ memCheckActions?: boolean }>`
  &&& {
    grid-area: like;
    font-weight: 400;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.white500};
    background: #24964c;
    height: 100%;
    width: ${({ memCheckActions }) => (memCheckActions ? "unset" : "40px")};
    display: block;
    padding: ${({ memCheckActions }) =>
      memCheckActions ? "0.5rem 2rem" : "0"};
    border: 0;
    transition: background-color 0.2s ease;

    :hover {
      background-color: #2d864c;
    }

    :active {
      background-color: #18793a;
    }

    :focus {
      box-shadow: none;
    }

    :active,
    :focus {
      outline: auto;
      outline-offset: 2px;
    }

    &.is-active i {
      color: #2a4433;
    }
  }
`;

export const DislikeButton = styled.button<{ memCheckActions?: boolean }>`
  &&& {
    grid-area: dislike;
    background: ${({ theme }) => theme.colors.danger};
    font-weight: 400;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.white500};
    height: 100%;
    width: ${({ memCheckActions }) => (memCheckActions ? "unset" : "40px")};
    display: block;
    padding: ${({ memCheckActions }) =>
      memCheckActions ? "0.5rem 2rem" : "0"};
    border: 0;
    transition: background-color 0.2s ease;

    :hover {
      background-color: #c72e4c;
    }

    :active {
      background-color: #903245;
    }

    :focus {
      box-shadow: none;
    }

    :active,
    :focus {
      outline: auto;
      outline-offset: 2px;
    }

    &.is-active i {
      color: #46262c;
    }
  }
`;

export const MemButtons = styled.div<{ memCheckActions?: boolean }>`
  &&& {
    display: ${({ memCheckActions }) => (memCheckActions ? "flex" : "grid")};
    ${({ memCheckActions }) =>
      memCheckActions && "justify-content: space-between; width:100%;"};
    grid-template-areas: "dislike counter like";
    grid-template-columns: 40px 80px 40px;
    grid-template-rows: 40px;
    gap: 8px;

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
  }
`;
