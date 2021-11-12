import {createTheme} from '@material-ui/core/styles';

export const BlackTheme = createTheme({
    palette : {

    },
    overrides:{
        MuiFormHelperText : {
            root:{
                color:'red',
                fontSize: '0.75rem',
            },
        },
    },
})