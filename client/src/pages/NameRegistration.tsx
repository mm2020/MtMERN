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
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
  })
);
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Garage: React.FC = () => {
  const [loading, isLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [updateName, setUpdateName] = useState<string>('');
  const [nameList, setNameList] = useState<Array<any>>(Array(0));

  useEffect(() => {
    apis.getAll().then((users) => {
      setNameList(users.data.data);
    });
  }, [loading]);

  const onChangeInputName = async (event: any) => {
    const name: string = event.target.value;
    setName(name);
  };
  const onChangeInputUpdateName = async (event: any) => {
    const updateName: string = event.target.value;
    setUpdateName(updateName);
  };
  const handleRegister = async () => {
    const payload = { name: name.replace(/\s+/g, '') };
    await apis
      .post(payload)
      .then((res) => {
        // window.alert('Success!');
      })
      .catch((err) => {
        window.alert('error');
      });
    setName('');
    isLoading(!loading);
  };
  const handleUpdate = async (event: any) => {
    const id =
      event.nativeEvent.path[0].id ||
      event.nativeEvent.path[1].id ||
      event.nativeEvent.path[2].id ||
      event.nativeEvent.path[3].id ||
      event.nativeEvent.path[4].id;
    const payload = { name: updateName.replace(/\s+/g, '') };

    console.log(updateName);
    console.log(id);
    await apis
      .updateName(id, payload)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        window.alert('ERROR');
      });
    isLoading(!loading);
  };
  const handleDelete = async (event: any) => {
    const id =
      event.nativeEvent.path[0].id ||
      event.nativeEvent.path[1].id ||
      event.nativeEvent.path[2].id ||
      event.nativeEvent.path[3].id;
    await apis
      .NameDelete(id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        window.alert('削除できませんでした\nもう一度お試しください');
      });
    isLoading(!loading);
  };

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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nameList.map((row) => (
              <TableRow key={row._id}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row._id}</TableCell>
                <TableCell>
                  <Grid container spacing={1} alignItems='flex-end'>
                    <Grid item>
                      <TextField
                        type='string'
                        value={updateName}
                        onChange={onChangeInputUpdateName}
                        label='氏名'
                      />
                    </Grid>
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
              <TableCell>名前</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Garage;

function createData(name: string, price: number) {
  return {
    name,
    price,
    history: [{ date: '2020-01-05', customerId: '11091700' }],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  <TableCell component='th' scope='row'>
                    edit
                  </TableCell>
                  <TableCell>delete</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 3.99),
  createData('Ice cream sandwich', 4.99),
  createData('Eclair', 3.79),
  createData('Cupcake', 2.5),
  createData('Gingerbread', 1.5),
];

// // const useStyles = makeStyles({
// //   table: {
// //     minWidth: 650,
// //   },
// // });

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     margin: {
//       margin: theme.spacing(1),
//     },
//   })
// );

// // interface State {
// //   isLoading: boolean;
// //   // user?: {
// //   //   name: string;
// //   // };
// // }

// // class App extends React.Component<{}, State> {
// //   state: State = {
// //     isLoading: true, // 初期状態はロード中
// //     //user: undefined, // ユーザーデータ
// //   };

// //   componentDidMount() {
// //     loadUserData().then((user) => {
// //       this.setState({
// //         isLoading: false,
// //         //user,
// //       });
// //     });
// //   }

// //   render() {
// //     if (this.state.isLoading) {
// //       return <p>読み込み中</p>;
// //     }
// //     // ↓ここで型エラーが発生！！！！！（this.state.userがundefinedかもしれないので）
// //     return <p>こんにちは</p>;
// //   }
// // }

// interface Props {}
// interface State {
//   inputData: {
//     familyName?: string;
//     givenName?: string;
//   };
//   outputData:
//     | {
//         isLoading: true;
//       }
//     | {
//         isLoading: false;
//         fullNameList: Array<any>;
//       };
// }

// class NameRegister extends Component<Props, State> {
//   // constructor(props: Props) {
//   //   super(props);
//   //   this.state = {
//   //     inputData: {
//   //       familyName: '',
//   //       givenName: '',
//   //     },
//   //     outputData: {
//   //       isLoading: true,
//   //     },
//   //   };
//   // }

//   // componentDidMount = async () => {
//   //   await apis.getAll().then((samples) => {
//   //     // this.setState({
//   //     //   isLoading: false,
//   //     //   //project: 'tste',
//   //     // });
//   //   });
//   // };

//   // onChangeInputFamilyName = async (event: any) => {
//   //   const familyName: string = event.target.value;
//   //   this.setState({ inputData: { familyName } });
//   // };

//   // onChangeInputGivenName = async (event: any) => {
//   //   const givenName: string = event.target.value;
//   //   this.setState({ inputData: { givenName } });
//   // };

//   // handleRegister = async () => {
//   //   // const { project, name } = this.state;
//   //   // const payload = { project, name };
//   //   // await apis
//   //   //   .post(payload)
//   //   //   .then((res) => {
//   //   //     console.log(res);
//   //   //     window.alert('Success!');
//   //   //     //this.setState({
//   //   //     //  pI: res.data.id,
//   //   //     //  nI: res.data.messeage,
//   //   //     //});
//   //   //   })
//   //   //   .catch((err) => {
//   //   //     window.alert('error');
//   //   //   });
//   // };

//   render() {
//     const classes = this.props.useStyles;
//     // const { project, name } = this.state;

//     return (
//       <div>
//         <h1>Hello</h1>
//       </div>
//     );
//   }
// }

// export default NameRegister;
