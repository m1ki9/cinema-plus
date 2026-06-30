import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRooms, getCinemas } from '../../../store/actions';
import { withStyles } from '@material-ui/core';
import {
  CircularProgress,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@material-ui/core';
import { AddRoom } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import { match } from '../../../utils';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editRoom: null,
      openEditDialog: false,
      openAddDialog: false,
      search: ''
    };
  }

  componentDidMount() {
    this.props.getRooms();
    this.props.getCinemas();
  }

  openEditDialog = room => {
    this.setState({ openEditDialog: true, editRoom: room });
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editRoom: null });
  };

  OpenAddDialog = () => {
    this.setState({ openAddDialog: true });
  };

  CloseAddDialog = () => {
    this.setState({ openAddDialog: false });
  };

  getCinemaName = cinemaId => {
    const { cinemas } = this.props;
    const cinema = cinemas.find(c => c._id === cinemaId);
    return cinema ? cinema.name : 'N/A';
  };

  render() {
    const { classes, rooms, cinemas } = this.props;
    const { editRoom, search } = this.state;
    const filteredRooms = match(search, rooms, 'name');

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Typography variant="h4">Rooms</Typography>
            <Button
              onClick={() => this.OpenAddDialog()}
              color="primary"
              size="small"
              variant="outlined">
              Add Room
            </Button>
          </div>
          {filteredRooms.length === 0 ? (
            <CircularProgress />
          ) : (
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Room Name</TableCell>
                    <TableCell>Cinema</TableCell>
                    <TableCell>Seats Available</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRooms.map(room => (
                    <TableRow
                      key={room._id}
                      hover
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.openEditDialog(room)}>
                      <TableCell>{room.name}</TableCell>
                      <TableCell>{this.getCinemaName(room.cinemaId)}</TableCell>
                      <TableCell>{room.seatsAvailable}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </div>
        <ResponsiveDialog
          id="Add-room"
          open={this.state.openAddDialog}
          handleClose={() => this.CloseAddDialog()}>
          <AddRoom
            cinemas={cinemas}
            handleClose={() => this.CloseAddDialog()}
          />
        </ResponsiveDialog>
        <ResponsiveDialog
          id="Edit-room"
          open={this.state.openEditDialog}
          handleClose={() => this.CloseEditDialog()}>
          <AddRoom
            editRoom={editRoom}
            cinemas={cinemas}
            handleClose={() => this.CloseEditDialog()}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

RoomList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ roomState, cinemaState }) => ({
  rooms: roomState.rooms,
  cinemas: cinemaState.cinemas
});

const mapDispatchToProps = { getRooms, getCinemas };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RoomList));
