import styled from 'styled-components';

import { shade } from 'polished';
import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;

  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;

  // Com isso, essa parte nunca vai ter mais que 700px
  // e a imagem sempre irá ter o tamanho restante disponível.
  max-width: 700px;

  form {
    margin: 80px 0;

    width: 340px;

    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      display: block;

      margin-top: 24px;

      color: #f4ede8;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;

    margin-top: 24px;

    color: #ff9000;
    text-decoration: none;

    transition: color 0.2s;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;

  background: url(${signInBackgroundImg}) no-repeat center;

  background-size: cover;
`;
