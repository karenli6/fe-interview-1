import FileBrowser from './FileBrowser';
import FileEditor from './FileEditor';
import styled, { ThemeProvider } from 'styled-components';
import { THEME } from './../constants';

const Container = styled.div`
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    color: ${ props => props.theme.white };
`;

const Header = styled.div`
    flex: 0 0 50px;
    background-color: ${ props => props.theme.bg };
    text-align: center;
    color: ${ props => props.theme.white };
`;

const Body = styled.div`
    flex: 1 1 auto;
    display: flex;
`;

function App() {
    return (
        <ThemeProvider theme={ THEME }>
            <Container>
                <Header>
                    <h3>
                    Simple IDE
                    </h3>
                </Header>
                <Body>
                    <FileBrowser />
                    <FileEditor />
                </Body>
            </Container>
        </ThemeProvider>
    );
}

export default App;
