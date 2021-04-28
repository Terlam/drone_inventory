import React, { useState } from 'react';
import {
    Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    Theme,
    useTheme,
    makeStyles,
    createStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { RouteComponentProps, withRouter, Switch, Route } from "react-router-dom";

import { DataTable } from '../../components'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => //we want a theme to go here, which will be type Theme
    // theme will be passed into makeStyles, 
    // which is used to create the object createStyles
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2) //2 spaces to the right
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: { //making the drawer like a paper
            width: drawerWidth
        },
        drawerHeader: { //drawerHeader is a class.
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ///necessary for content to be shown below app bar
            ...theme.mixins.toolbar, //spread operators, take the values within theme.mixins.toolbar component and copy that down here.
            justifyContent: 'flex-end'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transitions: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            marginLeft: -drawerWidth
        },
        toolbar: {
            display: 'flex',
        },
        toolbar_button: {
            marginLeft: 'auto'
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        }
    }));

// Create a interface to display a prop in a certain structure
// this will be used in dashboard
interface DashProps {
    history: RouteComponentProps['history'];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
    // checks if the path that we set for dashboard in 
    // the index.tsx is equal to the url that we are at.
    //if it is, then match is true and we can go through the Dashboard object.
}

export const Dashboard = withRouter((props: DashProps) => {
    console.log(props)

    // Deconstruct the history value from the props object
    const { history } = props;

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false) //create variable open and a setter (set the value of open to false)

    const handleDrawerOpen = () => {
        setOpen(true) //when handle drawer open is called, it sets open to TRUE
    }

    const handleDrawerClose = () => {
        setOpen(true)
    }

    const itemsList = [
        {
            text: 'Home',
            onClick: () => history.push('/')
        },
        {
            text: 'Sign In',
            onClick: () => history.push('/signin')
        }
    ]
    return (
        <div className={classes.root}>
            <CssBaseline />   {/* help keep things from overlapping */}
            <AppBar position='fixed' className={clsx(classes.appBar, { [classes.appBarShift]: open })}>
                <Toolbar className={classes.toolbar}>
                    <IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' className={clsx(classes.menuButton, open && classes.hide)}>
​                          <MenuIcon />
                    </IconButton> 
                    <Typography> Dashboard </Typography>
                    <Button className = {classes.toolbar_button}>Create new Drone</Button>
                </Toolbar>
            </AppBar>

           
      <MUIDrawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        {itemsList.map((item, index) => {
          const { text, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
        </List>
      </MUIDrawer>
      <main className = {clsx(classes.content, { [classes.contentShift]: open})}>
          <div className={classes.drawerHeader} />
              <h1>Hello world until data shows up...</h1>
                <DataTable />
      </main>
        </div >
    )
})