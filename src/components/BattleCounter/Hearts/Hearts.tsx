import * as Styled from "./Hearts.style";

type HeartsProps = {
  activeLife: number;
};

const Hearts = ({ activeLife }: HeartsProps) => {
  return (
    <Styled.Container>
      <Styled.BrokenHearts />
      <Styled.ActiveHearts activeLife={activeLife} />
    </Styled.Container>
  );
};

export default Hearts;
