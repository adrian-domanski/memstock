import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearchHintsQuery } from "../../../queries/memQueries";
import { Input } from "../../../utils/styled/components/components";
import { SearchBar as StyledSearchBar } from "../../../utils/styled/components/Navbar";
import { MemType } from "../../../utils/types";

const SearchResults = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background: ${({ theme }) => theme.colors.dark900};
  width: 100%;

  li {
    padding: 0.5rem 1rem;
  }
`;

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading } = useQuery(getSearchHintsQuery, {
    variables: { where: { title_contains: searchTerm }, limit: 5 },
    skip: !searchTerm,
  });

  const [closeHintsTimeout, setCloseHintsTimeout] = useState(null);
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    return () => {
      if (closeHintsTimeout) clearTimeout(closeHintsTimeout);
      setSearchFocus(false);
    };
  }, []);

  const handleInputBlur = () => {
    setCloseHintsTimeout(setTimeout(() => setSearchFocus(false), 100));
  };

  return (
    <StyledSearchBar className="field is-grouped">
      <p className="control is-expanded mr-0">
        <Input
          type="text"
          placeholder="Szukaj mema..."
          autoComplete="off"
          aria-label="Szukana fraza"
          onFocus={() => setSearchFocus(true)}
          onBlur={handleInputBlur}
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
      </p>
      <p className="control">
        <Link href={{ pathname: "/", query: { title: searchTerm } }}>
          <button
            className="button is-primary"
            type="button"
            aria-label="Szukaj"
            onClick={() => setSearchTerm("")}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </Link>
      </p>
      {searchTerm && searchFocus && (
        <SearchResults className="search-preview">
          {loading ? (
            <li>Wczytywanie...</li>
          ) : data.mems.length ? (
            data.mems.map((mem: MemType) => (
              <Link href="/mem/[mem_id]" as={`/mem/${mem.id}`} key={mem.id}>
                <a className="is-link">
                  <li>{mem.title}</li>
                </a>
              </Link>
            ))
          ) : (
            <li>Brak wyników</li>
          )}
        </SearchResults>
      )}
    </StyledSearchBar>
  );
};

export default SearchBar;
