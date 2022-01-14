import { DragEvent, memo, useCallback } from "react";
import styled, { css } from "styled-components";
import { ItemProps, ItemStyleProps, PanelProps } from "..";
import BasicEnd from "./nodes/BasicEnd";
import BasicStart from "./nodes/BasicStart";

const createItem = (props: ItemProps) => {
    const onDragStart = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            event.dataTransfer?.setData("application/reactflow", props.type);
            event.dataTransfer && (event.dataTransfer.effectAllowed = "move");
        },
        [props.type]
    );
    return (
        <Item
            key={props.type}
            customStyle={props.customStyle || {}}
            onDragStart={onDragStart}
            draggable
        />
    );
};

const Item = styled.div.attrs({} as { customStyle: ItemStyleProps })`
    background-color: lightblue;
    user-select: none;
    cursor: grab;

    ${(props) => css`
        width: ${props.customStyle.width};
        height: ${props.customStyle.height};
        margin: ${props.customStyle.margin};
        border-radius: ${props.customStyle.borderRadius};
        border: ${props.customStyle.border};
    `}
`;

const itemStyle: ItemStyleProps = {
    width: "40px",
    height: "40px",
    margin: "8px",
    borderRadius: "4px",
    border: "1px solid",
};

const items: ItemProps[] = [
    {
        type: "basicStart",
        customStyle: itemStyle,
    },
    {
        type: "basicEnd",
        customStyle: itemStyle,
    },
    {
      type: "default",
      customStyle: itemStyle,
  },
];

const Panel = memo((props: PanelProps) => (
    <Container>{items.map((item) => createItem(item))}</Container>
));

const Container = styled.div`
    background-color: #d8d6d2;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export default {
    name: "basic",
    panelRender: Panel,
    nodeTypes: {
        basicStart: BasicStart,
        basicEnd: BasicEnd,
    },
};
