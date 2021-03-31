import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getFiles,
    addFile,
    selectFile,
} from './../store';
import styled from 'styled-components';
import {
    CloseFile,
} from './StyledComponents';
import { FILE_TYPES } from './../constants';
import {
    fileExtension,
    fileNameIsValid,
} from './../helpers';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 0 1rem 1rem;
    flex: 0 0 250px;
`;

const FileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem;
    cursor: pointer;
    color: ${ props => props.theme.white };
    border-radius: .25rem;
    & .close-file {
        display: none;
    }

    &:hover {
        background-color: ${ props => props.theme.bg };
        & .close-file {
            display: inline-block;
        }
    }
`;

const FileName = styled.div`
    color: ${ props => props.theme.grey };
`;

const Header = styled.h4`
    color: ${ props => props.theme.grey };
`;

const FileIcon = styled.img`
    width: 1rem;
    margin-right: .25rem;
    height: auto;
`;

function File( { fileID, fileName } ) {
    const dispatch = useDispatch();
    const extension = fileExtension( fileName );
    return (
        <FileContainer
            onClick={ () => dispatch( selectFile( fileID ) ) }
        >
            <div style={ { display: 'flex', alignItems: 'center' } }>
                <FileIcon src={ `${ process.env.PUBLIC_URL }/${ extension }.svg` } />
                <FileName>{ fileName }</FileName>
            </div>
            <CloseFile
                className="close-file"
                onClick={ ( ev ) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                } }
            >x</CloseFile>
        </FileContainer>
    );
}

const NameFile = styled.input`
    color: ${ props => props.theme.white };
    border: ${ props => props.error ? `1px solid ${ props.theme.red }` : 'none' };
    border-radius: .25rem;
    background-color: transparent;
`;

const FilePlus = styled.div`
    padding: .5rem;
    margin-left: 1rem;
    cursor: pointer;
    color: ${ props => props.theme.grey };
    &:hover {
        color: ${ props => props.theme.white };
    }
`;

const ErrorText = styled.span`
    color: ${ props => props.theme.red };
`;

const validateFileName = ( name ) => {
    if ( !fileNameIsValid( name ) ) return 'File name must must not contain spaces or certain characters';
    const extension = fileExtension( name );
    const allowedExtensions = Object.keys( FILE_TYPES );
    if ( !allowedExtensions.includes( extension ) ) return `Allowed extensions are ${ allowedExtensions.join( ', ' ) }`;
    return null;
};

function AddFile() {
    const dispatch = useDispatch();
    const [ isAdding, setIsAdding ] = useState( false );
    const [ error, setError ] = useState( false );
    const createFile = ( ev ) => {
        const newFileName = ev.target.value;
        const validationError = validateFileName( newFileName );
        setError( validationError );
        if ( !validationError ) {
            setIsAdding( false );
            dispatch( addFile( newFileName ) );
        }
    };

    // set focus in new file input
    const nameFileRef = useRef( null );
    useEffect( () => {
        if ( isAdding ) nameFileRef.current.select();
    }, [ isAdding ] );

    return (
        <div>
            { isAdding
                ? <>
                    <FileContainer>
                        <NameFile id="name_file" type="text"
                            ref={( component ) => {
                                nameFileRef.current = component;
                            }}
                            defaultValue="new_file.txt"
                            onBlur={ createFile }
                            error={ error }
                            onKeyPress={ ev => {
                                if ( ev.key === 'Enter' ) nameFileRef.current.blur();
                            }}
                        />
                        <CloseFile
                            onClick={ () => {
                                setIsAdding( false );
                                setError( false );
                            } }
                        >x</CloseFile>
                    </FileContainer>
                    { error &&
                        <ErrorText>{ error }</ErrorText>
                    }
                </>
                : <FilePlus
                    onClick={ () => setIsAdding( true ) }
                >
                    +
                </FilePlus>
            }
        </div>
    );
}

function FileBrowser() {
    const files = useSelector( getFiles );
    return (
        <Container>
            <Header>Explorer</Header>
            { Object.entries( files ).map( ( fileEntry ) => {
                /*eslint-disable-next-line no-unused-vars*/
                const [ fileID, { name: fileName, ...data } ] = fileEntry;
                return <File key={ `file-${ fileName }` }
                    fileID={ fileID }
                    fileName={ fileName }
                />;
            } ) }
            <AddFile />
        </Container>
    );
}
export default FileBrowser;
