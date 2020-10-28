import React, { useState, useEffect } from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import SaveIcon from '@material-ui/icons/Save';

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import apis from '../api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    table: {
      minWidth: 650,
    },
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
);
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

type member = {
  _id: string;
  name: string;
};

export default function () {
  const [loading, isLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [nameList, setNameList] = useState<Array<member>>(Array(0));

  useEffect(() => {
    apis.readMember().then((users) => {
      setNameList(users.data.data);
    });
  }, [loading]);

  async function onChangeInputName(event: any) {
    const name: string = event.target.value;
    setName(name);
  }
  async function handleRegister() {
    const payload = { name: name.replace(/\s+/g, '') };
    await apis
      .createMember(payload)
      .then((res) => {
        // window.alert('Success!');
      })
      .catch((err) => {
        window.alert('error');
      });
    setName('');
    isLoading(!loading);
  }
  async function handleUpdate(event: any) {
    const id =
      event.nativeEvent.path[0].id ||
      event.nativeEvent.path[1].id ||
      event.nativeEvent.path[2].id ||
      event.nativeEvent.path[3].id ||
      event.nativeEvent.path[4].id;
    const payload = { name: name.replace(/\s+/g, '') };
    await apis
      .updateMember(id, payload)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        window.alert('ERROR');
      });
    isLoading(!loading);
  }
  async function handleDelete(event: any) {
    const id =
      event.nativeEvent.path[0].id ||
      event.nativeEvent.path[1].id ||
      event.nativeEvent.path[2].id ||
      event.nativeEvent.path[3].id;
    await apis
      .deleteMember(id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        window.alert(err);
      });
    isLoading(!loading);
  }

  // *******************************************
  function Row2(props: { row: member }) {
    const { row } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (
      event: React.ChangeEvent<{}>,
      isExpanded: boolean
    ) => {
      setExpanded(isExpanded ? panel : false);
    };

    return <React.Fragment></React.Fragment>;
  }

  // *****
  function Row(props: { row: member }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes2 = useStyles();
    const classes = useRowStyles();

    return (
      <React.Fragment>
        <TableRow className={classes.root} style={{ backgroundColor: 'gray' }}>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row' align='center'>
            {row.name}
          </TableCell>
          <TableCell align='center'>{row._id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                <Table size='small' aria-label='purchases'>
                  <TableBody>
                    <TableRow>
                      <TableCell component='th' scope='row' align='left'>
                        管理ID:{row._id}
                      </TableCell>
                      <TableCell align='left'>
                        <Grid container spacing={1} alignItems='flex-end'>
                          <Grid item>
                            <TextField
                              type='string'
                              value={name}
                              onChange={onChangeInputName}
                              label='氏名'
                            />
                          </Grid>
                          <Grid>
                            <Button
                              variant='contained'
                              color='secondary'
                              size='small'
                              className={classes2.button}
                              endIcon={<SaveIcon />}
                              id={row._id}
                              onClick={handleUpdate}
                            >
                              <SaveIcon />
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton
                          aria-label='delete'
                          id={row._id}
                          onClick={handleDelete}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  // *****

  const classes = useStyles();
  return (
    <div>
      <h1>Hello</h1>

      <div className={classes.margin}>
        <Grid container spacing={1} alignItems='flex-end'>
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              type='string'
              value={name}
              onChange={onChangeInputName}
              label='氏名'
            />
          </Grid>
          <Grid>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              endIcon={<SendIcon />}
              onClick={handleRegister}
            >
              登録
            </Button>
          </Grid>
        </Grid>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell>id</TableCell>
              <TableCell>action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nameList.map((row) => (
              <TableRow key={row._id}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell>{row._id}</TableCell>
                <TableCell>
                  <Grid container spacing={1} alignItems='flex-end'>
                    <Grid>
                      <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                        className={classes.button}
                        endIcon={<SaveIcon />}
                        id={row._id}
                        onClick={handleUpdate}
                      >
                        編集
                      </Button>
                    </Grid>
                    <Grid>
                      <IconButton
                        aria-label='delete'
                        id={row._id}
                        onClick={handleDelete}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align='center'>名前</TableCell>
              <TableCell align='center'>備考</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nameList.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

// *************************************************
