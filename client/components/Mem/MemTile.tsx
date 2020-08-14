import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { MemType } from "../../utils/types";

const StyledMemItem = styled.article`
  background: ${({ theme }) => theme.colors.dark600};
  :nth-child(even) {
    background: ${({ theme }) => theme.colors.dark700};
  }
`;

const MemItemBody = styled.div`
  padding: 1rem;

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

interface Props {
  mem: MemType;
}

const MemTile: React.FC<Props> = ({ mem }) => {
  return (
    <StyledMemItem>
      <MemItemBody>
        <div className="section py-3">
          <figure>
            <Link href="/mem/[mem_id]" as={`/mem/${mem.id}`}>
              <a>
                <img
                  src={`${process.env.SERVER_URL}${mem.image.url}`}
                  alt={mem.title}
                />
              </a>
            </Link>
            <figcaption>
              <Link href="/mem/[mem_id]" as={`/mem/${mem.id}`}>
                <a>
                  <h3 className="mem-title">{mem.title}</h3>
                </a>
              </Link>
              <ul className="mem-categories mb-3">
                {mem.categories.map(({ name, id }) => (
                  <li key={id}>#{name}</li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </div>
      </MemItemBody>
    </StyledMemItem>
  );
};

export default MemTile;
