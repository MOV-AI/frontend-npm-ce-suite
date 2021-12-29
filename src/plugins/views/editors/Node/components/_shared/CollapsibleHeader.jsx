import React from "react";
import PropTypes from "prop-types";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "5px 0px 5px 0px",
    width: "100%"
  },
  heading: {
    fontSize: "1.5rem"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  column: {
    flexBasis: "90%"
  }
}));

const CollapsibleHeader = props => {
  const { title, children, defaultExpanded } = props;
  const classes = useStyles();

  return (
    <Typography component="div" className={classes.root}>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="div" className={classes.column}>
            <Typography className={classes.heading}>{title}</Typography>
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails className={classes.details}>
          {children}
        </AccordionDetails>
      </Accordion>
    </Typography>
  );
};

CollapsibleHeader.propTypes = {
  title: PropTypes.element,
  defaultExpanded: PropTypes.bool
};

CollapsibleHeader.defaultProps = {
  title: <div>Title</div>,
  defaultExpanded: false
};

export default CollapsibleHeader;