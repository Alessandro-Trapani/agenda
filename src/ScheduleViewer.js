import React, { useState, useEffect } from "react";
import { parse } from "papaparse";
import "./style.css";
import { useRef } from "react";
const ScheduleViewer = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const todayRowRef = useRef(null);
  const csvData = `Dates,Formation Matin,Formateur Matin,Formation PM,Formateur PM,Salle,Tech,AT,Self,,,,,,,,
"Monday, June 2, 2025",,,,,,,,,,,,,,,,
"Tuesday, June 3, 2025",Ouverture,Cathy,Dynamique de groupe,Laurence,1602,,0.5,,,,,,,,,
"Wednesday, June 4, 2025",VmWare - découverte du matériel,Anthony Rizzello,Self Study,Stagiaires,1807/Extérieur,0.5,,0.5,,,,,,,,
"Thursday, June 5, 2025",Apprendre à apprendre,Laurence,Apprendre à apprendre,Laurence,1807,,1,,,,,,,,,
"Friday, June 6, 2025",Conception des bases de données,bstorm - Robin Pecheur,Conception des bases de données,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Saturday, June 7, 2025",,,,,,,,,,,,,,,,
"Sunday, June 8, 2025",,,,,,,,,,,,,,,,
"Monday, June 9, 2025",Pentecôte,,,,,,,,,,,,,,,
"Tuesday, June 10, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,,,,,,,,,
"Wednesday, June 11, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,,,,,,,,,
"Thursday, June 12, 2025",Communication,Laurence,Communication,Laurence,7105,,1,,,,,,,,,
"Friday, June 13, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,,,,,,,,,
"Saturday, June 14, 2025",,,,,,,,,,,,,,,,
"Sunday, June 15, 2025",,,,,,,,,,,,,,,,
"Monday, June 16, 2025",Conception des bases de données,bstorm - Robin Pecheur,Conception des bases de données,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Tuesday, June 17, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,,,,,,,,,
"Wednesday, June 18, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,,,,,,,,,
"Thursday, June 19, 2025",Conception des bases de données,bstorm - Robin Pecheur,Conception des bases de données,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Friday, June 20, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,,,,,,,,,
"Saturday, June 21, 2025",,,,,,,,,,,,,,,,
"Sunday, June 22, 2025",,,,,,,,,,,,,,,,
"Monday, June 23, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Tuesday, June 24, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,,,,,,,,,
"Wednesday, June 25, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,,,,,,,,,
"Thursday, June 26, 2025",Recherche d'emploi ,Laurence,Recherche d'emploi ,Laurence,1807,,1,,,,,,,,,
"Friday, June 27, 2025",Git,Yannick,Git,Yannick,1807,1,,,,,,,,,,
"Saturday, June 28, 2025",,,,,,,,,,,,,,,,
"Sunday, June 29, 2025",,,,,,,,,,,,,,,,
"Monday, June 30, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Tuesday, July 1, 2025",Git,Yannick,Git,Yannick,1807,1,,,,,,,,,,
"Wednesday, July 2, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,,,,,,,,,
"Thursday, July 3, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,,,,,,,,,
"Friday, July 4, 2025",Entretiens suivi individuel,Laurence,Communication,Laurence,1607,,1,,,,,,,,,
"Saturday, July 5, 2025",,,,,,,,,,,,,,,,
"Sunday, July 6, 2025",,,,,,,,,,,,,,,,
"Monday, July 7, 2025",T-SQL - DML et DDL,bstorm - Robin Pecheur,T-SQL - DML et DDL,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Tuesday, July 8, 2025",T-SQL - DML et DDL,bstorm - Robin Pecheur,T-SQL - DML et DDL,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Wednesday, July 9, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Thursday, July 10, 2025",T-SQL - DML et DDL,bstorm - Robin Pecheur,T-SQL - DML et DDL,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Friday, July 11, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Saturday, July 12, 2025",,,,,,,,,,,,,,,,
"Sunday, July 13, 2025",,,,,,,,,,,,,,,,
"Monday, July 14, 2025",,,,,,,,,,,,,,,,
"Tuesday, July 15, 2025",,,,,,,,,,,,,,,,
"Wednesday, July 16, 2025",,,,,,,,,,,,,,,,
"Thursday, July 17, 2025",,,,,,,,,,,,,,,,
"Friday, July 18, 2025",,,,,,,,,,,,,,,,
"Saturday, July 19, 2025",,,,,,,,,,,,,,,,
"Sunday, July 20, 2025",,,,,,,,,,,,,,,,
"Monday, July 21, 2025",Fête Nationale,,,,,,,,,,,,,,,
"Tuesday, July 22, 2025",,,,,,,,,,,,,,,,
"Wednesday, July 23, 2025",,,,,,,,,,,,,,,,
"Thursday, July 24, 2025",,,,,,,,,,,,,,,,
"Friday, July 25, 2025",,,,,,,,,,,,,,,,
"Saturday, July 26, 2025",,,,,,,,,,,,,,,,
"Sunday, July 27, 2025",,,,,,,,,,,,,,,,
"Monday, July 28, 2025",T-SQL - DML et DDL,bstorm - Robin Pecheur,T-SQL - DML et DDL,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Tuesday, July 29, 2025",HTML 5,bstorm - Robin Pecheur,HTML 5,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Wednesday, July 30, 2025",HTML 5,bstorm - Robin Pecheur,HTML 5,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Thursday, July 31, 2025",CSS 3,bstorm - Robin Pecheur,CSS 3,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Friday, August 1, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Saturday, August 2, 2025",,,,,,,,,,,,,,,,
"Sunday, August 3, 2025",,,,,,,,,,,,,,,,
"Monday, August 4, 2025",CSS 3,bstorm - Robin Pecheur,CSS 3,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Tuesday, August 5, 2025",Javascript/Typescrit Base ,bstorm - Robin Pecheur,Javascript/Typescrit Base ,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Wednesday, August 6, 2025",Javascript/Typescrit Base ,bstorm - Robin Pecheur,Javascript/Typescrit Base ,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Thursday, August 7, 2025",Javascript/Typescrit Base ,bstorm - Robin Pecheur,Javascript/Typescrit Base ,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Friday, August 8, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Saturday, August 9, 2025",,,,,,,,,,,,,,,,
"Sunday, August 10, 2025",,,,,,,,,,,,,,,,
"Monday, August 11, 2025",Javascript/Typescrit Base ,bstorm - Robin Pecheur,Javascript/Typescrit Base ,bstorm - Robin Pecheur,1807,1,,,,,,,,,,
"Tuesday, August 12, 2025",Recherche d'emploi ,Laurence,Recherche d'emploi ,Laurence,1807,,1,,,,,,,,,
"Wednesday, August 13, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,,,,,,,,,
"Thursday, August 14, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,,,,,,,,,
"Friday, August 15, 2025",Assomption,,,,,,,,,,,,,,,
"Saturday, August 16, 2025",,,,,,,,,,,,,,,,
"Sunday, August 17, 2025",,,,,,,,,,,,,,,,
"Monday, August 18, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Tuesday, August 19, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,,,,,,,,,
"Wednesday, August 20, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,,,,,,,,,
"Thursday, August 21, 2025",Langage C#,Yannick,Self Study,Stagiaires,1807/ Extérieur,0.5,,0.5,,,,,,,,
"Friday, August 22, 2025",Langage C# avancé,bstorm - Sébastien Bya,Langage C# avancé,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, August 23, 2025",,,,,,,,,,,,,,,,
"Sunday, August 24, 2025",,,,,,,,,,,,,,,,
"Monday, August 25, 2025",Langage C# avancé,bstorm - Sébastien Bya,Langage C# avancé,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, August 26, 2025",RE - Entretiens individuels,Laurence,RE - Entretiens individuels,Laurence,1602,,1,,,,,,,,,
"Wednesday, August 27, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,,,,,,,,,
"Thursday, August 28, 2025",RE - Entretiens individuels,Laurence,Recherche d'emploi ,Laurence,1602,,1,,,,,,,,,
"Friday, August 29, 2025",Labo ,Yannick,Labo ,Yannick,1807,1,,,,,,,,,,
"Saturday, August 30, 2025",,,,,,,,,,,,,,,,
"Sunday, August 31, 2025",,,,,,,,,,,,,,,,
"Monday, September 1, 2025",Labo autonome,Stagiaires,Labo autonome,Stagiaires,1807 ou Extérieur,,,1,,,,,,,,
"Tuesday, September 2, 2025",Labo ,Yannick,Labo ,Yannick,1807,1,,,,,,,,,,
"Wednesday, September 3, 2025",Labo autonome,Stagiaires,Labo autonome,Stagiaires,1807 ou Extérieur,,,1,,,,,,,,
"Thursday, September 4, 2025",Labo ,Yannick,Labo ,Yannick,1807,1,,,,,,,,,,
"Friday, September 5, 2025",Langage C# avancé,bstorm - Sébastien Bya,Langage C# avancé,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, September 6, 2025",,,,,,,,,,,,,,,,
"Sunday, September 7, 2025",,,,,,,,,,,,,,,,
"Monday, September 8, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Tuesday, September 9, 2025",Communication,Laurence,Recherche d'emploi ,Laurence,1702,,1,,,,,,,,,
"Wednesday, September 10, 2025",Javascript/Typescrit Base ,bstorm - Sébastien Bya,Javascript/Typescrit Base ,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Thursday, September 11, 2025",Javascript/Typescrit Base ,bstorm - Sébastien Bya,Javascript/Typescrit Base ,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, September 12, 2025",LINQ et ADO.NET,bstorm - Sébastien Bya,LINQ et ADO.NET,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, September 13, 2025",,,,,,,,,,,,,,,,
"Sunday, September 14, 2025",,,,,,,,,,,,,,,,
"Monday, September 15, 2025",LINQ et ADO.NET,bstorm - Sébastien Bya,LINQ et ADO.NET,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, September 16, 2025",LINQ et ADO.NET,bstorm - Sébastien Bya,LINQ et ADO.NET,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Wednesday, September 17, 2025",Git (autonome),Yannick,Git (autonome),Yannick,1807,1,,,,,,,,,,
"Thursday, September 18, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, September 19, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Saturday, September 20, 2025",,,,,,,,,,,,,,,,
"Sunday, September 21, 2025",,,,,,,,,,,,,,,,
"Monday, September 22, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, September 23, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Wednesday, September 24, 2025",Suivi de groupe ,Cathy et Laurence,Langage C#,Yannick,1607/1807,0.5,0.5,,,,,,,,,
"Thursday, September 25, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, September 26, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, September 27, 2025",,,,,,,,,,,,,,,,
"Sunday, September 28, 2025",,,,,,,,,,,,,,,,
"Monday, September 29, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, September 30, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Wednesday, October 1, 2025",Programmer base SQL Serveur,bstorm - Philippe Haerens,Programmer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Thursday, October 2, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, October 3, 2025",.NET Core,bstorm - Sébastien Bya,.NET Core,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, October 4, 2025",,,,,,,,,,,,,,,,
"Sunday, October 5, 2025",,,,,,,,,,,,,,,,
"Monday, October 6, 2025",.NET Core,bstorm - Sébastien Bya,.NET Core,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, October 7, 2025",.NET Core,bstorm - Sébastien Bya,.NET Core,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Wednesday, October 8, 2025",ASP.NET - MVC,bstorm - Aurélien Strimelle,ASP.NET - MVC,bstorm - Aurélien Strimelle,1807,1,,,,,,,,,,1
"Thursday, October 9, 2025",Programmer base SQL Serveur,bstorm - Philippe Haerens,Programmer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Friday, October 10, 2025",.NET Core,bstorm - Sébastien Bya,.NET Core,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, October 11, 2025",,,,,,,,,,,,,,,,
"Sunday, October 12, 2025",,,,,,,,,,,,,,,,
"Monday, October 13, 2025",Entity Framework ,bstorm - Philippe Haerens,Entity Framework ,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Tuesday, October 14, 2025",Entity Framework ,bstorm - Philippe Haerens,Entity Framework ,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Wednesday, October 15, 2025",Entity Framework ,bstorm - Philippe Haerens,Entity Framework ,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Thursday, October 16, 2025",Créer des appl Web (Labo 2),bstorm - Philippe Haerens,Créer des appl Web (Labo 2),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Friday, October 17, 2025",Visite NSI,Laurence,Simulations d'entretien,Laurence,Extérieur AM/ 1607 (pm),,,,,,,,,,,
"Saturday, October 18, 2025",,,,,,,,,,,,,,,,
"Sunday, October 19, 2025",,,,,,,,,,,,,,,,
"Monday, October 20, 2025",Créer des appl Web (Labo 2),bstorm - Philippe Haerens,Créer des appl Web (Labo 2),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Tuesday, October 21, 2025",Labo autonome 2,Stagiaires,Labo autonome 2,Stagiaires,1807 ou extérieur,,,1,,,,,,,,
"Wednesday, October 22, 2025",Créer des appl Web (Labo 2),bstorm - Philippe Haerens,Créer des appl Web (Labo 2),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Thursday, October 23, 2025",Labo autonome 2,Stagiaires,Labo autonome 2,Stagiaires,1807 ou extérieur,,,1,,,,,,,,
"Friday, October 24, 2025",Labo autonome 2,Stagiaires,Labo autonome 2,Stagiaires,1807 ou extérieur,,,1,,,,,,,,
"Saturday, October 25, 2025",,,,,,,,,,,,,,,,
"Sunday, October 26, 2025",,,,,,,,,,,,,,,,
"Monday, October 27, 2025",Créer des appl Web (Labo 2),bstorm - Philippe Haerens,Créer des appl Web (Labo 2),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Tuesday, October 28, 2025",Administrer base SQL Serveur,bstorm - Philippe Haerens,Administrer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Wednesday, October 29, 2025",Agile et SCRUM,bstorm - Laurent Fontaine,Agile et SCRUM,bstorm - Laurent Fontaine,1807,1,,,,,,,,,,
"Thursday, October 30, 2025",Agile et SCRUM,bstorm - Laurent Fontaine,Agile et SCRUM,bstorm - Laurent Fontaine,1807,1,,,,,,,,,,
"Friday, October 31, 2025",Agile et SCRUM,bstorm - Laurent Fontaine,Agile et SCRUM,bstorm - Laurent Fontaine,1807,1,,,,,,,,,,
"Saturday, November 1, 2025",,,,,,,,,,,,,,,,
"Sunday, November 2, 2025",,,,,,,,,,,,,,,,
"Monday, November 3, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Tuesday, November 4, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Wednesday, November 5, 2025",Suivi des recherches ,Laurence,Self-study,Extérieur,DISTANCIEL,,0.5,0.5,,,,,,,,
"Thursday, November 6, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Friday, November 7, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Saturday, November 8, 2025",,,,,,,,,,,,,,,,
"Sunday, November 9, 2025",,,,,,,,,,,,,,,,
"Monday, November 10, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Tuesday, November 11, 2025",Armistice,,,,,,,,,,,,,,,
"Wednesday, November 12, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Thursday, November 13, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Friday, November 14, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Saturday, November 15, 2025",,,,,,,,,,,,,,,,
"Sunday, November 16, 2025",,,,,,,,,,,,,,,,
"Monday, November 17, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Tuesday, November 18, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,,,,,,,,,
"Wednesday, November 19, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,,,,,,,,,
"Thursday, November 20, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,,,,,,,,,
"Friday, November 21, 2025",TDD,bstorm - Philippe Haerens,TDD,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Saturday, November 22, 2025",,,,,,,,,,,,,,,,
"Sunday, November 23, 2025",,,,,,,,,,,,,,,,
"Monday, November 24, 2025",TDD,bstorm - Philippe Haerens,TDD,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Tuesday, November 25, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,,,,,,,,,
"Wednesday, November 26, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,,,,,,,,,
"Thursday, November 27, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,,,,,,,,,
"Friday, November 28, 2025",Administrer base SQL Serveur,bstorm - Philippe Haerens,Administrer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Saturday, November 29, 2025",,,,,,,,,,,,,,,,
"Sunday, November 30, 2025",,,,,,,,,,,,,,,,
"Monday, December 1, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Tuesday, December 2, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Wednesday, December 3, 2025",Programmer base SQL Serveur,bstorm - Philippe Haerens,Programmer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Thursday, December 4, 2025",Entretiens suivi individuel,Laurence,Self-study,Stagiaires,DISTANCIEL,,0.5,0.5,,,,,,,,
"Friday, December 5, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Saturday, December 6, 2025",,,,,,,,,,,,,,,,
"Sunday, December 7, 2025",,,,,,,,,,,,,,,,
"Monday, December 8, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Tuesday, December 9, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Wednesday, December 10, 2025",Labo Angular (Labo 3),bstorm - Philippe Haerens,Labo Angular (Labo 3),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Thursday, December 11, 2025",Labo Autonomie,Stagiaires,Labo Autonomie,Stagiaires,1807 ou extérieur,,,1,,,,,,,,
"Friday, December 12, 2025",Labo Angular (Labo 3),bstorm - Philippe Haerens,Labo Angular (Labo 3),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Saturday, December 13, 2025",,,,,,,,,,,,,,,,
"Sunday, December 14, 2025",,,,,,,,,,,,,,,,
"Monday, December 15, 2025",Labo Autonomie,Stagiaires,Labo Autonomie,Stagiaires,1807 ou extérieur,,,1,,,,,,,,
"Tuesday, December 16, 2025",Labo Angular (Labo 3),bstorm - Philippe Haerens,Labo Angular (Labo 3),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Wednesday, December 17, 2025",Labo Autonomie,Stagiaires,Labo Autonomie,Stagiaires,1807 ou extérieur,,,1,,,,,,,,
"Thursday, December 18, 2025",Labo Angular (Labo 3),bstorm - Philippe Haerens,Labo Angular (Labo 3),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Friday, December 19, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Saturday, December 20, 2025",,,,,,,,,,,,,,,,
"Sunday, December 21, 2025",,,,,,,,,,,,,,,,
"Monday, December 22, 2025",,,,,,,,,,,,,,,,
"Tuesday, December 23, 2025",,,,,,,,,,,,,,,,
"Wednesday, December 24, 2025",,,,,,,,,,,,,,,,
"Thursday, December 25, 2025",Noël,,,,,,,,,,,,,,,
"Friday, December 26, 2025",,,,,,,,,,,,,,,,
"Saturday, December 27, 2025",,,,,,,,,,,,,,,,
"Sunday, December 28, 2025",,,,,,,,,,,,,,,,
"Monday, December 29, 2025",,,,,,,,,,,,,,,,
"Tuesday, December 30, 2025",,,,,,,,,,,,,,,,
"Wednesday, December 31, 2025",,,,,,,,,,,,,,,,
"Thursday, January 1, 2026",,,,,,,,,,,,,,,,
"Friday, January 2, 2026",,,,,,,,,,,,,,,,
"Saturday, January 3, 2026",,,,,,,,,,,,,,,,
"Sunday, January 4, 2026",,,,,,,,,,,,,,,,
"Monday, January 5, 2026",Azure,bstorm - Sébastien Bya,Azure,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, January 6, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Wednesday, January 7, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Thursday, January 8, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, January 9, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, January 10, 2026",,,,,,,,,,,,,,,,
"Sunday, January 11, 2026",,,,,,,,,,,,,,,,
"Monday, January 12, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, January 13, 2026",Suivi des recherches ,Laurence,Self-study,Stagiaires,1807/Extérieur,,0.5,0.5,,,,,,,,
"Wednesday, January 14, 2026",Sécurité (orienté programmation),bstorm - Philippe Haerens,Sécurité (orienté programmation),bstorm - Philippe Haerens,1807,1,,,,,,,,,,
"Thursday, January 15, 2026",Utilisation librairies IA,bstorm - Sébastien Bya,Utilisation librairies IA,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, January 16, 2026",Utilisation librairies IA,bstorm - Sébastien Bya,Utilisation librairies IA,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, January 17, 2026",,,,,,,,,,,,,,,,
"Sunday, January 18, 2026",,,,,,,,,,,,,,,,
"Monday, January 19, 2026",Utilisation librairies IA,bstorm - Sébastien Bya,Utilisation librairies IA,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, January 20, 2026",Utilisation librairies IA,bstorm - Sébastien Bya,Utilisation librairies IA,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Wednesday, January 21, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Thursday, January 22, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, January 23, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, January 24, 2026",,,,,,,,,,,,,,,,
"Sunday, January 25, 2026",,,,,,,,,,,,,,,,
"Monday, January 26, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, January 27, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Wednesday, January 28, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Thursday, January 29, 2026",Migration de données,bstorm - Sébastien Bya,Migration de données,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, January 30, 2026",Migration de données,bstorm - Sébastien Bya,Migration de données,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, January 31, 2026",,,,,,,,,,,,,,,,
"Sunday, February 1, 2026",,,,,,,,,,,,,,,,
"Monday, February 2, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, February 3, 2026",Accompagnement projet autonome,bstorm - Sébastien Bya,Accompagnement projet autonome,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Wednesday, February 4, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Thursday, February 5, 2026",Accompagnement projet autonome,bstorm - Sébastien Bya,Accompagnement projet autonome,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, February 6, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Saturday, February 7, 2026",,,,,,,,,,,,,,,,
"Sunday, February 8, 2026",,,,,,,,,,,,,,,,
"Monday, February 9, 2026",Accompagnement projet autonome,bstorm - Sébastien Bya,Accompagnement projet autonome,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Tuesday, February 10, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Wednesday, February 11, 2026",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1,,,,,,,,
"Thursday, February 12, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,,,,,,,,,
"Friday, February 13, 2026",Evaluation finale ,Cathy et Laurence,,,1602,,0.5,,,,,,,,,
"Saturday, February 14, 2026",,,,,,,,,,,,,,,,
"Sunday, February 15, 2026",,,,,,,,,,,,,,,,
,,,,,,126.5,11,21.5,,,,,,,,`;
  // Parse French/English dates like "Tuesday, June 3, 2025"
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const cleaned = dateString.replace(/^[a-zA-ZÀ-ÿ]+,\s*/, "").trim();
    const date = new Date(cleaned);
    return isNaN(date) ? null : date;
  };

  useEffect(() => {
    const parsed = parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    }).data;
    setScheduleData(parsed);
  }, []);

  useEffect(() => {
    if (!scheduleData.length) return;

    const todayEntry = scheduleData.find((entry) => {
      const entryDate = parseDate(entry.Dates);
      return (
        entryDate && entryDate.toDateString() === currentDate.toDateString()
      );
    });

    setTodaySchedule(todayEntry || null);
  }, [scheduleData, currentDate]);

  const getCurrentPeriod = () => {
    const now = new Date();
    if (now.toDateString() !== currentDate.toDateString()) return "";

    const hour = now.getHours();
    if (hour >= 8 && hour < 12) return "Matin";
    if (hour >= 12 && hour < 13) return "Pause";
    if (hour >= 13 && hour < 17) return "PM";
    return "";
  };

  const currentPeriod = getCurrentPeriod();

  const renderCard = (period) => {
    const formationKey =
      period === "Matin" ? "Formation Matin" : "Formation PM";
    const formateurKey =
      period === "Matin" ? "Formateur Matin" : "Formateur PM";
    const isHighlighted = currentPeriod === period;
    const isPause = period === "Pause";

    return (
      <div
        className={`schedule-card ${isHighlighted ? "highlight-green" : ""} ${
          isPause && !isHighlighted ? "default-pause-card" : ""
        }`}
      >
        <h3>
          {period === "Matin"
            ? "Matin (8:30 - 12:00)"
            : period === "Pause"
            ? "Pause (12:00 - 13:00)"
            : "Après-midi (13:00 - 17:00)"}
        </h3>
        {isPause ? (
          <p>Pause</p>
        ) : todaySchedule && todaySchedule[formationKey] ? (
          <>
            <p>
              <strong>Activité :</strong> {todaySchedule[formationKey]}
            </p>
            <p>
              <strong>Formateur :</strong> {todaySchedule[formateurKey]}
            </p>
            <p>
              <strong>Salle :</strong> {todaySchedule.Salle || "Non spécifiée"}
            </p>
          </>
        ) : (
          <p>Aucune activité prévue</p>
        )}
      </div>
    );
  };

  return (
    <div className="schedule-container">
      <div className="date-selector">
        <input
          type="date"
          value={currentDate.toISOString().split("T")[0]}
          onChange={(e) => setCurrentDate(new Date(e.target.value))}
        />
        <button
          onClick={() => {
            setCurrentDate(new Date());
            setTimeout(() => {
              todayRowRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }, 50);
          }}
          className="go-today-button"
        >
          Aujourd'hui
        </button>
      </div>

      <div className="today-schedule-section">
        <h2 className="section-title">
          Planning du jour ({currentDate.toLocaleDateString("fr-FR")})
        </h2>
        {todaySchedule ? (
          <div className="time-periods">
            {renderCard("Matin")}
            {renderCard("Pause")}
            {renderCard("PM")}
          </div>
        ) : (
          <p className="no-planning">Aucun planning trouvé pour cette date.</p>
        )}
      </div>

      <div className="full-schedule-section">
        <h2 className="section-title">Planning complet</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Activité Matin</th>
                <th>Formateur Matin</th>
                <th>Activité Après-midi</th>
                <th>Formateur Après-midi</th>
                <th>Salle</th>
                <th>Tech</th>
                <th>AT</th>
                <th>Self</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, idx) => {
                const rowDate = parseDate(row.Dates);
                const isToday =
                  rowDate &&
                  rowDate.toDateString() === currentDate.toDateString();
                return (
                  <tr
                    key={idx}
                    ref={isToday ? todayRowRef : null}
                    className={isToday ? "current-day" : ""}
                  >
                    <td>{row.Dates || "-"}</td>
                    <td>{row["Formation Matin"] || "-"}</td>
                    <td>{row["Formateur Matin"] || "-"}</td>
                    <td>{row["Formation PM"] || "-"}</td>
                    <td>{row["Formateur PM"] || "-"}</td>
                    <td>{row.Salle || "-"}</td>
                    <td>{row.Tech || "-"}</td>
                    <td>{row.AT || "-"}</td>
                    <td>{row.Self || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleViewer;
