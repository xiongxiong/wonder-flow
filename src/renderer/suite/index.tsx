import { MemoExoticComponent } from "react";
import { NodeTypesType } from "react-flow-renderer";

export interface SuitePanelProps {
    name: string;
    PanelRender: MemoExoticComponent<(props: PanelProps) => JSX.Element>;
}

export interface SuiteInfo extends SuitePanelProps {
    nodeTypes: NodeTypesType;
}

export interface PanelProps {}

export interface ItemProps {
    type: string;
}
