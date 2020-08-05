import styled from "styled-components";

export const StyledMemItem = styled.article`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }

  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const MemItemHeader = styled.header`
  background: ${({ theme }) => theme.colors.dark700};
  padding: 0.2rem 2rem;

  .content-wrapper {
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    align-items: center;
    height: 80px;
  }

  .options {
    cursor: pointer;

    :hover i {
      color: ${({ theme }) => theme.colors.primaryDarker};
    }

    i {
      transition: color 0.2s ease-in-out;
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.5rem;
      width: 50px;
      height: 50px;
      background: unset;
      border: none;

      &.active {
        background: ${({ theme }) => theme.colors.dark800};
      }
    }
  }

  .avatar {
    display: flex;

    img {
      border-radius: 50%;
      width: 50px;
    }
    figcaption {
      padding-left: 0.8rem;

      .user-name {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 1.1rem;
      }

      .user-rank {
        color: ${({ theme }) => theme.colors.accent};
        font-size: 0.9rem;
      }
    }
  }
`;

export const MemItemBody = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.colors.dark600};

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }

  figure {
    img {
      width: 100%;
      display: block;
    }
  }

  .mem-title {
    color: ${({ theme }) => theme.colors.white500};
    font-size: 2rem;
  }

  .mem-categories {
    display: flex;

    li {
      color: ${({ theme }) => theme.colors.primary};

      :not(:last-child) {
        margin-right: 5px;
      }
    }
  }
`;

export const MemItemFooter = styled.footer`
  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.dark700};
`;

export const StyledDropdown = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadow};
  .dropdown-content {
    background-color: ${({ theme }) => theme.colors.dark700};
  }

  .dropdown-item {
    color: ${({ theme }) => theme.colors.white500};

    :hover {
      background-color: ${({ theme }) => theme.colors.dark800};
      color: ${({ theme }) => theme.colors.white500};
    }
  }

  .dropdown-divider {
    background-color: ${({ theme }) => theme.colors.dark800};
  }
`;
