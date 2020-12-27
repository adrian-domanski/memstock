import styled from "styled-components";

export const StyledAvatar = styled.figure`
  img {
    display: block;
    height: 128px;
    width: 128px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin: 0 auto;
    object-position: center;
  }
`;

export const StyledSeparator = styled.hr`
  background-color: ${({ theme }) => theme.colors.dark800};
`;

export const StyledWrapper = styled.div``;
