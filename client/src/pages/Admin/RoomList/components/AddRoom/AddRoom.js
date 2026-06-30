import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Button,
  TextField,
  Typography,
  MenuItem
} from '@material-ui/core';
import styles from './styles';
import { Add } from '@material-ui/icons';
import {
  createRoom,
  updateRoom,
  removeRoom,
  getRooms
} from '../../../../../store/actions';

class AddRoom extends Component {
  state = {
    _id: '',
    name: '',
    cinemaId: '',
    seatsAvailable: '',
    seats: [],
    notification: {}
  };

  componentDidMount() {
    if (this.props.editRoom) {
      const { ...rest } = this.props.editRoom;
      this.setState({ ...rest });
    }
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onSubmitAction = async type => {
    const {
      getRooms,
      createRoom,
      updateRoom,
      removeRoom
    } = this.props;
    const {
      _id,
      name,
      cinemaId,
      seatsAvailable,
      seats
    } = this.state;
    const room = { name, cinemaId, seatsAvailable, seats };
    let notification = {};
    type === 'create'
      ? (notification = await createRoom(room))
      : type === 'update'
      ? (notification = await updateRoom(room, _id))
      : (notification = await removeRoom(_id));
    this.setState({ notification });
    if (notification && notification.status === 'success') getRooms();
  };

  handleSeatsChange = (index, value) => {
    if (value > 10) return;
    const { seats } = this.state;
    seats[index] = Array.from({ length: value }, () => 0);
    this.setState({
      seats
    });
  };

  onAddSeatRow = () => {
    this.setState(prevState => ({
      seats: [...prevState.seats, []]
    }));
  };

  renderSeatFields = () => {
    const { seats } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.field}>
          <Button onClick={() => this.onAddSeatRow()}>
            <Add /> add Seats
          </Button>
        </div>
        {seats.length > 0 &&
          seats.map((seat, index) => (
            <div key={`seat-${index}-${seat.length}`} className={classes.field}>
              <TextField
                key={`new-seat-${index}`}
                className={classes.textField}
                label={
                  'Add number of seats for row : ' +
                  (index + 10).toString(36).toUpperCase()
                }
                margin="dense"
                required
                value={seat.length}
                variant="outlined"
                type="number"
                inputProps={{
                  min: 0,
                  max: 10
                }}
                onChange={event =>
                  this.handleSeatsChange(index, event.target.value)
                }
              />
            </div>
          ))}
      </>
    );
  };

  render() {
    const { classes, className, cinemas } = this.props;
    const {
      name,
      cinemaId,
      seatsAvailable,
      notification
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const mainTitle = this.props.editRoom ? 'Edit Room' : 'Add Room';
    const submitButton = this.props.editRoom
      ? 'Update Room'
      : 'Save Details';
    const submitAction = this.props.editRoom
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
              select
              className={classes.textField}
              helperText="Please select the cinema"
              label="Cinema"
              margin="dense"
              required
              value={cinemaId}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('cinemaId', event.target.value)
              }>
              {cinemas && cinemas.map(cinema => (
                <MenuItem key={cinema._id} value={cinema._id}>
                  {cinema.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the room name"
              label="Room Name"
              margin="dense"
              required
              value={name}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Seats Available"
              margin="dense"
              required
              value={seatsAvailable}
              variant="outlined"
              type="number"
              onChange={event =>
                this.handleFieldChange('seatsAvailable', event.target.value)
              }
            />
          </div>
          {this.renderSeatFields()}
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
        {this.props.editRoom && (
          <Button
            color="secondary"
            className={classes.buttonFooter}
            variant="contained"
            onClick={() => this.onSubmitAction('remove')}>
            Delete Room
          </Button>
        )}

        {notification && notification.status ? (
          notification.status === 'success' ? (
            <Typography
              className={classes.infoMessage}
              color="primary"
              variant="caption">
              {notification.message}
            </Typography>
          ) : (
            <Typography
              className={classes.infoMessage}
              color="error"
              variant="caption">
              {notification.message}
            </Typography>
          )
        ) : null}
      </div>
    );
  }
}

AddRoom.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = null;
const mapDispatchToProps = {
  createRoom,
  updateRoom,
  removeRoom,
  getRooms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddRoom));
