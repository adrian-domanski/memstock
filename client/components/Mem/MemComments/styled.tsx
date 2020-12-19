import styled from "styled-components";
import { ContentBody } from "../../../utils/styled/components/components";

export const CommentsSection = styled.section.attrs({ className: "section" })`
  background: ${({ theme }) => theme.colors.dark600};
`;

export const CommentsSectionTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white500};
  font-size: 1.5rem;
  position: relative;
  padding-left: 15px;
  margin-bottom: 1.8rem;

  :before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledContentBody = styled(ContentBody)`
  background: ${({ theme }) => theme.colors.dark800};
`;
