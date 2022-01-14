import { DragEvent, useCallback } from "react";
import styled, { css } from "styled-components";

interface ItemStyleProps {
    width: string;
    height: string;
    margin: string;
    borderRadius: string;
    border: string;
}

interface ItemProps {
    type: string;
    customStyle: ItemStyleProps;
}

const onDragStart = (event: DragEvent<HTMLDivElement>, type: string) => {
    event.dataTransfer?.setData("application/reactflow", type);
    event.dataTransfer && (event.dataTransfer.effectAllowed = "move");
};

const createItem = (props: ItemProps) => (
    <Item
        key={props.type}
        customStyle={props.customStyle || {}}
        onDragStart={useCallback((event) => onDragStart(event, props.type), [
            props.type,
        ])}
        draggable
    />
);

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
        type: "start",
        customStyle: itemStyle,
    },
    {
        type: "end",
        customStyle: itemStyle,
    },
    {
      type: "aa",
      customStyle: itemStyle,
  },
  {
      type: "bb",
      customStyle: itemStyle,
  },
  {
    type: "cc",
    customStyle: itemStyle,
},
{
    type: "dd",
    customStyle: itemStyle,
},
];

interface SuiteProps {}

export const SuiteBasic = (props: SuiteProps) => (
    <Container>{items.map((item) => createItem(item))}</Container>
);

const Container = styled.div`
    background-color: #d8d6d2;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
