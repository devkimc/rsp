import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const RadioWrapper = styled.div`
  & + & {
    margin-left: 20px;
  }
`;
