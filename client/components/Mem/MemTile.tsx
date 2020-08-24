import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { MemType } from "../../utils/types";

export const StyledMemItem = styled.article`
  background: ${({ theme }) => theme.colors.dark600};
  :nth-child(even) {
    background: ${({ theme }) => theme.colors.dark700};
  }
`;

export const MemItemBody = styled.div`
  padding: 1rem;

  figure {
    img {
      max-height: 400px;
      width: 100%;
      object-fit: cover;
      object-position: top;
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
                  <li key={id}>
                    <Link
                      href={{
                        pathname: "/",
                        query: { category: name },
                      }}
                    >
                      <a className="is-link has-text-primary">#{name}</a>
                    </Link>
                  </li>
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
