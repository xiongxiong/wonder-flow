import { memo, useCallback, useState } from "react";
import { SuitePanelProps } from "renderer/suite";
import styled from "styled-components";

export default memo((props: SuitePanelProps) => {
  const [expand, setExpand] = useState(false);
  const toggle = useCallback(() => setExpand(!expand), [expand]);
  return (
    <div key={props.name}>
      <TitleBar onClick={toggle}>{props.name}</TitleBar>
      {expand && <props.panelRender />}
    </div>
  );
});

const TitleBar = styled.div`
  padding: 8px;
  background-color: lightskyblue;
  font-size: smaller;
`
