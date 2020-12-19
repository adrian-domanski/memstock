import { userInfo } from "os";
import styled from "styled-components";
import { MemItemHeader as UserInfo } from "../../../utils/styled/components/MemItem";

export const UserContentHeader = styled(UserInfo).attrs({ as: "div" })`
  padding: 1.5rem 2rem;

  .content-wrapper {
    height: unset;
  }

  .avatar {
    .avatar-wrapper {
      width: 70px;
      height: 70px;
      position: relative;
      display: block;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;

      :after {
        content: "";
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
      }

      :before {
        font-family: "Font Awesome 5 Free";
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({ theme }) => theme.colors.accent};
        transform: translateY(10px);
        z-index: 2;
        font-size: 2rem;
        content: "\f085";
        transition: transform 0.3s ease;
      }

      :before,
      :after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scale(0);
      }

      :hover {
        :before,
        :after {
          transform: scale(1);
        }
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    figcaption {
      display: flex;
      justify-content: center;
      flex-direction: column;

      .user-name {
        font-size: 1.8rem;
      }

      .user-rank {
        font-size: 1.2rem;
      }
    }
  }
`;
