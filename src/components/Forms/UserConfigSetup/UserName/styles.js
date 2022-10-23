const Styles = (isMobileDisplay) => ({
  buttons: {
    marginTop: 5,
  },
  textField: {
    marginTop: 6,
    width: isMobileDisplay ? '36ch' : '74ch'
  },
});

export default Styles;