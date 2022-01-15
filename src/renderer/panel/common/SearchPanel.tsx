import { Input } from "@geist-ui/react";
import { memo } from "react";
import styled from "styled-components";

interface SearchPanelProps {}

export default memo((props: SearchPanelProps) => {
    return (
      <Container>
        <Input scale={2/3} width="100%" placeholder="Search" clearable />
      </Container>
    );
});

const Container = styled.div`
    padding: 8px;
    background-color: white;
`;
