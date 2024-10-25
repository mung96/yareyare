import styled from '@emotion/native';
import {Text} from 'react-native';

const Container = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  font-size: 30px;
  margin-top: 20px;
`;

function App(): React.JSX.Element {
  return (
    <Container>
      <Text>리액트 네이티브</Text>
    </Container>
  );
}

export default App;
