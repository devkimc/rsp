import { BattleResultType } from "~/App";
import * as Styled from "./BattleResultInfo.style";

type Props = {
  battleResult: BattleResultType;
};

const BattleResultInfo = ({ battleResult }: Props) => {
  const gameControllTxtFilter = (result: string) => {
    if (result === "가위") {
      return "scissors";
    } else if (result === "바위") {
      return "rock";
    } else {
      return "paper";
    }
  };

  return (
    <Styled.Container battleResult={battleResult.result}>
      YOU: {gameControllTxtFilter(battleResult.user)}, COMPUTER:{" "}
      {gameControllTxtFilter(battleResult.computer)}
    </Styled.Container>
  );
};

export default BattleResultInfo;
