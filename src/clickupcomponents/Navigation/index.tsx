import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import windowSize from 'react-window-size';
import NavContent from './NavContent';
import OutsideClick from './OutsideClick';

import * as actionTypes from './../../store/actions';
import navigation from '../../menu-items';
import { initialState } from './../../store/reducer';
import Axios from 'axios';
interface INavigationProps extends React.HTMLAttributes<Element> {
    windowWidth?: any;
    fullWidthLayout?: any;
    collapseMenu?: any;
    layout?: any;
    navFixedLayout?: any;
    headerFixedLayout?: any;
    onChangeLayout?: any;
    layoutType: string;
}
class Navigation extends Component<INavigationProps, {}> {
    resize = () => {
        const contentWidth = document.getElementById('root').clientWidth;
        if (this.props.layout === 'horizontal' && contentWidth < 992) {
            this.props.onChangeLayout('vertical');
        }
    };
    // Calling the projects from the api to the sidebar
    getAllProjects = async () => {
        const allProjects = await Axios.get('http://192.168.1.36:8080//api/get_all_projects');
        const projects = allProjects.data.result.map((obj: any) => ({
            id: obj.project_Id,
            title: obj.name,
            type: 'item',
            icon: 'feather icon-box',
            url: '/space/'+obj.project_Id
        }));
        navigation.items[2].children[0].children=projects;
       
    };
    componentDidMount() {
        this.resize();
        this.getAllProjects();
        window.addEventListener('resize', this.resize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
    scroll = () => {
        if (this.props.navFixedLayout && this.props.headerFixedLayout === false) {
            const el = document.querySelector<HTMLDivElement>('.pcoded-navbar.menupos-fixed');
            const scrollPosition = window.pageYOffset;
            if (scrollPosition > 60) {
                el.style.position = 'fixed';
                el.style.transition = 'none';
                el.style.marginTop = '0';
            } else {
                el.style.position = 'absolute';
                el.style.marginTop = '60px';
            }
        } else {
            document.querySelector('.pcoded-navbar').removeAttribute('style');
        }
    };
    render() {
        let navClass = ['pcoded-navbar'];
        navClass = [...navClass, this.props.layoutType];
        if (this.props.layout === 'horizontal') {
            navClass = [...navClass, 'theme-horizontal'];
        } else {
            if (this.props.navFixedLayout) {
                navClass = [...navClass, 'menupos-fixed'];
            }
            if (this.props.navFixedLayout && !this.props.headerFixedLayout) {
                window.addEventListener('scroll', this.scroll, true);
                window.scrollTo(0, 0);
            } else {
                window.removeEventListener('scroll', this.scroll, false);
            }
        }
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            navClass = [...navClass, 'mob-open'];
        } else if (this.props.collapseMenu) {
            navClass = [...navClass, 'navbar-collapsed'];
        }
        let navBarClass = ['navbar-wrapper', 'content-main'];
        if (this.props.fullWidthLayout) {
            navBarClass = [...navBarClass, 'container-fluid'];
        } else {
            navBarClass = [...navBarClass, 'container'];
        }
        let navContent = (
            <div className={navBarClass.join(' ')}>
                <NavContent navigation={navigation.items} />
            </div>
        );
        if (this.props.windowWidth < 992) {
            navContent = (
                <OutsideClick>
                    <div className="navbar-wrapper">
                        <NavContent navigation={navigation.items} />
                    </div>
                </OutsideClick>
            );
        }
        return (
            <>
                <nav className={navClass.join(' ')}>{navContent}</nav>
            </>
        );
    }
}
const mapStateToProps = (state: typeof initialState) => {
    return {
        layout: state.layout,
        collapseMenu: state.collapseMenu,
        layoutType: state.layoutType,
        fullWidthLayout: state.fullWidthLayout,
        navFixedLayout: state.navFixedLayout,
        headerFixedLayout: state.headerFixedLayout
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
        onChangeLayout: (layout: string) => dispatch({ type: actionTypes.CHANGE_LAYOUT, layout: layout })
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(windowSize(Navigation as any)));
