import styled from 'styled-components';
import React, { DragEvent } from 'react';

const Container = styled.div`
  background-color: #d8d6d2;
`;

const Item = styled.div`
  width: 60px;
  height: 60px;
  margin: 8px;
  border-radius: 4px;
  border: 1px solid;
  background-color: lightblue;
`;

const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
  event.dataTransfer?.setData('application/reactflow', nodeType);
  event.dataTransfer && (event.dataTransfer.effectAllowed = 'move');
}

const Panel = () => (<Container>
  <Item onDragStart={event => onDragStart(event, 'default')}></Item>
</Container>);

export { Panel as default };
