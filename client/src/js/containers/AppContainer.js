import React from "react";

import styled from "styled-components";

const StyledAppContainerDiv = styled.div`
  min-height: 60rem;
  overflow: hidden;
  padding-bottom: 2rem;
`;

const AppContainer = ({ children }) => {
  return (
    <StyledAppContainerDiv data-test-id="appContainer">
      {children}
    </StyledAppContainerDiv>
  );
};

export default AppContainer;
