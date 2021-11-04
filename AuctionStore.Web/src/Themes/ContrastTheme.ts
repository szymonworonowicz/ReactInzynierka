import {createTheme} from '@material-ui/core/styles';

export const ContrastTheme = createTheme({
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