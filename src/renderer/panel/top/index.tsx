import styled, { css } from "styled-components";
import { MdDelete } from "react-icons/md";
import { AiOutlineControl } from "react-icons/ai";
import { RiSave3Fill } from "react-icons/ri";
import { IoIosMap } from "react-icons/io";
import { AiOutlineFullscreen } from "react-icons/ai";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "renderer/store/store";
import { hasSelection, removeSelection } from "renderer/store/project/data";
import { toggleControls, toggleMiniMap } from "renderer/store/project/setting";

const Panel = () => {
    const dispatch = useDispatch();

    const canDelete = useSelector((state: RootState) =>
        hasSelection(state.project.data)
    );

    const onDelete = useCallback(() => {
        canDelete && dispatch(removeSelection());
    }, [canDelete]);

    const showControls = useSelector(
        (state: RootState) => state.project.setting.showControls
    );

    const onToggleControls = useCallback(() => {
        dispatch(toggleControls());
    }, []);

    const showMiniMap = useSelector(
        (state: RootState) => state.project.setting.showMiniMap
    );

    const onToggleMiniMap = useCallback(() => {
        dispatch(toggleMiniMap());
    }, []);

    return (
        <Container>
            <Group>
                <Button>
                    <RiSave3Fill />
                </Button>
            </Group>
            <Group>
                <Button onClick={onDelete} disabled={!canDelete}>
                    <MdDelete />
                </Button>
            </Group>
            <Group>
                <Button>
                    <AiOutlineFullscreen />
                </Button>
                <Button onClick={onToggleControls} selected={showControls}>
                    <AiOutlineControl />
                </Button>
                <Button onClick={onToggleMiniMap} selected={showMiniMap}>
                    <IoIosMap />
                </Button>
            </Group>
        </Container>
    );
};

export { Panel as default };

const Container = styled.div`
    height: 40px;
    padding: 4px 4px;
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Group = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.div.attrs({} as { disabled: boolean; selected: boolean })`
    width: 32px;
    height: 32px;
    margin: 0px 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed lightgray;
    border-radius: 4px;

    ${(props) =>
        props.disabled
            ? css`
                  color: lightgray;
              `
            : css`
                  &:hover {
                      background-color: lightgray;
                  }
                  &:active {
                      background-color: white;
                  }
              `}

    ${(props) =>
        props.selected &&
        css`
            color: white;
            background-color: lightskyblue;
        `}
`;
