export const fileExtension = fileName => {
    return fileName.split( '.' )[ fileName.split( '.' ).length - 1 ];
};

export const fileNameIsValid = (name, nameArray) => {
    // Solution to PROBLEM 1
    /*eslint-disable-next-line no-useless-escape*/
    if (nameArray.includes(name)){
        return 'File name already exists.'
    } else if (/[~`!#$%\^&*+=\ \[\]\\';,/{}|\\":<>\?]/g.test( name )){
        return 'File name must must not contain spaces or certain characters.'
    } else{
        return 'valid'
    }
};
 