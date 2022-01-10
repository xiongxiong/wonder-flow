import { DragEventHandler, useRef, useState } from 'react';
import ReactFlow, { addEdge, Background, Connection, Edge, Elements, OnLoadFunc, ReactFlowProvider, removeElements } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { newElement, RootState } from 'renderer/store/store';
import styled from 'styled-components';

export const Panel = () => {

  const dispatch = useDispatch();

	const flowWrapper = useRef(null as (HTMLDivElement | null));

	const [ flowInstance, setFlowInstance ] = useState(null as any);

  const initialElements = useSelector((state: RootState) => {
    const {eleMap, eleTreeFocus} = state.global;
    let iter = eleTreeFocus.keys();
    let keyNext = iter.next();
    let tempNodes = [];
    while (keyNext.done === false) {
      tempNodes.push(eleMap.get(keyNext.value));
    }
    return tempNodes;
  });

	const [ elements, setElements ] = useState(initialElements);

  const nextId = useSelector((state: RootState) => `node_${state.global.idNext}`);

	const onConnect = (params: Edge<any> | Connection) => setElements((els) => addEdge(params, els));

	const onElementsRemove = (elsToRemove: Elements<any>) => setElements((els) => removeElements(elsToRemove, els));

	const onLoad: OnLoadFunc<any> = (_flowInstance) => setFlowInstance(_flowInstance);

	const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	const onDrop: DragEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
    if (!flowWrapper.current) return;

    const flowBounds = flowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = flowInstance.project({
      x: event.clientX - flowBounds.left,
      y: event.clientY - flowBounds.top,
    });
    const newNode = {
      id: nextId,
      type,
      position,
      data: {label: `${type} node`},
    };
    // setElements(es => es.concat(newNode));
    dispatch(newElement(newNode));
	};

	return (
		<ReactFlowProvider>
			<Container ref={flowWrapper}>
				<ReactFlow elements={elements} onConnect={onConnect} onElementsRemove={onElementsRemove} onLoad={onLoad} onDrop={onDrop} onDragOver={onDragOver}>
					<Background color="#aaa" gap={16} />
				</ReactFlow>
			</Container>
		</ReactFlowProvider>
	);
};

export { Panel as default };

const Container = styled.div`
  flex: 1;
`;
