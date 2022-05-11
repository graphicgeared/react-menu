import { MenuAim, Menu, SubMenuPanel } from "react-multilevel-menu-aim";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import JsonData from '../data/menu.json'
import React, {useState, useEffect} from 'react'

const arrowdown = <FontAwesomeIcon icon={faCaretDown} />
const arrowright = <FontAwesomeIcon icon={faCaretRight} />
const auth_key = 'BearereyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJERVYifQ.uOFB7h7_Aw6jbA1HSqVJ44tKMO7E1ljz1kV_JddeKL64YCOH57-l1ZX2Lly-Jnhdnxk3xMAeW5FawAgymEaMKA'


function MyComponent() {
    const [submenus, setSubmenu] = useState([])
    const [submenuslvl, setSubmenulvl] = useState([])


    var timeoutId;
    var timeoutIds;

    const getData = (url) =>{
        if (!timeoutId) {
            timeoutId = window.setTimeout(function() {
                timeoutId = null;

                fetch('https://uatgecmsus.systemax.com/catalogApis/catalog/feature/'+ url,{
            method: "GET",
            headers: {
                "Authorization": auth_key,
                "CLIENT_ID": "GEC"
            }
        }).then(response => {
            return response.json()
        }).then(results => {
            setSubmenu(results.primaries)
        })
            }, 1000);
        }
    }

    const getDatas = (urls) =>{
        if (!timeoutIds) {
            timeoutIds = window.setTimeout(function() {
                timeoutIds = null;

        fetch('https://uatgecmsus.systemax.com/catalogApis/catalog/feature/'+ urls,{
            method: "GET",
            headers: {
                "Authorization": auth_key,
                "CLIENT_ID": "GEC"
            }
        }).then(response => {
            return response.json()
        }).then(results => {
            setSubmenulvl(results.primaries)
        })
            }, 1000);
        }
    }


    const hovoutfirst = () =>{
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        }
        else {
           return false
        }
    }

    const hovoutsec = () =>{
        if (timeoutIds) {
            window.clearTimeout(timeoutIds);
            timeoutIds = null;
        }
        else {
            return false
        }
    }



    return (
        <MenuAim>
            <div className="menu">
                <ul style={{left: 10, top: 0}} className="lv1">
                    {JsonData.map((info) => (
                        <Menu key={info.title}>
                            <li>
                                {info.childs || info.title == "QUICK ORDER" ? <a>{info.title} {arrowdown} </a> :
                                    <a>{info.title} </a>}
                                {info.childs ?
                                    <SubMenuPanel>
                                        <div className="wrapper">
                                            <ul className="lvn lv2">
                                                {info.primaries.map((submenu) => (
                                                    <Menu key={submenu.description}>
                                                        <li onMouseOver={()=> getData(submenu.key+"?url="+submenu.url)} onMouseOut={()=> hovoutfirst()}>
                                                            {submenu.childs ? <a>{submenu.description} <span
                                                                    className="icon">{arrowright}</span> </a> :
                                                                <a>{submenu.description}</a>}
                                                            {submenu.childs ?
                                                                <SubMenuPanel>
                                                                    <div className="wrapper2">
                                                                        <ul className="lvn lv3">
                                                                            {submenus.map((menuItem) => (
                                                                                <Menu key={menuItem.description}>
                                                                                    <li onMouseOver={()=> getDatas(menuItem.key+"?url="+menuItem.url)} onMouseOut={()=> hovoutsec()}>
                                                                                        {menuItem.childs ? <a>{menuItem.description} <span
                                                                                                className="icon">{arrowright}</span> </a> :
                                                                                            <a>{menuItem.description}</a>}
                                                                                        {menuItem.childs ?
                                                                                            <SubMenuPanel>
                                                                                                <div className="wrapper3">
                                                                                                    <ul className="lvn lv4">
                                                                                                        {submenuslvl.map((menuItemlvl) => (
                                                                                                            <Menu key={menuItemlvl.description}>
                                                                                                                <li>
                                                                                                                    <a>{menuItemlvl.description}</a>
                                                                                                                </li>
                                                                                                            </Menu>
                                                                                                        ))
                                                                                                        }
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </SubMenuPanel> :
                                                                                            null
                                                                                        }
                                                                                    </li>
                                                                                </Menu>
                                                                            ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </SubMenuPanel> :
                                                                null
                                                            }
                                                        </li>
                                                    </Menu>
                                                ))
                                                }
                                            </ul>
                                        </div>
                                    </SubMenuPanel> : null}
                            </li>
                        </Menu>
                    ))}
                </ul>
                <style jsx>{`
                      ul,
          li {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          ul.lv1 {
            position: absolute;
            clear: both;
            height: 40px;
            top: 40px;
            left: 0px;
            z-index: 100;
          }

          ul.lv1 > li {
            float: left;
            width: auto;
            padding: 10px 20px;
            border: 1px solid blue;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: relative;
          }

          ul.lvn {
            position: absolute;
            text-align: left;
            top: 0px;
            width: 300px;
            left: 300px;
            z-index: 1000;
            height: 500px;
            clip-depth:2;
          }

          ul.lvn li {
            background: #ccc;
            padding: 2px 20px;
             position: static;
          }
          ul.lvn li:hover {
            background: #999;
          }

          ul.lv2 {
            top: 60px;
            left: 0px;
            height: 500px;
            overflow-y: scroll;
            overflow-x: hidden;
            position:static;
          }
          ul.lv3{position:static;overflow-y: scroll;
            overflow-x: hidden;
            } 
            ul.lv4{position:static;overflow-y: scroll;
            overflow-x: hidden;
            } 
          ul.lvn > li a span.icon {
            float: right;
          }
          .wrapper{position:absolute;top:60px; left:0px;}
          .wrapper2{position:absolute;top:0px; left:300px;}
          .wrapper3{position:absolute;top:0px; left:300px;}
          .menu {
            position: relative;
            top: 0;
            left: 0;
          }
                    `}</style>
            </div>
        </MenuAim>
    );
}


export default MyComponent;

