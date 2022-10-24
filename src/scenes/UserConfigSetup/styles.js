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
    maxWidth: isMobileDisplay ? null : 640,
    paddingTop: 3,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 3,
  },
  title: {
    marginBottom: 2,
  },
  stepper: {
    paddingLeft: 0,
    paddingRight: 0
  },
  step: {
    '& .MuiStepLabel-root .Mui-completed': {
      color: 'green', // circle color (COMPLETED)
    },
    '& .MuiStepLabel-root .Mui-active': {
      color: 'primary.main', // circle color (ACTIVE)
    },
    '& .MuiStepLabel-root .Mui-error': {
      color: 'red', // circle color (ERROR)
    },
  },
  configFields: {
    paddingLeft: 0, 
    paddingRight: 0,
  }
});

export default Styles;