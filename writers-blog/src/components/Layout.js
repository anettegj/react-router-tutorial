import React, { Component, Fragment } from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    Hidden,
    CssBaseline,
    MenuItem,
    MenuList,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

const drawerWidth = 240

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
})

class Layout extends Component {
    state = {
        mobileOpen: false,
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }

    render() {
        const { classes, location:{pathname}, children, writers } = this.props

        const drawer = (
            <div>
                <Hidden smDown>
                    <div className={classes.toolbar} />
                </Hidden>
                <MenuList>
                    <MenuItem selected={'/' === pathname} component={Link} to="/">
                        Home
                    </MenuItem>
                    <MenuItem selected={'/writers' === pathname} component={Link} to="/writers">
                        Writers
                    </MenuItem>
                    <MenuList>
                        {writers.map(writer => {
                            const to = `/writers/${writer.id}`
                        return <MenuItem 
                                    className={classes.nested} 
                                    key={writer.id} 
                                    component={Link} 
                                    to={to}
                                    selected={to === pathname}>
                                {writer.name}
                                </MenuItem>
                        })}
                    </MenuList>
                </MenuList>
            </div>
        )
        return (
            < Fragment>
                <CssBaseline/>
                <div className={classes.root}>
                    <AppBar position="absolute"  className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}
                            >
                                <Menu />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                Writers Blog
                  </Typography>
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            variant="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </div>
            </Fragment>
        )
    }
}

// export default withStyles(styles)(Layout)

// instead of nested these functions we can use a compose-function
export default 
    compose(
        withRouter,
        withStyles(styles))(Layout)
