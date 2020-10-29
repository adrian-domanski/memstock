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
  min-height: 30px;

  @media screen and (max-width: 600px) {
    padding: 0.2rem 1rem;
  }

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
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: unset;
      border: none;

      &.active {
        background: ${({ theme }) => theme.colors.dark800};
      }
    }
  }
`;

export const Avatar = styled.figure`
  display: flex;

  img {
    object-position: center;
    object-fit: cover;
    display: block;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: block;
  }

  .image-wrapper {
    position: relative;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;

    :hover {
      :after,
      :before {
        transform: scale(1) translateY(0);
      }
    }

    :before,
    :after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    :before {
      content: "\f0ad";
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      font-family: "Font Awesome 5 Free";
      font-weight: bold;
      transition: transform 0.3s ease;
      transform: scale(0) translateY(20px);
    }

    :after {
      content: "";
      display: block;
      background: black;
      opacity: 0.4;
      transform: scale(0);
    }
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
`;

export const MemItemBody = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.colors.dark600};

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }

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

    @media screen and (max-width: 1023px) {
      font-size: 1.3rem;
    }
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

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`;

export const StyledDropdown = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding-top: 0;
  .dropdown-content {
    background-color: ${({ theme }) => theme.colors.dark800};
  }

  .dropdown-item {
    color: ${({ theme }) => theme.colors.white500};

    :hover {
      background-color: ${({ theme }) => theme.colors.dark900};
      color: ${({ theme }) => theme.colors.white500};
    }
  }

  .dropdown-divider {
    background-color: ${({ theme }) => theme.colors.dark800};
  }
`;
