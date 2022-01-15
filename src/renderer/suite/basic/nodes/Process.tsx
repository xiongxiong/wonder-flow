import { memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { Container } from "../common/Container";

export default memo(({ data, isConnectable, selected }: NodeProps<any>) => (
    <>
        <Handle
            type="target"
            position={Position.Top}
            id="a"
            style={{ background: "#555" }}
            isConnectable={isConnectable}
        />
        <Container  selected={selected}>
            <p>PROCESS</p>
        </Container>
        <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            style={{ background: "#555" }}
            isConnectable={isConnectable}
        />
    </>
));
