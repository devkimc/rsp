import styled from "styled-components";
import { HeartActive, HeartBroken } from "@images/index";

export const Container = styled.div`
  position: relative;
  width: 300px;
  height: 100px;
`;

export const Hearts = styled.div`
  position: absolute;

  max-width: 100%;
  height: 100%;

  background-size: contain;
`;

export const ActiveHearts = styled(Hearts)<{ activeLife: number }>`
  width: ${({ activeLife }) => `calc(${activeLife / 3} * 100%)`};

  background-image: url(${HeartActive});
`;

export const BrokenHearts = styled(Hearts)`
  width: 100%;

  background-image: url(${HeartBroken});
`;
