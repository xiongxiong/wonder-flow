import { DragEvent, memo } from "react";
import styled, { css } from "styled-components";
import { ItemProps, PanelProps } from "..";
import BasicEnd from "./nodes/End";
import BasicStart from "./nodes/Start";
import BasicProcess from "./nodes/Process";
import { MdOutlineNotStarted } from "react-icons/md";
import { BsFillSkipEndCircleFill } from "react-icons/bs";
import { SiNodered } from "react-icons/si";
import { AiTwotoneApi } from "react-icons/ai";
import { CgGitBranch, CgListTree } from "react-icons/cg";
import LogicTwo from "./nodes/LogicTwo";
import LogicThree from "./nodes/LogicThree";

const createItem = (props: ItemProps) => {
    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer?.setData("application/reactflow", props.type);
        event.dataTransfer && (event.dataTransfer.effectAllowed = "move");
    };
    let ItemIcon = SiNodered;
    switch (props.type) {
        case "basicStart":
            ItemIcon = MdOutlineNotStarted;
            break;
        case "basicEnd":
            ItemIcon = BsFillSkipEndCircleFill;
            break;
        case "basicProcess":
            ItemIcon = AiTwotoneApi;
            break;
        case "logicTwo":
            ItemIcon = CgGitBranch;
            break;
        case "logicThree":
            ItemIcon = CgListTree;
            break;
        default:
            break;
    }
    return (
        <Item
            key={props.type}
            onDragStart={onDragStart}
            draggable
        >
            <ItemIcon />
        </Item>
    );
};

const Item = styled.div.attrs({} as { })`
    background-color: white;
    user-select: none;
    cursor: grab;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: 8px;
    border-radius: 4px;
    border: none;

    &:hover {
      background-color: lightblue;
    }
`;

const items: ItemProps[] = [
    {
        type: "basicStart",
    },
    {
        type: "basicEnd",
    },
    {
        type: "basicProcess",
    },
    {
        type: "logicTwo",
    },
    {
        type: "logicThree",
    },
    {
        type: "default",
    },
];

const Panel = memo((props: PanelProps) => (
    <Container>{items.map((item) => createItem(item))}</Container>
));

const Container = styled.div`
    background-color: #eeece8;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export default {
    name: "basic",
    PanelRender: Panel,
    nodeTypes: {
        basicStart: BasicStart,
        basicEnd: BasicEnd,
        basicProcess: BasicProcess,
        logicTwo: LogicTwo,
        logicThree: LogicThree,
    },
};
