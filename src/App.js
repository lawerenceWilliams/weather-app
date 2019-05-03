import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// import PropTypes from 'prop-types';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';

// Styling For Button and Current TextBox
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
  // root: {
  //   width: '100%',
  //   maxWidth: 360,
  //   backgroundColor: theme.palette.background.paper,
  // },
});

class App extends React.Component {
  state = {
    zip: "",
    current: null,
    forecast: null
  }

  // Handles Changes To The Zip Field
  handleChange = zip => event => {
    this.setState({ [zip]: event.target.value });
  };

  // If You Dont Enter A Zip Code
  handleClick = () => {
    if (this.state.zip === '') return;

    // Current Weather Data
    fetch("http://api.openweathermap.org/data/2.5/weather?zip=" + this.state.zip + ",us&APPID=09cf8b76fde0210ec225a3bf23ccfdc0")
      .then(response => {
        return response.json();
      })
      .then(currentData => {
        this.setState({ current: currentData })
        console.log(currentData)
      });

    // Five Day Forcast
    fetch("http://api.openweathermap.org/data/2.5/forecast?zip=" + this.state.zip + ",us&APPID=09cf8b76fde0210ec225a3bf23ccfdc0")
      .then(response => {
        return response.json();
      })
      .then(forcastData => {
        this.setState({ forcast: forcastData })
      });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state)
    return (
      <div className="App">
      <h1>Weather App with 5day Forcast</h1>
      <h4>created by: Lawerence Williams</h4>

        <TextField
          label=" Enter Zip Code"
          value={this.state.zip}
          onChange={this.handleChange('zip')}
          margin="normal"
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
          Search
  </Button>



{/* function FolderList(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      <ListItem>
        <Avatar>
          <ImageIcon />
        </Avatar>
        <ListItemText primary="Current Temp" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <ListItemText primary="Today's Highs" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <Avatar>
          <BeachAccessIcon />
        </Avatar>
        <ListItemText primary="Today's Lows" secondary="July 20, 2014" />
      </ListItem>
      <ListItem>
        <Avatar>
          <BeachAccessIcon />
        </Avatar>
        <ListItemText primary="Current Weather Conditions" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );
} */}


        <br></br>
        Current Temp: <h2>{this.state.current ? this.state.current.main.temp : ''}</h2>
        High For Today: <h2>{this.state.current ? this.state.current.main.temp_max : ''}</h2>
        Low For Today: <h2>{this.state.current ? this.state.current.main.temp_min : ''}</h2>
        Current Weather Conditions: <h2>{this.state.current ? this.state.current.weather.description : ''}</h2>

        Five day / Three Hour Forcast Data:
        {this.state.forcast ? this.state.forcast.list.map(forcast => (
          <div>
            <h3>Temp: {forcast.main.temp}</h3>
            <h3>Humidity: {forcast.main.humidity}</h3>
          </div>
        )) : null}


      </div>
    )
  }
}

export default withStyles(styles)(App);
