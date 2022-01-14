import { memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { Container } from "../common/Container";

export default memo(({ data, isConnectable } : NodeProps<any>) => (
  <>
      <Container>
        <p>END</p>
      </Container>
      <Handle
          type="source"
          position={Position.Top}
          id="a"
          style={{ background: "#555" }}
          isConnectable={isConnectable}
      />
  </>
));

