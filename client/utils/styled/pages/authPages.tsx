import styled, { StyledComponent, DefaultTheme } from "styled-components";
import { Props, PageWrapper, ContentHeader } from "../components/components";

export const CustomPageWrapper: React.FC<Props> = styled(PageWrapper)`
  max-width: ${({ theme }) => theme.pageMaxWidth};
  margin-left: auto;
  margin-right: auto;
`;

export const CustomContentHeader: React.FC<Props> = styled(ContentHeader)`
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 0;
`;

export const ExtendedLogoWrapper: React.FC<Props> = styled.div`
  text-align: center;
`;

export const StyledForm: React.FC<
  Props & { action: string; onSubmit: (e: React.FormEvent) => void }
> = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 700px;
  margin: 3rem auto 0 auto;

  label {
    color: ${({ theme }) => theme.colors.grey600};
    font-weight: 500;
  }

  input {
    background: ${({ theme }) => theme.colors.dark800};
    border-color: ${({ theme }) => theme.colors.dark800};
    color: ${({ theme }) => theme.colors.white500};

    ::placeholder {
      color: ${({ theme }) => theme.colors.grey700};
    }

    :hover {
      border-color: #5a5a5a;
    }
  }
`;
