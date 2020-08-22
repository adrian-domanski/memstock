import React, { useState, useEffect } from "react";
import {
  StyledTitleWithLine,
  ContentHeader,
  ContentBody,
  ContentFooter,
} from "../../utils/styled/components/components";
import { MemGeneratorTemplate } from "../../utils/types";
import styled from "styled-components";

const TemplateButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  a,
  button {
    border: none;
    width: 48%;
    cursor: pointer;
  }
`;

const StyledTemplate = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

interface Props {
  setCanvasBaseImage: React.Dispatch<React.SetStateAction<string>>;
  canvasBaseImage: string;
  templates: {
    memes: MemGeneratorTemplate[];
  };
}

const TEMPLATES_PER_LOAD = 12;

const MemTemplates: React.FC<Props> = ({
  templates,
  setCanvasBaseImage: setPreviewURL,
  canvasBaseImage: previewURL,
}) => {
  const [pagination, setPagination] = useState({
    from: 0,
    to: TEMPLATES_PER_LOAD,
    page: 1,
  });

  useEffect(() => {
    if (templates && templates.memes) {
      const random = Math.round(Math.random() * (templates.memes.length - 1));
      setPreviewURL(templates.memes[random].url);
    }
  }, [templates]);

  const MAX_ITEMS = templates && templates.memes.length;
  const pages =
    templates &&
    templates.memes.length &&
    Math.ceil(templates.memes.length / TEMPLATES_PER_LOAD);

  const setNextPage = () => {
    let currentPagination = pagination;
    currentPagination.from += TEMPLATES_PER_LOAD;
    currentPagination.to += TEMPLATES_PER_LOAD;
    currentPagination.page += 1;
    if (currentPagination.page > pages) currentPagination.page = pages;
    if (currentPagination.to > 100) currentPagination.to = 100;
    if (currentPagination.from < 0) currentPagination.from = 0;
    setPagination({ ...currentPagination });
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
      currentPagination.to = TEMPLATES_PER_LOAD;
    setPagination({ ...currentPagination });
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

  return (
    <>
      <ContentHeader className="mt-5">
        <StyledTitleWithLine className="is-size-5">
          Szablony:
        </StyledTitleWithLine>
      </ContentHeader>
      <ContentBody>
        <div className="columns is-flex section is-multiline">
          {templates && templates.memes ? (
            templates.memes
              .slice(pagination.from, pagination.to)
              .map((template) => (
                <StyledTemplate key={template.id} className="column is-3">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={template.url} alt="Placeholder image" />
                      </figure>
                    </div>
                    <div className="card-content has-background-dark">
                      <p className="is-size-5 mb-3 has-text-light">
                        {template.name}
                      </p>
                      <TemplateButtons>
                        <a
                          target="_blank"
                          download
                          href={template.url}
                          className="button is-warning is-light"
                        >
                          Pobierz
                        </a>
                        <button
                          className="button is-primary"
                          type="button"
                          disabled={template.url === previewURL}
                          onClick={() => setPreviewURL(template.url)}
                        >
                          Ustaw
                        </button>
                      </TemplateButtons>
                    </div>
                  </div>
                </StyledTemplate>
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
            onClick={setPreviousPage}
          >
            Poprzednia
          </button>
          <button
            className="pagination-next"
            disabled={pagination.to >= MAX_ITEMS}
            onClick={setNextPage}
          >
            Następna
          </button>
          <ul className="pagination-list">
            {templates && templates.memes
              ? [...Array(pages)].map((_, i) => (
                  <li key={i}>
                    <button
                      className={`button pagination-link ${
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
