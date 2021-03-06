import { makeStyles } from '@material-ui/styles';

const centeredStyleObj = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
export default makeStyles({
  container: {
    height: '70vh',
    ...centeredStyleObj,
  },
  cardContainer: {
    flexDirection: 'column',
    width: 500,
    height: 400,
    padding: '2rem',

    ...centeredStyleObj,
  },

  title: {
    fontSize: '3rem',
  },
  titleGridContainer: {
    ...centeredStyleObj,
  },
  innerPadding: {
    padding: '16px',
  },
  innerMargin: {
    margin: '16px',
  },
  loader: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});
