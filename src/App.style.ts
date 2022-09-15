import styled from "styled-components";
import Colors from "./constants/Colors";

type GameControlButtonProps = {
  battlePhase: number;
};

export const Container = styled.main`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

export const BattleRoundTitle = styled.h1`
  margin: 200px 0 100px;

  font-size: 30px;
  font-weight: bold;
`;

export const BattleGround = styled.section`
  display: flex;

  gap: 10px;
`;

export const CountDownNumber = styled.strong`
  padding-top: 100px;
  font-size: 32px;
`;

export const GameControlButton = styled.button<GameControlButtonProps>`
  width: 300px;
  height: 50px;

  margin: 80px 0 20px;

  border-radius: 6px;

  background-color: ${(props: GameControlButtonProps) =>
    props.battlePhase ? Colors.blue50 : Colors.red};

  font-size: 18px;
  color: white;
`;
