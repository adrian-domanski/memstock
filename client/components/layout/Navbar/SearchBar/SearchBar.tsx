import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { getSearchHintsQuery } from "../../../../queries/memQueries";
import { Input } from "../../../../utils/styled/components/components";
import { SearchBar as StyledSearchBar } from "./styled";
import { MemType } from "../../../../utils/types";
import { SearchResults } from "./styled";
import Router from "next/router";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading } = useQuery(getSearchHintsQuery, {
    variables: { where: { title_contains: searchTerm }, limit: 5 },
    skip: !searchTerm,
    onCompleted: (data) => {
      setHintsInfo({
        length: data.mems.length,
        selectedIndex: -1,
      });
    },
  });

  const [closeHintsTimeout, setCloseHintsTimeout] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [hintsInfo, setHintsInfo] = useState<{
    length: number;
    selectedIndex: number;
  } | null>(null);

  useEffect(() => {
    const hintNavigation = (e: KeyboardEvent) => {
      if (!hintsInfo) return;
      let currentHintsInfo = { ...hintsInfo };

      switch (e.key) {
        case "ArrowUp":
          if (currentHintsInfo.selectedIndex === 0) {
            currentHintsInfo.selectedIndex = -1;
          } else if (currentHintsInfo.selectedIndex > -1) {
            currentHintsInfo.selectedIndex = currentHintsInfo.selectedIndex - 1;
          }
          break;
        case "ArrowDown":
          if (currentHintsInfo.selectedIndex === currentHintsInfo.length - 1) {
            currentHintsInfo.selectedIndex = 0;
          } else {
            currentHintsInfo.selectedIndex = currentHintsInfo.selectedIndex + 1;
          }
          break;
        default:
          return;
      }

      setHintsInfo(currentHintsInfo);
    };

    if (showSearchResults) {
      document.addEventListener("keydown", hintNavigation);
    }

    return () => document.removeEventListener("keydown", hintNavigation);
  }, [showSearchResults, hintsInfo]);

  useEffect(() => {
    return () => {
      if (closeHintsTimeout) clearTimeout(closeHintsTimeout);
      setShowSearchResults(false);
    };
  }, []);

  const handleInputBlur = () => {
    setCloseHintsTimeout(setTimeout(() => setShowSearchResults(false), 150));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (data && hintsInfo?.selectedIndex !== -1) {
      Router.push(
        "/mem/[mem_id]",
        `/mem/${data.mems[hintsInfo.selectedIndex].id}`
      );
    } else {
      Router.push({ pathname: "/", query: { title: searchTerm } });
    }

    setSearchTerm("");
  };

  return (
    <StyledSearchBar className="" onSubmit={handleSubmit}>
      <p className="control is-expanded mr-0">
        <Input
          type="text"
          placeholder="Szukaj mema..."
          autoComplete="off"
          aria-label="Szukana fraza"
          onFocus={() => setShowSearchResults(true)}
          onBlur={handleInputBlur}
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
      </p>
      <p className="control">
        <button className="button is-primary" type="submit" aria-label="Szukaj">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </p>
      {searchTerm && showSearchResults && (
        <SearchResults className="search-preview">
          {loading ? (
            <li className="info">Wczytywanie...</li>
          ) : data.mems.length && hintsInfo ? (
            data.mems.map((mem: MemType) => (
              <li
                key={mem.id}
                className={`${
                  data.mems[hintsInfo.selectedIndex]?.id === mem.id
                    ? "selected"
                    : ""
                }`}
              >
                <Link href="/mem/[mem_id]" as={`/mem/${mem.id}`}>
                  <a className="is-link">{mem.title}</a>
                </Link>
              </li>
            ))
          ) : (
            <li className="info">Brak wyników</li>
          )}
        </SearchResults>
      )}
    </StyledSearchBar>
  );
};

export default SearchBar;
