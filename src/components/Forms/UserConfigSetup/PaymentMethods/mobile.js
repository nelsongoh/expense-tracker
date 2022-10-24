import Grid from '@mui/material/Unstable_Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Constants from '../../../../constants';
import Styles from './styles';

const PaymentMethodEntryMobileDisplay = ({ 
  paymentName, paymentIssuer, paymentType, errorMsgs, updatePaymentEntry,
  addPaymentMethod, removePaymentMethod, isMobileDisplay, paymentMethodData
}) => {
  const formStyles = Styles(isMobileDisplay);

  return (
    <Grid container direction="column" alignItems="center">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              { paymentMethodData.length > 0 ? <TableCell /> : null }
              <TableCell sx={formStyles.tablePadding}>{Constants.CONTENT.FORMS.USER_CONFIG_SETUP.PAYMENT_METHOD_FIELD}</TableCell>
              <TableCell sx={formStyles.tablePadding}>{Constants.CONTENT.FORMS.USER_CONFIG_SETUP.PAYMENT_ISSUER_FIELD}</TableCell>
              <TableCell sx={formStyles.tablePadding}>{Constants.CONTENT.FORMS.USER_CONFIG_SETUP.PAYMENT_TYPE_FIELD}</TableCell>
            </TableRow>
          </TableHead>
          { paymentMethodData.length > 0 ? 
            <TableBody>
              {paymentMethodData.map((paymentMethod, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Fab size="small" color="secondary" onClick={() => { removePaymentMethod(idx) }}>
                      <RemoveIcon />
                    </Fab>
                  </TableCell>
                  <TableCell sx={formStyles.tablePadding}>{paymentMethod.paymentName}</TableCell>
                  <TableCell sx={formStyles.tablePadding}>{paymentMethod.paymentIssuer}</TableCell>
                  <TableCell sx={formStyles.tablePadding}>{paymentMethod.paymentType}</TableCell>
                </TableRow>
              ))}
            </TableBody> : null 
          }
        </Table>
      </TableContainer>
      { 
        paymentMethodData.length === 0 ? 
        <Typography variant="body2" sx={formStyles.noPaymentMethodText}>
          {Constants.CONTENT.FORMS.USER_CONFIG_SETUP.NO_PAYMENT_METHODS}
        </Typography> : 
        null 
      }
      <Grid xs direction="column" alignItems="center" justifyContent="center" sx={formStyles.newEntryFormGrid}>
        <Grid xs sx={formStyles.paymentMethodNameField}>
          <TextField
            label={Constants.CONTENT.FORMS.USER_CONFIG_SETUP.PAYMENT_METHOD_FIELD}
            size='small' 
            value={paymentName}
            onChange={(e) => { updatePaymentEntry('paymentName', e.target.value) }}
            error={errorMsgs.paymentName !== null}
            helperText={ 
              errorMsgs.paymentName === null ? "" :
              errorMsgs.paymentName
            }
            fullWidth
          />
        </Grid>
        <Grid xs container direction="row" spacing={0}>
          <Grid xs>
            <TextField
              label={Constants.CONTENT.FORMS.USER_CONFIG_SETUP.PAYMENT_ISSUER_FIELD}
              size='small'
              value={paymentIssuer}
              onChange={(e) => { updatePaymentEntry('paymentIssuer', e.target.value) }}
              error={errorMsgs.paymentIssuer !== null}
              helperText={isMobileDisplay ? "" : 
                errorMsgs.paymentIssuer === null ? "" :
                errorMsgs.paymentIssuer
              }
              sx={formStyles.paymentMethodIssuerField}
            />
          </Grid>
          <Grid xs>
            <TextField 
              size='small' 
              select 
              value={paymentType}
              onChange={(e) => { updatePaymentEntry('paymentType', e.target.value) }}
              fullWidth
            >
              {Constants.CONTENT.PAYMENT_MODE.LIST.map((paymentMode) => (
                <MenuItem key={Math.random()} value={paymentMode.value}>{paymentMode.label}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs sx={{ paddingTop: 0 }}>
        <Fab color="primary" onClick={addPaymentMethod}>
          <AddIcon />
        </Fab>
      </Grid>
    </Grid>
  )
}

export default PaymentMethodEntryMobileDisplay;