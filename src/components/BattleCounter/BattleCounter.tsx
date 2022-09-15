import { HandPaper, HandRock, HandScissors, Question } from "@images/index";
import BattleChoice from "./BattleChoice";
import * as Styled from "./BattleCounter.style";
import Hearts from "./Hearts";

type BattleCounterProps = {
  activeLife: number;
  isComputer?: boolean;
  battleChoice: string;
  computerBattleChoice: string;
  countDownNumber?: number;
  onChangeChoice?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BattleCounter = ({
  activeLife,
  isComputer = false,
  battleChoice,
  computerBattleChoice,
  countDownNumber,
  onChangeChoice,
}: BattleCounterProps) => {
  const choiceImgFilter = (choice: string) => {
    if (choice === "보") {
      return HandPaper;
    } else if (choice === "바위") {
      return HandRock;
    } else if (choice === "가위") {
      return HandScissors;
    } else {
      return Question;
    }
  };

  return (
    <Styled.Container>
      {isComputer && (
        <Styled.BattelChoiceImg
          src={
            Number(countDownNumber) < 0
              ? choiceImgFilter(computerBattleChoice)
              : Question
          }
          alt="컴퓨터 손"
        />
      )}
      {!isComputer && (
        <Styled.BattelChoiceImg
          src={choiceImgFilter(battleChoice)}
          alt="유저 손"
        />
      )}

      <Styled.ConputerName>
        {isComputer ? "Computer" : "YOU"}
      </Styled.ConputerName>

      <Hearts activeLife={activeLife} />

      {isComputer &&
        (Number(countDownNumber) < 0 ? computerBattleChoice : "생각중...")}
      {!isComputer && <BattleChoice onChangeChoice={onChangeChoice} />}
    </Styled.Container>
  );
};

export default BattleCounter;
