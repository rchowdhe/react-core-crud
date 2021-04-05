import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import clsx from 'clsx';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from "./style";
import UsersGrid from '../../pages/userdetails/UsersGrid';
import CreateEditUser from './../../pages/userdetails/CreateEditUser';

const LeftDrawer = () => {
  const classes = styles();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => { setDrawerOpen(true); };

  const handleDrawerClose = () => { setDrawerOpen(false); };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: drawerOpen })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: drawerOpen })}>
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent" className={clsx(classes.drawer, { [classes.drawerOpen]: drawerOpen, [classes.drawerClose]: !drawerOpen })}
        classes={{ paper: clsx({ [classes.drawerOpen]: drawerOpen, [classes.drawerClose]: !drawerOpen }) }}>

        <div className={classes.toolbar}>
          <Typography variant="h6" noWrap>
            CRUD Example
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" component={UsersGrid} />
          <Route exact path="/users" component={UsersGrid} />
          <Route exact path="/users/add" component={CreateEditUser} />
          <Route exact path="/users/:id/edit" component={CreateEditUser} />
        </Switch>
      </main>
    </div>
  );
};

export default LeftDrawer;
