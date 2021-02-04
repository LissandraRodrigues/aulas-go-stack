import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`

  flex: 1;

`;
export const Header = styled.View`

  padding: 24px;

  background: #28262e;

  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  padding-top: ${getStatusBarHeight() + 24}px;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`;

export const BackButton = styled.TouchableOpacity`


`;

export const UserAvatar = styled.Image`

  width: 56px;
  height: 56px;

  border-radius: 28px;

  margin-left: auto;

`;
