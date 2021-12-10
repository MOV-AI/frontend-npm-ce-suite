import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withTheme } from "../../../../decorators/withTheme";

function useTranslation() {
  return { t: s => s };
}

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    height: "100px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const FormDialog = props => {
  // Props
  const {
    onClose,
    title,
    message,
    onSubmit,
    onValidation,
    onPostValidation,
    submitText,
    inputLabel,
    loadingMessage,
    defaultValue,
    maxLength
  } = props;
  // State hook
  const [open, setOpen] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  const [validation, setValidation] = React.useState({
    error: false,
    message: ""
  });
  // Style hook
  const classes = useStyles();
  // Translation hook
  const { t } = useTranslation();

  /**
   * Handle dialog close
   * @param {Event} _ : Close Event
   * @param {String} reason : close reason
   * @returns
   */
  const handleClose = (_, reason) => {
    if (reason === "backdropClick") return;
    setOpen(false);
    if (onClose) onClose();
  };

  /**
   * Handle form submit
   */
  const handleSubmit = () => {
    const _validation = onChange(value);
    if (_validation.error) return;
    const result = onSubmit(value);
    if (result instanceof Promise) {
      setLoading(true);
      result.then(() => {
        setLoading(false);
        handleClose();
      });
    } else handleClose();
  };

  /**
   * On change TextField value
   * @param {String} _value : New value
   * @returns {ValidationResult}
   */
  const onChange = _value => {
    const res = onValidation(_value);
    // Set state
    setValidation({ error: !res.result, message: res.error });
    setValue(_value);
    if (onPostValidation && res.result) {
      onPostValidation(_value).then(result => {
        setValidation(result);
      });
    }
    // Return validation result
    return res;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {loadingMessage && isLoading ? loadingMessage : title}
      </DialogTitle>
      <DialogContent style={{ minWidth: 450 }}>
        {message && <DialogContentText>{message}</DialogContentText>}
        {isLoading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <TextField
            autoFocus={true}
            error={validation.error}
            helperText={validation.message}
            style={{ width: "100%" }}
            label={t(inputLabel)}
            InputLabelProps={{ shrink: true }}
            defaultValue={value}
            onPaste={event => {
              event.preventDefault();
              // Trim pasted text
              const pastedText = event.clipboardData
                .getData("text/plain")
                .trim()
                .replace(/(\r\n|\n|\r)/gm, "");
              // Validate pasted text
              onChange(pastedText);
              // Set text in input field
              event.target.value = pastedText;
            }}
            onKeyPress={event => {
              let isEnter = event.key === "Enter";
              if (isEnter) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            onChange={event => onChange(event.target.value)}
            inputProps={{ maxLength: maxLength }} // limit of characters here
            margin="normal"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {t("Cancel")}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={validation.error}
          color="primary"
        >
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTheme(FormDialog);

FormDialog.propTypes = {
  onValidation: PropTypes.func,
  onPostValidation: PropTypes.func,
  inputLabel: PropTypes.string,
  submitText: PropTypes.string,
  defaultValue: PropTypes.string,
  maxLength: PropTypes.number
};

FormDialog.defaultProps = {
  onValidation: () => ({ result: true, error: "" }),
  inputLabel: "Name",
  submitText: "Submit",
  defaultValue: "",
  maxLength: 40
};