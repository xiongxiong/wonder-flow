import { MemoExoticComponent } from "react";
import { NodeTypesType } from "react-flow-renderer";

export interface SuitePanelProps {
  name: string;
  panelRender: MemoExoticComponent<(props: PanelProps) => JSX.Element>;
}

export interface SuiteInfo extends SuitePanelProps {
    nodeTypes: NodeTypesType;
}

export interface PanelProps {}

export interface ItemStyleProps {
    width: string;
    height: string;
    margin: string;
    borderRadius: string;
    border: string;
}

export interface ItemProps {
    type: string;
    customStyle: ItemStyleProps;
}
