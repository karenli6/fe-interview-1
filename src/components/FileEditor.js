import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getFiles,
    getOpenFiles,
    getActiveFile,
    // removeFile,
    closeFile,
    selectFile,
    editFile,
} from './../store';
import styled from 'styled-components';
import {
    CloseFile,
} from './StyledComponents';
import { FILE_TYPES } from './../constants';
import { fileExtension } from './../helpers';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-mirage.css';
require( 'codemirror/mode/javascript/javascript' );
require( 'codemirror/mode/python/python' );
require( 'codemirror/mode/htmlmixed/htmlmixed' );
require( 'codemirror/mode/css/css' );
require( 'codemirror/addon/selection/active-line' );
require( 'codemirror/addon/display/autorefresh' );

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    flex: 1 1 auto;
    min-width: 0;
`;

const Tabs = styled.div`
    display: flex;
    flex: 0 0 auto;
`;

const Tab = styled.div`
    flex: 1 1 auto;
    min-width: 25px;
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${ props => props.active ? props.theme.fg : props.theme.bg };
    border-radius: .75rem .75rem 0 0;
`;

const Body = styled.div`
    background-color: ${ props => props.theme.bg };
    border-radius: 0 .5rem .5rem .5rem;
    padding: .5rem;
    display: flex;
    flex-direction: column;

    & .CodeMirror {
        border-radius: .5rem;
    }
`;

const TabName = styled.span`
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
`;

function FileEditor( fileID, fileName ) {
    const openFiles = useSelector( getOpenFiles );
    const files = useSelector( getFiles );
    const activeFileID = useSelector( getActiveFile );
    const dispatch = useDispatch();
    const activeFile = activeFileID ? files[ activeFileID ] : null;

    // CodeMirror only binds the onBlur handler on component mount.
    // this code is needed so that editFile uses the correct fileID
    // for the active file
    const activeFileIDRef = useRef( activeFileID );
    useEffect( () => {
        activeFileIDRef.current = activeFileID;
    }, [ activeFileID ] );

    return (
        <Container>
            <Tabs>
                { openFiles.map( fileID => {
                    const file = files[ fileID ];
                    return file && <Tab
                        key={ `tab-${ fileID }` }
                        active={ fileID === activeFileID }
                        onClick={ () => dispatch( selectFile( fileID ) ) }
                    >
                        <TabName>{ file.name }</TabName>
                        <CloseFile
                            onClick={ ( e ) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if ( fileID === activeFileID ) {
                                    const fileIndex = openFiles.indexOf( fileID );
                                    const nextFile = openFiles[ fileIndex ? 0 : 1 ]; 
                                    if ( nextFile ) dispatch( selectFile( nextFile ) );
                                }
                                // [PROBLEM 3] 
                                // Expected: (DID NOT WORK) Clicking the ‘x’ in a file tab in the Editor closes the tab without removing the file.
                                // Incorrect Previous Behavior: Clicking the 'x' removed the file and replaced it with a duplicate tab

                                // SOLUTION: Import and implement closeFile, not removeFile
                                dispatch(closeFile(fileID));
                            } }
                        >x</CloseFile>
                    </Tab>;
                } ) }
            </Tabs>
            <Body>
                { activeFile
                    ? <CodeMirror
                        value={ activeFile.content }
                        onBlur={ ( editor, ev ) => {
                            dispatch( editFile( activeFileIDRef.current, editor.getValue() ) );
                        }}
                        options={{
                            theme: 'ayu-mirage',
                            tabIndex: 0,
                            lineNumbers: true,
                            lineWrapping: false,
                            styleSelectedText: true,
                            autoRefresh: true,
                            styleActiveLine: true,
                            mode: FILE_TYPES[ fileExtension( activeFile.name ) ].mode,
                        }}
                    />
                    : <span>Open a file to edit</span>
                }
            </Body>
        </Container>
    );
}

export default FileEditor;
