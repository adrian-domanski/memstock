import styled from "styled-components";

export const MyProfile = styled.figure`
  display: flex;
  align-items: center;
  width: 100%;
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: block;
    object-fit: cover;
    object-position: center;
    max-height: unset;

    @media screen and (max-width: 1023px) {
      display: none;
    }
  }

  figcaption {
    width: 100%;
    color: ${({ theme }) => theme.colors.accent};
  }
`;
