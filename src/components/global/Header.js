import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return(
            <header class="main-header">
                <a href="/" class="logo">
                  <span class="logo-mini"><b>A</b></span>
                  <span class="logo-lg"><b>Adaptativamente</b></span>
                </a>
                <nav class="navbar navbar-static-top" role="navigation">
                  <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span class="sr-only">Toggle navigation</span>
                  </a>
                  <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                      <li class="dropdown messages-menu" style={{display:'none'}}>
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                          <i class="fa fa-envelope-o"></i>
                          <span class="label label-success">4</span>
                        </a>
                        <ul class="dropdown-menu">
                          <li class="header">You have 4 messages</li>
                          <li>
                            <ul class="menu">
                              <li>
                                <a href="javascript:;">
                                  <div class="pull-left">
                                    <img src="assets/img/user2-160x160.jpg" class="img-circle" alt="User Image"/>
                                  </div>
                                  <h4>
                                    Support Team
                                    <small><i class="fa fa-clock-o"></i> 5 mins</small>
                                  </h4>
                                  <p>Why not buy a new awesome theme?</p>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="footer"><a href="javascript:;">See All Messages</a></li>
                        </ul>
                      </li>
                      <li class="dropdown notifications-menu">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                          <i class="fa fa-bell-o"></i>
                          <span class="label label-warning">10</span>
                        </a>
                        <ul class="dropdown-menu">
                          <li class="header">Tienes 10 notificaciones</li>
                          <li>
                            <ul class="menu">
                              <li>
                                <a href="javascript:;">
                                  <i class="fa fa-users text-aqua"></i> Esta es una notificación
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="footer"><a href="javascript:;">Ver todas</a></li>
                        </ul>
                      </li>
                      <li class="dropdown tasks-menu" style={{display:'none'}}>
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                          <i class="fa fa-flag-o"></i>
                          <span class="label label-danger">9</span>
                        </a>
                        <ul class="dropdown-menu">
                          <li class="header">You have 9 tasks</li>
                          <li>
                            <ul class="menu">
                              <li>
                                <a href="javascript:;">
                                  <h3>
                                    Design some buttons
                                    <small class="pull-right">20%</small>
                                  </h3>
                                  <div class="progress xs">
                                    <div class="progress-bar progress-bar-aqua" style={{width:'20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                      <span class="sr-only">20% Complete</span>
                                    </div>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="footer">
                            <a href="javascript:;">View all tasks</a>
                          </li>
                        </ul>
                      </li>
                      <li class="dropdown user user-menu">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                          <img src="" class="user-image" alt="User Image"/>
                          <span class="hidden-xs">Nombre Apellido</span>
                        </a>
                        <ul class="dropdown-menu">
                          <li class="user-header">
                            <img src="" class="img-circle" alt="User Image"/>
                            <p>
                              Nombre Apellido
                              <small>Último Ingreso: 12/04/2017 5:30:22</small>
                            </p>
                          </li>
                          <li class="user-footer">
                            <div class="pull-left">
                              <a href="javascript:;" class="btn btn-default btn-flat">Perfil</a>
                            </div>
                            <div class="pull-right">
                              <a href="javascript:;" class="btn btn-default btn-flat">Cerrar Sesión</a>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="javascript:;" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </header>
        )
    }
} 