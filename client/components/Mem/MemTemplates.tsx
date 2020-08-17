import React, { useState } from "react";
import {
  StyledTitleWithLine,
  ContentHeader,
  ContentBody,
  ContentFooter,
} from "../../utils/styled/components/components";
import { MemGeneratorTemplate } from "../../utils/types";

interface Props {
  templates: {
    memes: MemGeneratorTemplate[];
  };
}

const TEMPLATES_PER_LOAD = 12;
const MAX_ITEMS = 100;

const MemTemplates: React.FC<Props> = ({ templates }) => {
  const [currentTemplates, setCurrentTemplates] = useState<
    MemGeneratorTemplate[]
  >([]);
  const [pagination, setPagination] = useState({
    from: 0,
    to: TEMPLATES_PER_LOAD,
    page: 1,
  });
  const pages =
    templates &&
    templates.memes.length &&
    Math.ceil(templates.memes.length / TEMPLATES_PER_LOAD);

  const setNextPage = () => {
    let currentPagination = pagination;
    if (currentPagination.to >= 100) return;
    currentPagination.from += TEMPLATES_PER_LOAD;
    currentPagination.to += TEMPLATES_PER_LOAD;
    currentPagination.page += 1;
    if (currentPagination.page > pages) currentPagination.page = pages;
    if (currentPagination.to > 100) currentPagination.to = 100;
    if (currentPagination.from > 0) currentPagination.from = 0;
    setPagination(currentPagination);
  };

  const setPreviousPage = () => {
    let currentPagination = pagination;
    if (currentPagination.from <= 0) return;
    currentPagination.from -= TEMPLATES_PER_LOAD;
    currentPagination.to -= TEMPLATES_PER_LOAD;
    currentPagination.page -= 1;
    if (currentPagination.page < 1) currentPagination.page = 1;
    if (currentPagination.from < 0) currentPagination.from = 0;
    if (currentPagination.to < TEMPLATES_PER_LOAD)
      currentPagination.from = TEMPLATES_PER_LOAD;
    setPagination(currentPagination);
  };

  const setPage = (pageNumber) => {
    let newPagination: typeof pagination = {
      from: (pageNumber - 1) * TEMPLATES_PER_LOAD,
      to: pageNumber * TEMPLATES_PER_LOAD,
      page: pageNumber,
    };

    if (newPagination.from < 0) newPagination.from = 0;
    if (newPagination.to > MAX_ITEMS) newPagination.to = MAX_ITEMS;
    if (newPagination.page > pages) newPagination.page = pages;

    setPagination({ ...newPagination });
  };

  console.log(pagination);

  return (
    <>
      <ContentHeader className="mt-5">
        <StyledTitleWithLine className="is-size-5">
          Szablony:
        </StyledTitleWithLine>
      </ContentHeader>
      <ContentBody>
        <div className="columns section is-multiline">
          {templates && templates.memes ? (
            templates.memes
              .slice(pagination.from, pagination.to)
              .map((template) => (
                <div key={template.id} className="column is-3">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={template.url} alt="Placeholder image" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <p className="title is-4">{template.name}</p>
                      <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <h1>Brak szablonów</h1>
          )}
        </div>
      </ContentBody>
      <ContentFooter>
        <nav className="pagination" role="navigation" aria-label="pagination">
          <button
            className="pagination-previous"
            disabled={pagination.from <= 0}
          >
            Poprzednia
          </button>
          <button
            className="pagination-next"
            disabled={pagination.to >= MAX_ITEMS}
          >
            Następna
          </button>
          <ul className="pagination-list">
            {templates && templates.memes
              ? [...Array(pages)].map((_, i) => (
                  <li>
                    <button
                      className={`pagination-link ${
                        i + 1 === pagination.page ? "is-current" : ""
                      }`}
                      aria-label={`Strona ${i + 1}`}
                      aria-current="page"
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))
              : null}
          </ul>
        </nav>
      </ContentFooter>
    </>
  );
};

export default MemTemplates;
