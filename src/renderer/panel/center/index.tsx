import { nanoid } from 'nanoid';
import { DragEventHandler, useRef, useState } from 'react';
import ReactFlow, {
	addEdge,
	Background,
	Connection,
	Node,
	Edge,
	Elements,
	OnLoadFunc,
	ReactFlowProvider,
	removeElements
} from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from 'renderer/components/NavBar';
import { curElements, levelNext, levelSpec, RootState, updateElements } from 'renderer/store/store';
import styled from 'styled-components';

export const Panel = () => {
	const dispatch = useDispatch();

	const flowWrapper = useRef(null as HTMLDivElement | null);

	const [ flowInstance, setFlowInstance ] = useState(null as any);

	const elements = useSelector((state: RootState) => curElements(state.global));

  const nodePath = useSelector((state: RootState) => state.global.nodePath);

	const onConnect = (params: Edge<any> | Connection) => dispatch(updateElements(addEdge(params, elements)));

	const onElementsRemove = (elsToRemove: Elements<any>) =>
		dispatch(updateElements(removeElements(elsToRemove, elements)));

	const onLoad: OnLoadFunc<any> = (_flowInstance) => setFlowInstance(_flowInstance);

	const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	const onNodeDoubleClick = (event: React.MouseEvent<Element, MouseEvent>, node: Node<any>) => {
		dispatch(levelNext(node));
	};

	const onDrop: DragEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		if (!flowWrapper.current) return;

		const flowBounds = flowWrapper.current.getBoundingClientRect();
		const type = event.dataTransfer.getData('application/reactflow');
		const position = flowInstance.project({
			x: event.clientX - flowBounds.left,
			y: event.clientY - flowBounds.top
		});
		dispatch(
			updateElements(
				elements.concat({
					id: nanoid(),
					type,
					position,
					data: { label: `${type} node` }
				})
			)
		);
	};

	return (
		<ReactFlowProvider>
			<Container>
        <NavBar items={nodePath} onClickItem={(id: string) => dispatch(levelSpec(id))}/>
				<FlowContainer ref={flowWrapper}>
        <ReactFlow
					elements={elements}
					onConnect={onConnect}
					onElementsRemove={onElementsRemove}
					onLoad={onLoad}
					onDrop={onDrop}
					onDragOver={onDragOver}
					onNodeDoubleClick={onNodeDoubleClick}
				>
					<Background color="#aaa" gap={16} />
				</ReactFlow>
        </FlowContainer>
			</Container>
		</ReactFlowProvider>
	);
};

export { Panel as default };

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const FlowContainer = styled.div`flex: 1;`;
