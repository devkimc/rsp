import { useState, useEffect, useRef } from "react";
import * as Styled from "./App.style";
import { BattleCounter, BattleResultInfo } from "./components";

type BattleChoiceValueType = {
  [prop: string]: number;
  가위: number;
  바위: number;
  보: number;
};

export type BattleResultType = {
  result: number;
  user: string;
  computer: string;
};

function App() {
  const [battleChoice, setBattleChoice] = useState<string>("");
  const [computerBattleChoice, setComputerBattleChoice] = useState<string>("");
  const [battlePhase, setBattlePhase] = useState<number>(2);
  const [countDownNumber, setCountDownNumber] = useState<number>(4);
  const [roundBattleResult, setRoundBattleResult] = useState<string>("");
  const interval: { current: NodeJS.Timeout | null } = useRef(null);

  const userLocalStorage = Number(localStorage.getItem("userActiveLife"));
  const computerLocalStorage = Number(
    localStorage.getItem("computerActiveLife")
  );
  const battleResultStorage = localStorage.getItem("battleResult");
  const roundBattleResultArr: string[] = ["Draw", "Win", "Lose"];
  const battleResultObj: BattleResultType = {
    result: -1,
    user: battleChoice,
    computer: computerBattleChoice,
  };
  const battleChoiceValue: BattleChoiceValueType = {
    가위: 1,
    바위: 0,
    보: -1,
  };

  /* 초기화 */
  const initBattleResultData = () => {
    localStorage.setItem("userActiveLife", "3");
    localStorage.setItem("computerActiveLife", "3");
    localStorage.setItem("battleResult", JSON.stringify([]));
  };

  useEffect(() => {
    initBattleResultData();
  }, []);

  /* 게임 시작 로직 */
  const validateBattleChoice = () => {
    if (battleChoice === "") {
      window.alert("'가위/바위/보' 중 하나를 선택해주세요!");
      return false;
    } else {
      return true;
    }
  };

  const setRandomBattleChoice = () => {
    const randomNumber = Math.round(Math.random() * 10);
    if (randomNumber % 3 === 0) {
      setComputerBattleChoice("가위");
    } else if (randomNumber % 3 === 1) {
      setComputerBattleChoice("바위");
    } else {
      setComputerBattleChoice("보");
    }
  };

  const countDown = () => {
    setCountDownNumber((prev: number) => prev - 1);
  };

  const onStartBattle = () => {
    interval.current = setInterval(countDown, 1000);
    setCountDownNumber(3);
    setRandomBattleChoice();
  };

  const initRoundBattleData = () => {
    setBattlePhase(2);
    setCountDownNumber(4);
    setComputerBattleChoice("");
  };

  const onClickGameControll = () => {
    if (battlePhase === 2) {
      if (!validateBattleChoice()) return;
      onStartBattle();
    } else if (battlePhase === 1) {
      initRoundBattleData();
    } else {
      initRoundBattleData();
      initBattleResultData();
    }
  };

  /* 게임 결과 반영 로직 */
  const decreaseActiveLife = (object: string) => {
    const nextActiveLife =
      Number(localStorage.getItem(`${object}ActiveLife`)) - 1;
    localStorage.setItem(`${object}ActiveLife`, String(nextActiveLife));
  };

  const setLocalStorageBattleResult = (result: number) => {
    battleResultObj.result = result;
    setRoundBattleResult(roundBattleResultArr[result]);

    const battleResultParse =
      battleResultStorage && JSON.parse(battleResultStorage);
    battleResultParse.push(battleResultObj);
    localStorage.setItem("battleResult", JSON.stringify(battleResultParse));

    if (result === 1) {
      decreaseActiveLife("computer");
    } else if (result === 2) {
      decreaseActiveLife("user");
    }
  };

  const setBattleResult = () => {
    const result =
      battleChoiceValue[battleChoice] - battleChoiceValue[computerBattleChoice];

    if (result === 0) {
      setLocalStorageBattleResult(0);
    } else if ([-1, 2].includes(result)) {
      setLocalStorageBattleResult(1);
    } else {
      setLocalStorageBattleResult(2);
    }
  };

  useEffect(() => {
    if (countDownNumber < 0) {
      clearInterval(interval.current as NodeJS.Timeout);
      setBattlePhase(1);
      setBattleResult();
    }
  }, [countDownNumber]);

  useEffect(() => {
    if (!userLocalStorage && battlePhase === 1) {
      alert("컴퓨터가 승리하였습니다.");
      setBattlePhase(0);
    }

    if (!computerLocalStorage && battlePhase === 1) {
      alert("당신이 승리하였습니다.");
      setBattlePhase(0);
    }
  }, [battlePhase]);

  /* 필터와 props */
  const gameControllTxtFilter = () => {
    if (battlePhase === 0) {
      return "다시 시작하기";
    } else if (battlePhase === 1) {
      return "재대결하기";
    } else {
      return "대결!";
    }
  };

  const onChangeChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBattleChoice(e.target.value);
  };

  return (
    <Styled.Container>
      <Styled.BattleRoundTitle>
        {`ROUND: ${JSON.parse(String(battleResultStorage)).length}`}
      </Styled.BattleRoundTitle>

      <Styled.BattleGround>
        <BattleCounter
          activeLife={userLocalStorage}
          battleChoice={battleChoice}
          computerBattleChoice={computerBattleChoice}
          onChangeChoice={onChangeChoice}
        />

        <Styled.CountDownNumber>
          {countDownNumber > 3 && "READY"}
          {countDownNumber <= 3 && countDownNumber >= 0
            ? countDownNumber
            : null}
          {countDownNumber < 0 && roundBattleResult}
        </Styled.CountDownNumber>

        <BattleCounter
          activeLife={computerLocalStorage}
          isComputer
          battleChoice={battleChoice}
          computerBattleChoice={computerBattleChoice}
          countDownNumber={countDownNumber}
        />
      </Styled.BattleGround>

      <Styled.GameControlButton
        onClick={onClickGameControll}
        battlePhase={battlePhase}
      >
        {gameControllTxtFilter()}
      </Styled.GameControlButton>

      {JSON.parse(String(battleResultStorage)).map(
        (battleResult: BattleResultType) => (
          <BattleResultInfo battleResult={battleResult} />
        )
      )}
    </Styled.Container>
  );
}

export default App;
