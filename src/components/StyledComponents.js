import styled from 'styled-components';

export const CloseFile = styled.div`
    padding: 0 .25rem;
    margin-left: .5rem;
    cursor: pointer;
    color: ${ props => props.theme.grey };
    &:hover {
        color: ${ props => props.theme.white };
    }
`;
