import React, { useState } from "react";
import Button from "@material-ui/core/Button"

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { green, orange, purple } from '@material-ui/core/colors';

import "./App.css";
import StackedBarChart from "./components/StackedBarChart";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      flexDirection: "row"
    },
  },
  margin: {
    margin: theme.spacing(1),
    flexDirection: "row"
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));


const colors = {
  "Initial Investment": "orange",
  "Accumulated Contributions": "purple",
  "Accumulated Interest": "green"
};

function App() {

  const [clicked, setClicked] = useState("none")

  const classes = useStyles();

  const [principal, setPrincipal] = useState(0)
  const [rate, setRate] = useState(0)
  const [years, setYears] = useState(0)
  const [frequency, setFrequency] = useState(12)
  const [additions, setAdditions] = useState(0)
//////



  const keys = ["Initial Investment", "Accumulated Contributions", "Accumulated Interest"];
  const [data, setData] = useState([
    {
      year: 0,
      "Initial Investment": 0,
      "Accumulated Contributions": 0,
      "Accumulated Interest": 0
    }
  ]);

  let additionsLabel = "monthly"
  
  if (frequency === 2) {
    additionsLabel = "semianually"
  }
  if (frequency === 1) {
    additionsLabel = "anually"
  }
  if (frequency === 360) {
    additionsLabel = "daily"
  }


  const reset = () => {
    setData([
      {
        year: 0,
        "Initial Investment": 0,
        "Accumulated Contributions": 0,
        "Accumulated Interest": 0
      }
    ])
    setClicked("none")
  }

  const calculate = () => {

    let total = [principal]
    let investments = [principal]
    let contributions = [0]
    let profit = [0]
    let final = []


    for (let i = 1; i <= years*frequency; i++) {
      if (frequency === 360) {
        total.push((total[i-1] * ((rate / 100) / frequency)) + additions + total[i-1])
        contributions.push(contributions[i-1] + additions)
        investments.push(investments[i-1] + additions)
        profit.push(total[i] - contributions[i] - principal)
        
        if (i % 360 === 0) {
          final.push({
            year: i/360,
            "Initial Investment": principal,
            "Accumulated Contributions": contributions[i],
            "Accumulated Interest": profit[i]
          })
        }
      }
      if (frequency === 12) {
        total.push((total[i-1] * ((rate / 100) / frequency)) + additions + total[i-1])
        contributions.push(contributions[i-1] + additions)
        investments.push(investments[i-1] + additions)
        profit.push(total[i] - contributions[i] - principal)
  
        if (i % 12 === 0) {
          final.push({
            year: i/12,
            "Initial Investment": principal,
            "Accumulated Contributions": contributions[i],
            "Accumulated Interest": profit[i]
          })
        }
      }
      if (frequency === 2) {
        total.push((total[i-1] * ((rate / 100) / frequency)) + additions + total[i-1])
        contributions.push(contributions[i-1] + additions)
        investments.push(investments[i-1] + additions)
        profit.push(total[i] - contributions[i] - principal)
  
        if (i % 2 === 0) {
          final.push({
            year: i/2,
            "Initial Investment": principal,
            "Accumulated Contributions": contributions[i],
            "Accumulated Interest": profit[i]
          })
        }
      }
      if (frequency === 1) {
        total.push((total[i-1] * ((rate / 100) / frequency)) + additions + total[i-1])
        contributions.push(contributions[i-1] + additions)
        investments.push(investments[i-1] + additions)
        profit.push(total[i] - contributions[i] - principal)
  
        final.push({
          year: i,
          "Initial Investment": principal,
          "Accumulated Contributions": contributions[i],
          "Accumulated Interest": profit[i]
        })
      }
    }

    setData([
      ...data, ...final
    ])

    setClicked("inline")
  }

  return (
    <React.Fragment>
      <h1 style={{"fontFamily": "Roboto, Helvetica, Arial, sans-serif"}}>Compound Interest Calculator</h1>
      <hr />
      <div className="label">
        <Icon className="fas fa-circle" style={{ color: green[700], display: "inline" }} fontSize="small" /> <p className="labelp">Accumulated Interest </p> <Icon className="fas fa-circle" style={{ color: purple[600], display: "inline" }} fontSize="small" /> <p className="labelp">Accumulated Additions</p> <Icon className="fas fa-circle" style={{ color: orange[500], display: "inline" }} fontSize="small" />  <p className="labelp">Initial Investment</p>
      </div>
      <StackedBarChart data={data} keys={keys} colors={colors} />
      {/*<StackedBarChart data={data} keys={keys} colors={colors} />*/}

      <div className="fields">
          <FormControl variant="outlined" className={classes.margin}>
            <InputLabel htmlFor="outlined-adornment-amount">Initial Investment</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={Number(principal)}
              onChange={e => {
                setPrincipal(Number(e.target.value))
              }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={122}
            />
          </FormControl>

          <FormControl variant="outlined" className={classes.margin}>
            <InputLabel htmlFor="outlined-adornment-amount">Interest Rate Per Year</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={Number(rate)}
              onChange={e => {
                setRate(Number(e.target.value))
              }}
              startAdornment={<InputAdornment position="start">%</InputAdornment>}
              labelWidth={160}
            />
          </FormControl>

          <FormControl variant="outlined" className={classes.margin}>
            <InputLabel htmlFor="outlined-adornment-amount">Years</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={Number(years)}
              onChange={e => {
                setYears(Number(e.target.value))
              }}
              labelWidth={40}
            />
          </FormControl>

          <FormControl>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
             Frequency
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={Number(frequency)}
              onChange={e => {
                setFrequency(Number(e.target.value))
              }}
              displayEmpty
            >
              <MenuItem value={360}>Daily</MenuItem>
              <MenuItem value={12}>Monthly</MenuItem>
              <MenuItem value={2}>Semiannually</MenuItem>
              <MenuItem value={1}>Annualy</MenuItem>
            </Select>
            <FormHelperText>Compound Interest Frequency</FormHelperText>
          </FormControl>

          <FormControl variant="outlined" className={classes.margin}>
            <InputLabel htmlFor="outlined-adornment-amount">Additions {`(${additionsLabel})`}</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={Number(additions)}
              onChange={e => {
                setAdditions(Number(e.target.value))
              }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={170}
              required
            />
          </FormControl>
          <div className={classes.root} id="container">
            <Button className="button" color="primary" variant="contained" size="large" onClick={calculate}>Submit</Button>
            <Button className="button" variant="contained" size="large" style={{display: clicked}} onClick={reset}>Reset</Button>
          </div>

      </div>

    </React.Fragment>
  );
}

export default App;