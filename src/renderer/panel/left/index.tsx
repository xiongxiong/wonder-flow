import styled from "styled-components";
import { SuiteBasic } from "renderer/suite/basic";

const Panel = () => (
    <Container>
        <SuiteBasic />
    </Container>
);

export { Panel as default };

const Container = styled.div`
    width: 20%;
    background-color: #f7f5f1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;
