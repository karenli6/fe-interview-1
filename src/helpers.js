export const fileExtension = fileName => {
    return fileName.split( '.' )[ fileName.split( '.' ).length - 1 ];
};

export const fileNameIsValid = name => {
    /*eslint-disable-next-line no-useless-escape*/
    return !/[~`!#$%\^&*+=\ \[\]\\';,/{}|\\":<>\?]/g.test( name );
};
