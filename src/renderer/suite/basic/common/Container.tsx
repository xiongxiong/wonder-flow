import styled, { css } from "styled-components";

export const Container = styled.div.attrs({} as { selected: boolean })`
    width: 180px;
    height: 30px;
    border: 1px solid;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-small;

    ${(props) =>
        props.selected &&
        css`
            box-shadow: 0px 0px 1px 2px lightgray;
        `}
`;
