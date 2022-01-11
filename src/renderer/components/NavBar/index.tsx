import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";

interface NavBarItemProps {
  id: string;
  label: string;
  icon?: string;
  isTail?: boolean;
}

interface NavBarItemPropsExtend extends NavBarItemProps {
  onClick: (id: string) => void;
}

const NavBarItem = (props: NavBarItemPropsExtend) => {
  const { id, icon, label, isTail = false, onClick } = props;

  return (
    <ItemContainer key={id} onClick={() => !isTail && onClick && onClick(id)}>
      {icon && <div />}
      <p>{label}</p>
      {!isTail && <IoIosArrowForward />}
    </ItemContainer>
  );
};

interface NavBarProps {
  items: NavBarItemProps[];
  onClickItem: (id: string) => void;
}

export const NavBar = (props: NavBarProps) => {
  const { items, onClickItem } = props;

  return (
    <Container>
      {items.map((item, index, array) =>
        NavBarItem({ ...item, onClick: onClickItem, isTail: index === array.length - 1 })
      )}
    </Container>
  );
};

export { NavBar as default };

const Container = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 4px 8px;
  font-size: smaller;
  color: orange;
  background-color: aliceblue;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  & :hover {
    cursor: default;
    text-decoration: underline;
    text-decoration-color: orange;
  }
`;
