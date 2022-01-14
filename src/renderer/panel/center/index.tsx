import { nanoid } from "nanoid";
import {
    DragEventHandler,
    useCallback,
    useRef,
    useState,
} from "react";
import ReactFlow, {
    addEdge,
    Background,
    Connection,
    Node,
    Edge,
    Elements,
    OnLoadFunc,
    ReactFlowProvider,
    removeElements,
    OnLoadParams,
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "renderer/components/NavBar";
import {
    curElements,
    levelNext,
    levelSpec,
    RootState,
    updateElements,
} from "renderer/store/store";
import styled from "styled-components";

export const Panel = () => {
    const dispatch = useDispatch();

    const flowWrapper = useRef(null as HTMLDivElement | null);

    const [flowInstance, setFlowInstance] = useState(
        null as OnLoadParams<any> | null
    );

    const elements = useSelector((state: RootState) =>
        curElements(state.global)
    );

    const nodePath = useSelector((state: RootState) => state.global.nodePath);

    const onConnect = useCallback((params: Edge<any> | Connection) => {
        dispatch(updateElements(addEdge(params, elements)));
    }, []);

    const onElementsRemove = useCallback((elsToRemove: Elements<any>) => {
        dispatch(updateElements(removeElements(elsToRemove, elements)));
    }, []);

    const onLoad: OnLoadFunc<any> = useCallback(
        (_flowInstance) => setFlowInstance(_flowInstance),
        []
    );

    const onDragOver: DragEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        },
        []
    );

    const onNodeDoubleClick = useCallback(
        (event: React.MouseEvent<Element, MouseEvent>, node: Node<any>) => {
            dispatch(levelNext(node));
        },
        []
    );

    const onNodeDragStop = useCallback(
        (event: React.MouseEvent<Element, MouseEvent>, node: Node<any>) => {
            flowInstance &&
                dispatch(updateElements(flowInstance.getElements()));
        },
        [flowInstance]
    );

    const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.preventDefault();
            if (!flowWrapper.current) return;

            const flowBounds = flowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            const position = flowInstance?.project({
                x: event.clientX - flowBounds.left,
                y: event.clientY - flowBounds.top,
            });
            position &&
                dispatch(
                    updateElements(
                        elements.concat({
                            id: nanoid(),
                            type,
                            position,
                            data: { label: `${type} node` },
                        })
                    )
                );
        },
        [flowWrapper, flowInstance, elements]
    );

    return (
        <ReactFlowProvider>
            <Container>
                <NavBar
                    items={nodePath}
                    onClickItem={(id: string) => dispatch(levelSpec(id))}
                />
                <FlowContainer ref={flowWrapper}>
                    <ReactFlow
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeDoubleClick={onNodeDoubleClick}
                        onNodeDragStop={onNodeDragStop}
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

const FlowContainer = styled.div`
    flex: 1;
`;
