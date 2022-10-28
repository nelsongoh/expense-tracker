const Styles = (isMobileDisplay) => ({
  box: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    marginTop: 3,
    marginBottom: 'auto',
    marginLeft: 3,
    marginRight: 3,
    maxWidth: isMobileDisplay ? null : 720,
    paddingTop: 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 2,
  },
  title: {
    marginBottom: 2,
  },
  formGrid: {
    flexWrap: 'nowrap', 
    overflowY: 'scroll'
  },
  paymentModeField: {
    width: isMobileDisplay ? '18ch' : '30ch'
  },
  issuerTypeField: {
    marginLeft: isMobileDisplay ? 3 : 0,
    width: isMobileDisplay ? '19ch' : '30ch'
  },
  currencyField: {
    width: isMobileDisplay ? '12ch' : '30ch'
  },
  amtField: {
    width: isMobileDisplay ? '25ch' : '30ch'
  },
  textField: {
    width: isMobileDisplay ? '39ch' : '64ch'
  },
  btn: {
    marginTop: isMobileDisplay ? 2 : 0
  }
});

export default Styles;