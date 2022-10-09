const Styles = (isMobileDisplay) => ({
  paper: {
    flexGrow: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 3,
    marginRight: 3,
    maxWidth: isMobileDisplay ? null : 480,
    paddingTop: 3,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 3,
  },
  title: {
    marginBottom: 2,
  },
  textField: {
    width: isMobileDisplay ? '36ch' : '64ch'
  }
});

export default Styles;