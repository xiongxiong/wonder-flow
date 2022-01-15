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
        <Container selected={selected}>
            <p>LOGIC 2</p>
        </Container>
        <Handle
            type="source"
            position={Position.Left}
            id="b"
            style={{ background: "#555" }}
            isConnectable={isConnectable}
        />
        <Handle
            type="source"
            position={Position.Right}
            id="c"
            style={{ background: "#555" }}
            isConnectable={isConnectable}
        />
    </>
));
