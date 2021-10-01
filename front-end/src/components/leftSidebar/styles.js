import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    width: '25%',
    padding: '1.5rem 2rem'
  },
  profText: {
    marginLeft: '0.5rem',
    width: 'max-content',
    direction: 'ltr'
  },
  goodsNameParent: {
    marginRight: '0.5rem',
    width: 'max-content',
  },
  profName: {
    flex: 1,
  },
  profId: {
    flex: 1,
    color: theme.palette.text.hint,
    fontSize: '0.78rem'
  },
  goodsRoot: {
    background: "#f5f8fa",
    marginTop: "3rem",
    borderRadius: "2.5rem",
    padding: "11px 24px"
  },
  goodsTitle: {
    fontSize: '1.1rem !important',
    fontWeight: "600 !important",
    marginBottom: '11px'
  },
  goodsParent: {
    padding: '10px 0'
  },
  menu: {
    backgroundColor: 'white',
    padding: '1rem',
  },
  goodsImg: {
    width: 50,
    height: 50,
    borderRadius: '50%'
  }
}));


export default useStyles;