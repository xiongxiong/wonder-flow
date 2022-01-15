import styled from "styled-components";
import FoldablePanel from "../common/FoldablePanel";
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "renderer/store/store";
import SearchPanel from "../common/SearchPanel";

export default memo(() => {
    const suitePanels = useSelector((state: RootState) => state.project.setting.suitePanels);

    return (
        <Container>
            <SearchPanel />
            {suitePanels.map((suitePanel) => (
                <FoldablePanel
                    key={suitePanel.info.name}
                    suitePanel={suitePanel}
                />
            ))}
        </Container>
    );
});

const Container = styled.div`
    width: 20%;
    background-color: #f7f5f1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-right: 1px solid lightgray;
`;
