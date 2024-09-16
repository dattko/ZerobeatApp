import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  height: 46px;
  flex-direction: row;
  align-items: center;
  padding:  0 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.lightGray};
  background-color: ${props => props.theme.colors.darkGray};
`;

export const HeaderContent = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
`;