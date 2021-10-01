import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    header: {
        paddingTop: 18,
        paddingLeft: 18,
        paddingBottom: 18,
        paddingRight: 120,
        backgroundColor: 'white',
        display: 'flex'
    }, headerTitle: {
        fontSize: '1.2rem',
        fontWeight: 600,
        marginRight: '0.5rem'
    },
}));


export default useStyles;