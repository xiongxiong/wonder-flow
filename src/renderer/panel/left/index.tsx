import styled from "styled-components";
import suiteBasic from "renderer/suite/basic";
import { SuiteInfo } from "renderer/suite";
import FoldablePanel from "../common/FoldablePanel";
import { memo } from "react";

const suites: SuiteInfo[] = [
  suiteBasic
];

export const nodeTypes = suites.map(({nodeTypes}) => nodeTypes).reduce((a, b) => ({...a, ...b}));

export default memo(() => (
  <Container>
      {suites.map(({name, panelRender}) => <FoldablePanel key={name} name={name} panelRender={panelRender} />)}
  </Container>
));

const Container = styled.div`
    width: 20%;
    background-color: #f7f5f1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;
