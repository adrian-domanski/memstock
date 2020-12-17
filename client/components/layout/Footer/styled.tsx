import styled from "styled-components";

export const PrimaryFooter = styled.div`
  background: ${({ theme }) => theme.colors.dark700};
  padding: 1rem;
`;

export const SecondaryFooter = styled.div`
  background: ${({ theme }) => theme.colors.dark600};
`;

export const WideWrapper = styled.div`
  max-width: ${({ theme }) => theme.pageWideSectionMaxWidth};
  width: 100%;
  margin: 0 auto;
`;

export const GridList = styled.ul<{ has2columns?: boolean }>`
  display: grid;
  grid-template-columns: ${({ has2columns }) =>
    has2columns ? "1fr 1fr" : "1fr"};
`;

export const GridListItem = styled.li`
  color: ${({ theme }) => theme.colors.white500};
  line-height: 2;
`;

export const FooterTitle = styled.h3.attrs(
  ({ className = "" }: { className?: string }) => ({
    className: `title is-size-3-mobile ${className}`,
  })
)`
  &&& {
    color: ${({ theme }) => theme.colors.primaryDarker};
  }
`;
