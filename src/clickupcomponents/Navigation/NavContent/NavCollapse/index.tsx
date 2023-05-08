import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import DEMO from "../../../../store/constant";
import * as actionTypes from "../../../../store/actions";
import NavIcon from "./../NavIcon";
import NavBadge from "./../NavBadge";
import NavItem from "../NavItem";
import LoopNavCollapse from "./index";
import { initialState } from '../../../../store/reducer';
import { MenuItemType } from '../../../../menu-items';

interface INavCollapseProps extends React.HTMLAttributes<Element> {
  isOpen?: any;
  isTrigger?: any;
  layout?: any;
  type?: string;
  id?: any;
  collapse?: MenuItemType;
  onCollapseToggle?: any;
  onNavCollapseLeave?: any;
  icon?: any;
  title?: any;
}
class NavCollapse extends Component<INavCollapseProps, {}> {
  componentDidMount() {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex(id => id === this.props.collapse.id);
    if (currentIndex > -1) {
      this.props.onCollapseToggle(this.props.collapse.id, this.props.type);
    }
  }
  render() {
    const { isOpen, isTrigger } = this.props;
    let navItems: React.ReactNode = "";
    if (this.props.collapse.children) {
      const collapses = this.props.collapse.children;
      navItems = Object.keys(collapses).map((key) => {
        const item = collapses[parseInt(key)];
        switch (item.type) {
          case "collapse":
            return <LoopNavCollapse key={item.id} collapse={item} type="sub" />;
          case "item":
            return (
              <NavItem layout={this.props.layout} key={item.id} item={item} />
            );
          default:
            return false;
        }
      });
    }
    let itemTitle: React.ReactNode = this.props.collapse.title;
    if (this.props.collapse.icon) {
      itemTitle = (
        <span className="pcoded-mtext">{this.props.collapse.title}</span>
      );
    }
    let navLinkClass = ["nav-link"];
    let navItemClass = ["nav-item", "pcoded-hasmenu"];
    const openIndex = isOpen.findIndex((id: string) => id === this.props.collapse.id);
    if (openIndex > -1) {
      navItemClass = [...navItemClass, "active"];
      if (this.props.layout !== "horizontal") {
        navLinkClass = [...navLinkClass, "active"];
      }
    }
    const triggerIndex = isTrigger.findIndex(
      (id: string) => id === this.props.collapse.id
    );
    if (triggerIndex > -1) {
      navItemClass = [...navItemClass, "pcoded-trigger"];
    }
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex(id => id === this.props.collapse.id);
    if (currentIndex > -1) {
      navItemClass = [...navItemClass, "active"];
      if (this.props.layout !== "horizontal") {
        navLinkClass = [...navLinkClass, "active"];
      }
    }
    const subContent = (
      <>
        <a
          href={DEMO.BLANK_LINK}
          className={navLinkClass.join(" ")}
          onClick={() =>
            this.props.onCollapseToggle(this.props.collapse.id, this.props.type)
          }
        >
          <NavIcon items={this.props.collapse} />
          {itemTitle}
          <NavBadge layout={this.props.layout} items={this.props.collapse} />
        </a>
        <ul className="pcoded-submenu">{navItems}</ul>
      </>
    );
    let mainContent: React.ReactNode = "";
    if (this.props.layout === "horizontal") {
      mainContent = (
        <li
          className={navItemClass.join(" ")}
          onMouseLeave={() =>
            this.props.onNavCollapseLeave(
              this.props.collapse.id,
              this.props.type
            )
          }
          onMouseEnter={() =>
            this.props.onCollapseToggle(this.props.collapse.id, this.props.type)
          }
        >
          {subContent}
        </li>
      );
    } else {
      mainContent = <li className={navItemClass.join(" ")}>{subContent}</li>;
    }
    return <>{mainContent}</>;
  }
}
const mapStateToProps = (state: typeof initialState) => {
  return {
    layout: state.layout,
    isOpen: state.isOpen,
    isTrigger: state.isTrigger
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onCollapseToggle: (id: string, type: string) =>
      dispatch({
        type: actionTypes.COLLAPSE_TOGGLE,
        menu: { id: id, type: type }
      }),
    onNavCollapseLeave: (id: string, type: string) =>
      dispatch({
        type: actionTypes.NAV_COLLAPSE_LEAVE,
        menu: { id: id, type: type }
      })
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavCollapse)
) as any;
