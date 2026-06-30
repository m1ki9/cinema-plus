import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';
import styles from './styles';
import {
  getCinemas,
  createCinemas,
  updateCinemas,
  removeCinemas
} from '../../../../../store/actions';

class AddCinema extends Component {
  state = {
    _id: '',
    name: '',
    image: '',
    city: '',
    notification: {}
  };

  componentDidMount() {
    if (this.props.editCinema) {
      const { image, ...rest } = this.props.editCinema;
      this.setState({ ...rest, image: image || '' });
    }
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onSubmitAction = async type => {
    const { getCinemas, createCinemas, updateCinemas, removeCinemas } = this.props;
    const { _id, name, image, city } = this.state;
    const cinema = { name, city, image };
    let notification = {};
    type === 'create'
      ? (notification = await createCinemas(null, cinema))
      : type === 'update'
      ? (notification = await updateCinemas(null, cinema, _id))
      : (notification = await removeCinemas(_id));
    this.setState({ notification });
    if (notification && notification.status === 'success') getCinemas();
  };

  render() {
    const { classes, className } = this.props;
    const { name, image, city, notification } = this.state;

    const rootClassName = classNames(classes.root, className);
    const mainTitle = this.props.editCinema ? 'Edit Cinema' : 'Add Cinema';
    const submitButton = this.props.editCinema ? 'Update Cinema' : 'Save Details';
    const submitAction = this.props.editCinema
      ? () => this.onSubmitAction('update')
      : () => this.onSubmitAction('create');

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {mainTitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the cinema name"
              label="Name"
              margin="dense"
              required
              value={name}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
            />
            <TextField
              fullWidth
              className={classes.textField}
              label="City"
              margin="dense"
              required
              variant="outlined"
              value={city}
              onChange={event =>
                this.handleFieldChange('city', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              className={classes.textField}
              helperText="Paste a direct image URL (e.g. https://.../photo.jpg)"
              label="Image URL"
              margin="dense"
              value={image}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('image', event.target.value)
              }
            />
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
        {this.props.editCinema && (
          <Button
            color="secondary"
            className={classes.buttonFooter}
            variant="contained"
            onClick={() => this.onSubmitAction('remove')}>
            Delete Cinema
          </Button>
        )}

        {notification && notification.status ? (
          notification.status === 'success' ? (
            <Typography className={classes.infoMessage} color="primary" variant="caption">
              {notification.message}
            </Typography>
          ) : (
            <Typography className={classes.infoMessage} color="error" variant="caption">
              {notification.message}
            </Typography>
          )
        ) : null}
      </div>
    );
  }
}

AddCinema.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = null;
const mapDispatchToProps = { getCinemas, createCinemas, updateCinemas, removeCinemas };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddCinema));
