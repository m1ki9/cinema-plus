import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography, Select } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import styles from './styles';
import { genreData, languageData } from '../../../../../data/MovieDataService';
import {
  addMovie,
  updateMovie,
  removeMovie
} from '../../../../../store/actions';

class AddMovie extends Component {
  state = {
    title: '',
    image: '',
    status: 'nowShowing',
    genre: [],
    language: '',
    duration: '',
    description: '',
    director: '',
    cast: '',
    releaseDate: new Date(),
    endDate: new Date(),
    ticketPrice: ''
  };

  componentDidMount() {
    if (this.props.edit) {
      const {
        title,
        image,
        status,
        language,
        genre,
        director,
        cast,
        description,
        duration,
        releaseDate,
        endDate,
        ticketPrice
      } = this.props.edit;
      this.setState({
        title,
        image: image || '',
        status: status || 'nowShowing',
        language,
        genre: genre.split(','),
        director,
        cast,
        description,
        duration,
        releaseDate,
        endDate,
        ticketPrice: ticketPrice || ''
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movie !== this.props.movie) {
      const { title, genre, language } = this.props.movie;
      this.setState({ title, genre, language });
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddMovie = () => {
    const { genre, ...rest } = this.state;
    const movie = { ...rest, genre: genre.join(',') };
    this.props.addMovie(null, movie);
  };

  onUpdateMovie = () => {
    const { genre, ...rest } = this.state;
    const movie = { ...rest, genre: genre.join(',') };
    this.props.updateMovie(this.props.edit._id, movie, null);
  };

  onRemoveMovie = () => this.props.removeMovie(this.props.edit._id);

  render() {
    const { classes, className } = this.props;
    const {
      title,
      image,
      status,
      genre,
      language,
      duration,
      description,
      director,
      cast,
      releaseDate,
      endDate,
      ticketPrice
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const subtitle = this.props.edit ? 'Edit Movie' : 'Add Movie';
    const submitButton = this.props.edit ? 'Update Movie' : 'Save Details';
    const submitAction = this.props.edit
      ? () => this.onUpdateMovie()
      : () => this.onAddMovie();

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {subtitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the title"
              label="Title"
              margin="dense"
              required
              value={title}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('title', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <Select
              multiple
              displayEmpty
              className={classes.textField}
              label="Genre"
              margin="dense"
              required
              value={genre}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('genre', event.target.value)
              }>
              {genreData.map((genreItem, index) => (
                <MenuItem key={genreItem + '-' + index} value={genreItem}>
                  {genreItem}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              multiline
              className={classes.textField}
              label="Description"
              margin="dense"
              required
              variant="outlined"
              value={description}
              onChange={event =>
                this.handleFieldChange('description', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <TextField
              select
              className={classes.textField}
              label="Language"
              margin="dense"
              required
              value={language}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('language', event.target.value)
              }>
              {languageData.map((langItem, index) => (
                <MenuItem key={langItem + '-' + index} value={langItem}>
                  {langItem}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className={classes.textField}
              label="Duration"
              margin="dense"
              type="number"
              value={duration}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('duration', event.target.value)
              }
            />
            <TextField
              className={classes.textField}
              label="Ticket Price"
              margin="dense"
              type="number"
              value={ticketPrice}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('ticketPrice', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Director"
              margin="dense"
              required
              value={director}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('director', event.target.value)
              }
            />
            <TextField
              className={classes.textField}
              label="Cast"
              margin="dense"
              required
              value={cast}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('cast', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="release-date"
                label="Release Date"
                value={releaseDate}
                onChange={date =>
                  this.handleFieldChange('releaseDate', date._d)
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />

              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="end-date"
                label="End Date"
                value={endDate}
                onChange={date => this.handleFieldChange('endDate', date._d)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.field}>
            <TextField
              select
              className={classes.textField}
              helperText="Where this movie appears"
              label="Status"
              margin="dense"
              required
              value={status}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('status', event.target.value)
              }>
              <MenuItem value="nowShowing">Now Showing</MenuItem>
              <MenuItem value="comingSoon">Coming Soon</MenuItem>
            </TextField>
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              className={classes.textField}
              helperText="Paste a direct image URL (e.g. https://.../poster.jpg)"
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
        {this.props.edit && (
          <Button
            color="secondary"
            className={classes.buttonFooter}
            variant="contained"
            onClick={this.onRemoveMovie}>
            Delete Movie
          </Button>
        )}
      </div>
    );
  }
}

AddMovie.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  movie: PropTypes.object
};

const mapStateToProps = ({ movieState }) => ({
  movies: movieState.movies
});

const mapDispatchToProps = { addMovie, updateMovie, removeMovie };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddMovie));
