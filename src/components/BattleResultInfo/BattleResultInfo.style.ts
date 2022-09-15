import styled from "styled-components";
import Colors from "~/constants/Colors";

type ContainertProps = {
  battleResult: number;
};

export const Container = styled.p<ContainertProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 50px;

  border-radius: 6px;

  background-color: ${(props: ContainertProps) =>
    props.battleResult === 0
      ? Colors.greyf7
      : props.battleResult === 1
      ? Colors.green96
      : Colors.redff};

  & + & {
    margin-top: 20px;
  }
`;
