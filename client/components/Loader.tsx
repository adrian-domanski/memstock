import React from "react";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  height: 200px;
  margin: 0 auto;
  .my-loader,
  .my-loader:before,
  .my-loader:after {
    background: ${({ theme }) => theme.colors.accent};
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  .my-loader {
    color: ${({ theme }) => theme.colors.accent};
    text-indent: -9999em;
    margin: 88px auto;
    position: relative;
    font-size: 11px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .my-loader:before,
  .my-loader:after {
    position: absolute;
    top: 0;
    content: "";
  }
  .my-loader:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .my-loader:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <div className="my-loader">Proszę czekać...</div>
    </LoaderWrapper>
  );
};

export default Loader;
