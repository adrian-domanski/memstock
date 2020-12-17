import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Avatar } from "../../utils/styled/components/MemItem";
import { UserType } from "../../utils/types";
import { RankingListItem } from "../Mem/TopUsers";

const StyledRankingListItem = styled(RankingListItem)`
  figure {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    figcaption {
      padding-right: 8px;
    }
  }

  :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.dark800};
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
`;

interface Props {
  user: UserType;
  index: number;
}

const UserItem: React.FC<Props> = ({ user, index }) => {
  return (
    <StyledRankingListItem>
      <Link href="/uzytkownik/[user_id]" as={`/uzytkownik/${user.id}`}>
        <a>
          <Avatar>
            <figcaption className={`${index < 3 ? "has-text-primary" : ""}`}>
              {index + 1}. {user.username} ({user.rank} pkt)
            </figcaption>
            <img
              src={
                user.avatar
                  ? `${process.env.SERVER_URL}${user.avatar.url}`
                  : `/img/avatar-placeholder.jpg`
              }
              alt={`Zdjęcie profilowe użytkownika ${user.username}`}
            />
          </Avatar>
        </a>
      </Link>
    </StyledRankingListItem>
  );
};

export default UserItem;
