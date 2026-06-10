import React from 'react';
import {Button, Nav, Navbar, NavDropdown } from 'react-bootstrap/';
import { useAuthContext } from 'react-oauth2-code-pkce';
import {NavLink } from 'react-router-dom';
import  style from './MenuUser.module.css';
/* eslint-disable */
export const MenuUser =()=> {
    const {token, tokenData,  logOut, isAuthenticated} = useAuthContext();
    
      return (
      <>
        <Navbar className={style.navmargin} bg="dark" data-bs-theme="dark">
            
                <Navbar.Brand >Учет рабочего времени</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    {tokenData?.roles?.includes("hr") || tokenData?.roles?.includes("admin")? <>
                        <NavDropdown  title="Сотрудники" id="employee-nav-employees">
                            <NavDropdown.Item as={NavLink} to="/listEmployee">Список сотрудников</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/addEmployee">Добавит сотрудника</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/listDepartament">Список отделов</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/addDepartament">Добавит отдел</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/listJobs">Список должностей</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/addJob">Добавит должность</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/listNotWorks">Неявки</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/listShedule">Графики</NavDropdown.Item>
                            
                        </NavDropdown> 
                        <NavDropdown  title="Загрузки" id="upload-nav-download">
                            <NavDropdown.Item as={NavLink} to="/uploadEmployee">Загрузить список сотрудников</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/uploadAbsentees">Загрузить отсутствующих</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown> </>: ''}   
                        <NavDropdown  title="Съемки TV" id="upload-nav-plans">
                            <NavDropdown.Item as={NavLink} to="/listWorkPlaneTV">Планы работы список</NavDropdown.Item>
                            {tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? 
                            <NavDropdown.Item as={NavLink} to="/setLimitTVWorkEmployee">Установка лимитов загрузки</NavDropdown.Item>
                            : ''}
                            <NavDropdown.Divider />
                        </NavDropdown>  
                        <NavDropdown  title="Выпуск TV" id="upload-nav-out">
                            <NavDropdown.Item as={NavLink} to="/addIssuanceTask">Планы выпуска список</NavDropdown.Item>
                            {tokenData?.roles?.includes("releaseTV") || tokenData?.roles?.includes("admin")? 
                            <NavDropdown.Item as={NavLink} to="/addWorkPlace">Рабочие места выпуска</NavDropdown.Item>
                            : ''}
                        </NavDropdown> 
                        {tokenData?.roles?.includes("garage") || tokenData?.roles?.includes("accountant")|| tokenData?.roles?.includes("admin")? 
                        <NavDropdown  title="Гараж" id="upload-nav-garage">
                            <NavDropdown.Item as={NavLink} to="/listCars">Парк машин в гараже</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/listWayBill">Путевые листы</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/garage/travellog">Журнал движения путевых листов</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/garage/VedomostiLogReport"> Отчет по пробегу машин</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/garage/ReporsDriverCard"> Карта учета работы автомобиля</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                        : ''}
                        <NavDropdown  title="Отчеты СКУД" id="upload-nav-reports">
                            <NavDropdown.Item as={NavLink} to="/skudreport">Отчет по СКУД</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/flatskudreport">Плоский отчет</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/skudReportsLateCmmers">Поиск опоздавших</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {tokenData?.roles?.includes("hr") || tokenData?.roles?.includes("manager") || tokenData?.roles?.includes("admin")? 
                            <NavDropdown.Item as={NavLink} to="/skud/seteventemployee">Редактирование СКУД</NavDropdown.Item>
                            : ''}
                        </NavDropdown>      
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand >{window.TOKENDATA?.name}</Navbar.Brand>
                <Navbar.Brand ><Button variant='secondary' onClick={()=>{ logOut(); window.TOCKEN = ''; window.TOKENDATA='аноним';}}>Выйти</Button></Navbar.Brand>
        </Navbar>
      </>)
    
  }

