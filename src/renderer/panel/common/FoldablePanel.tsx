import { memo, useCallback, useState } from "react";
import { SuitePanelProps } from "renderer/suite";
import styled from "styled-components";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";

export default memo((props: SuitePanelProps) => {
  const [expand, setExpand] = useState(false);
  const toggle = useCallback(() => setExpand(!expand), [expand]);
  return (
    <>
      <TitleBar onClick={toggle}>
        {props.name}
        {expand ? <BiChevronDown/> : <BiChevronRight/>}
      </TitleBar>
      {expand && <props.panelRender />}
    </>
  );
});

const TitleBar = styled.div`
  padding: 8px;
  background-color: #e4f0f8;
  font-size: smaller;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
`
