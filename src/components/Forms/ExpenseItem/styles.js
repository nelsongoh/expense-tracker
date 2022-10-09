const Styles = (isMobileDisplay) => ({
  box: {
    flexGrow: 1,
    marginTop: isMobileDisplay ? 3 : 5,
  },
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
  paymentModeField: {
    width: isMobileDisplay ? '18ch' : '28ch'
  },
  issuerTypeField: {
    marginLeft: isMobileDisplay ? 3 : 0,
    width: isMobileDisplay ? '18ch' : '28ch'
  },
  currencyField: {
    width: isMobileDisplay ? '12ch' : '28ch'
  },
  amtField: {
    width: isMobileDisplay ? '24ch' : '28ch'
  },
  textField: {
    width: isMobileDisplay ? '36ch' : '64ch'
  },
  btn: {
    marginTop: isMobileDisplay ? 2 : 0
  }
});

export default Styles;