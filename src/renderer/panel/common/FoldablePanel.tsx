import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { SuitePanel, togglePanelExpand } from "renderer/store/project/setting";
import { useDispatch } from "react-redux";

interface FoldablePanelProps {
  suitePanel: SuitePanel;
}

export default memo((props: FoldablePanelProps) => {
  const {expanded, info: {name, PanelRender}} = props.suitePanel;

  const dispatch = useDispatch();

  const onToggle = useCallback(() => {
    dispatch(togglePanelExpand(name));
  }, []);

  return (
    <>
      <TitleBar onClick={onToggle}>
        {name}
        {expanded ? <BiChevronDown/> : <BiChevronRight/>}
      </TitleBar>
      {expanded && <PanelRender />}
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
