import { memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { Container } from "../common/Container";

export default memo(({ data, isConnectable, selected } : NodeProps<any>) => (
  <>
      <Container selected={selected}>
        <p>START</p>
      </Container>
      <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          style={{ background: "#555" }}
          isConnectable={isConnectable}
      />
  </>
));

