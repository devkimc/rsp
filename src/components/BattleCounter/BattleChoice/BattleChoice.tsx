import * as Styled from "./BattleChoice.style";

type Props = {
  onChangeChoice?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BattleChoice = ({ onChangeChoice }: Props) => {
  return (
    <Styled.Container>
      <Styled.RadioWrapper>
        <input
          name="battle-choice"
          id="battle-choice-scissors"
          type="radio"
          value="가위"
          onChange={onChangeChoice}
        />
        <label htmlFor="battle-choice-scissors">가위</label>
      </Styled.RadioWrapper>

      <Styled.RadioWrapper>
        <input
          name="battle-choice"
          id="battle-choice-rock"
          type="radio"
          value="바위"
          onChange={onChangeChoice}
        />
        <label htmlFor="battle-choice-rock">바위</label>
      </Styled.RadioWrapper>

      <Styled.RadioWrapper>
        <input
          name="battle-choice"
          id="battle-choice-paper"
          type="radio"
          value="보"
          onChange={onChangeChoice}
        />
        <label htmlFor="battle-choice-paper">보</label>
      </Styled.RadioWrapper>
    </Styled.Container>
  );
};

export default BattleChoice;
