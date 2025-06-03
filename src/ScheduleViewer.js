import React, { useState, useEffect } from "react";
import { parse } from "papaparse";
import "./style.css";

const ScheduleViewer = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [todaySchedule, setTodaySchedule] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const csvData = `"Dates","Formation Matin","Formateur Matin","Formation PM","Formateur PM","Salle","Tech","AT","Self"
"lundi, juin 02, 2025",,,,,,,,
"mardi, juin 03, 2025",Ouverture,Cathy,Dynamique de groupe,Laurence,1602,,0.5,
"mercredi, juin 04, 2025",VmWare - découverte du matériel,Anthony Rizzello,Self Study,Stagiaires,1807,0.5,,0.5
"jeudi, juin 05, 2025",Apprendre à apprendre,Laurence,Apprendre à apprendre,Laurence,1807,,1,
"vendredi, juin 06, 2025",Conception des bases de données,bstorm - Robin Pecheur,Conception des bases de données,bstorm - Robin Pecheur,1807,1,,
"samedi, juin 07, 2025",,,,,,,,
"dimanche, juin 08, 2025",,,,,,,,
"lundi, juin 09, 2025",Pentecôte,,,,,,,
"mardi, juin 10, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,
"mercredi, juin 11, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,
"jeudi, juin 12, 2025",Communication,Laurence,Communication,Laurence,7105,,1,
"vendredi, juin 13, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,
"samedi, juin 14, 2025",,,,,,,,
"dimanche, juin 15, 2025",,,,,,,,
"lundi, juin 16, 2025",Conception des bases de données,bstorm - Robin Pecheur,Conception des bases de données,bstorm - Robin Pecheur,1807,1,,
"mardi, juin 17, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,
"mercredi, juin 18, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,
"jeudi, juin 19, 2025",Conception des bases de données,bstorm - Robin Pecheur,Conception des bases de données,bstorm - Robin Pecheur,1807,1,,
"vendredi, juin 20, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,
"samedi, juin 21, 2025",,,,,,,,
"dimanche, juin 22, 2025",,,,,,,,
"lundi, juin 23, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"mardi, juin 24, 2025",Logique de programmation C#,Yannick,Logique de programmation C#,Yannick,1807,1,,
"mercredi, juin 25, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,
"jeudi, juin 26, 2025",Recherche d'emploi ,Laurence,Recherche d'emploi ,Laurence,1807,,1,
"vendredi, juin 27, 2025",Git,Yannick,Git,Yannick,1807,1,,
"samedi, juin 28, 2025",,,,,,,,
"dimanche, juin 29, 2025",,,,,,,,
"lundi, juin 30, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"mardi, juillet 01, 2025",Git,Yannick,Git,Yannick,1807,1,,
"mercredi, juillet 02, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,
"jeudi, juillet 03, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,
"vendredi, juillet 04, 2025",Entretiens suivi individuel,Laurence,Communication,Laurence,1607,,1,
"samedi, juillet 05, 2025",,,,,,,,
"dimanche, juillet 06, 2025",,,,,,,,
"lundi, juillet 07, 2025",T-SQL - DML et DDL,bstorm - Robin Pecheur,T-SQL - DML et DDL,bstorm - Robin Pecheur,1807,1,,
"mardi, juillet 08, 2025",T-SQL - DML et DDL,bstorm - Robin Pecheur,T-SQL - DML et DDL,bstorm - Robin Pecheur,1807,1,,
"mercredi, juillet 09, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"jeudi, juillet 10, 2025",T-SQL - DML et DDL,bstorm - Robin Pecheur,T-SQL - DML et DDL,bstorm - Robin Pecheur,1807,1,,
"vendredi, juillet 11, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"samedi, juillet 12, 2025",,,,,,,,
"dimanche, juillet 13, 2025",,,,,,,,
"lundi, juillet 14, 2025",,,,,,,,
"mardi, juillet 15, 2025",,,,,,,,
"mercredi, juillet 16, 2025",,,,,,,,
"jeudi, juillet 17, 2025",,,,,,,,
"vendredi, juillet 18, 2025",,,,,,,,
"samedi, juillet 19, 2025",,,,,,,,
"dimanche, juillet 20, 2025",,,,,,,,
"lundi, juillet 21, 2025",Fête Nationale,,,,,,,
"mardi, juillet 22, 2025",,,,,,,,
"mercredi, juillet 23, 2025",,,,,,,,
"jeudi, juillet 24, 2025",,,,,,,,
"vendredi, juillet 25, 2025",,,,,,,,
"samedi, juillet 26, 2025",,,,,,,,
"dimanche, juillet 27, 2025",,,,,,,,
"lundi, juillet 28, 2025",T-SQL - DML et DDL,bstorm - Robin Pecheur,T-SQL - DML et DDL,bstorm - Robin Pecheur,1807,1,,
"mardi, juillet 29, 2025",HTML 5,bstorm - Robin Pecheur,HTML 5,bstorm - Robin Pecheur,1807,1,,
"mercredi, juillet 30, 2025",HTML 5,bstorm - Robin Pecheur,HTML 5,bstorm - Robin Pecheur,1807,1,,
"jeudi, juillet 31, 2025",CSS 3,bstorm - Robin Pecheur,CSS 3,bstorm - Robin Pecheur,1807,1,,
"vendredi, août 01, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"samedi, août 02, 2025",,,,,,,,
"dimanche, août 03, 2025",,,,,,,,
"lundi, août 04, 2025",CSS 3,bstorm - Robin Pecheur,CSS 3,bstorm - Robin Pecheur,1807,1,,
"mardi, août 05, 2025",Javascript/Typescrit Base ,bstorm - Robin Pecheur,Javascript/Typescrit Base ,bstorm - Robin Pecheur,1807,1,,
"mercredi, août 06, 2025",Javascript/Typescrit Base ,bstorm - Robin Pecheur,Javascript/Typescrit Base ,bstorm - Robin Pecheur,1807,1,,
"jeudi, août 07, 2025",Javascript/Typescrit Base ,bstorm - Robin Pecheur,Javascript/Typescrit Base ,bstorm - Robin Pecheur,1807,1,,
"vendredi, août 08, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"samedi, août 09, 2025",,,,,,,,
"dimanche, août 10, 2025",,,,,,,,
"lundi, août 11, 2025",Javascript/Typescrit Base ,bstorm - Robin Pecheur,Javascript/Typescrit Base ,bstorm - Robin Pecheur,1807,1,,
"mardi, août 12, 2025",Recherche d'emploi ,Laurence,Recherche d'emploi ,Laurence,1807,,1,
"mercredi, août 13, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,
"jeudi, août 14, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,
"vendredi, août 15, 2025",Assomption,,,,,,,
"samedi, août 16, 2025",,,,,,,,
"dimanche, août 17, 2025",,,,,,,,
"lundi, août 18, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"mardi, août 19, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,
"mercredi, août 20, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,
"jeudi, août 21, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,
"vendredi, août 22, 2025",Langage C# avancé,bstorm - Sébastien Bya,Langage C# avancé,bstorm - Sébastien Bya,1807,1,,
"samedi, août 23, 2025",,,,,,,,
"dimanche, août 24, 2025",,,,,,,,
"lundi, août 25, 2025",Langage C# avancé,bstorm - Sébastien Bya,Langage C# avancé,bstorm - Sébastien Bya,1807,1,,
"mardi, août 26, 2025",RE - Entretiens individuels,Laurence,RE - Entretiens individuels,Laurence,1602,,1,
"mercredi, août 27, 2025",Langage C#,Yannick,Langage C#,Yannick,1807,1,,
"jeudi, août 28, 2025",RE - Entretiens individuels,Laurence,Recherche d'emploi ,Laurence,1602,,1,
"vendredi, août 29, 2025",Labo ,Yannick,Labo ,Yannick,1807,1,,
"samedi, août 30, 2025",,,,,,,,
"dimanche, août 31, 2025",,,,,,,,
"lundi, septembre 01, 2025",Labo autonome,Stagiaires,Labo autonome,Stagiaires,1807 ou Extérieur,,,1
"mardi, septembre 02, 2025",Labo ,Yannick,Labo ,Yannick,1807,1,,
"mercredi, septembre 03, 2025",Labo autonome,Stagiaires,Labo autonome,Stagiaires,1807 ou Extérieur,,,1
"jeudi, septembre 04, 2025",Labo ,Yannick,Labo ,Yannick,1807,1,,
"vendredi, septembre 05, 2025",Langage C# avancé,bstorm - Sébastien Bya,Langage C# avancé,bstorm - Sébastien Bya,1807,1,,
"samedi, septembre 06, 2025",,,,,,,,
"dimanche, septembre 07, 2025",,,,,,,,
"lundi, septembre 08, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"mardi, septembre 09, 2025",Communication,Laurence,Recherche d'emploi ,Laurence,1702,,1,
"mercredi, septembre 10, 2025",Javascript/Typescrit Base ,bstorm - Sébastien Bya,Javascript/Typescrit Base ,bstorm - Sébastien Bya,1807,1,,
"jeudi, septembre 11, 2025",Javascript/Typescrit Base ,bstorm - Sébastien Bya,Javascript/Typescrit Base ,bstorm - Sébastien Bya,1807,1,,
"vendredi, septembre 12, 2025",LINQ et ADO.NET,bstorm - Sébastien Bya,LINQ et ADO.NET,bstorm - Sébastien Bya,1807,1,,
"samedi, septembre 13, 2025",,,,,,,,
"dimanche, septembre 14, 2025",,,,,,,,
"lundi, septembre 15, 2025",LINQ et ADO.NET,bstorm - Sébastien Bya,LINQ et ADO.NET,bstorm - Sébastien Bya,1807,1,,
"mardi, septembre 16, 2025",LINQ et ADO.NET,bstorm - Sébastien Bya,LINQ et ADO.NET,bstorm - Sébastien Bya,1807,1,,
"mercredi, septembre 17, 2025",Git (autonome),Yannick,Git (autonome),Yannick,1807,1,,
"jeudi, septembre 18, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,
"vendredi, septembre 19, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,
"samedi, septembre 20, 2025",,,,,,,,
"dimanche, septembre 21, 2025",,,,,,,,
"lundi, septembre 22, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,
"mardi, septembre 23, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,
"mercredi, septembre 24, 2025",Suivi de groupe ,Cathy et Laurence,Self-study,Extérieur,1607/Extérieur,,0.5,0.5
"jeudi, septembre 25, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,
"vendredi, septembre 26, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,
"samedi, septembre 27, 2025",,,,,,,,
"dimanche, septembre 28, 2025",,,,,,,,
"lundi, septembre 29, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,
"mardi, septembre 30, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,
"mercredi, octobre 01, 2025",Programmer base SQL Serveur,bstorm - Philippe Haerens,Programmer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,
"jeudi, octobre 02, 2025",ASP.NET - MVC,bstorm - Sébastien Bya,ASP.NET - MVC,bstorm - Sébastien Bya,1807,1,,
"vendredi, octobre 03, 2025",.NET Core,bstorm - Sébastien Bya,.NET Core,bstorm - Sébastien Bya,1807,1,,
"samedi, octobre 04, 2025",,,,,,,,
"dimanche, octobre 05, 2025",,,,,,,,
"lundi, octobre 06, 2025",.NET Core,bstorm - Sébastien Bya,.NET Core,bstorm - Sébastien Bya,1807,1,,
"mardi, octobre 07, 2025",.NET Core,bstorm - Sébastien Bya,.NET Core,bstorm - Sébastien Bya,1807,1,,
"mercredi, octobre 08, 2025",Programmer base SQL Serveur,bstorm - Philippe Haerens,Programmer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,
"jeudi, octobre 09, 2025",Simulations d'entretien,Laurence,Simulations d'entretien,Laurence,1607,,1,
"vendredi, octobre 10, 2025",.NET Core,bstorm - Sébastien Bya,.NET Core,bstorm - Sébastien Bya,1807,1,,
"samedi, octobre 11, 2025",,,,,,,,
"dimanche, octobre 12, 2025",,,,,,,,
"lundi, octobre 13, 2025",Entity Framework ,bstorm - Philippe Haerens,Entity Framework ,bstorm - Philippe Haerens,1807,1,,
"mardi, octobre 14, 2025",Entity Framework ,bstorm - Philippe Haerens,Entity Framework ,bstorm - Philippe Haerens,1807,1,,
"mercredi, octobre 15, 2025",Entity Framework ,bstorm - Philippe Haerens,Entity Framework ,bstorm - Philippe Haerens,1807,1,,
"jeudi, octobre 16, 2025",Créer des appl Web (Labo 2),bstorm - Philippe Haerens,Créer des appl Web (Labo 2),bstorm - Philippe Haerens,1807,1,,
"vendredi, octobre 17, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"samedi, octobre 18, 2025",,,,,,,,
"dimanche, octobre 19, 2025",,,,,,,,
"lundi, octobre 20, 2025",Créer des appl Web (Labo 2),bstorm - Philippe Haerens,Créer des appl Web (Labo 2),bstorm - Philippe Haerens,1807,1,,
"mardi, octobre 21, 2025",Labo autonome 2,Stagiaires,Labo autonome 2,Stagiaires,1807 ou extérieur,,,1
"mercredi, octobre 22, 2025",Créer des appl Web (Labo 2),bstorm - Philippe Haerens,Créer des appl Web (Labo 2),bstorm - Philippe Haerens,1807,1,,
"jeudi, octobre 23, 2025",Labo autonome 2,Stagiaires,Labo autonome 2,Stagiaires,1807 ou extérieur,,,1
"vendredi, octobre 24, 2025",Labo autonome 2,Stagiaires,Labo autonome 2,Stagiaires,1807 ou extérieur,,,1
"samedi, octobre 25, 2025",,,,,,,,
"dimanche, octobre 26, 2025",,,,,,,,
"lundi, octobre 27, 2025",Créer des appl Web (Labo 2),bstorm - Philippe Haerens,Créer des appl Web (Labo 2),bstorm - Philippe Haerens,1807,1,,
"mardi, octobre 28, 2025",Administrer base SQL Serveur,bstorm - Philippe Haerens,Administrer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,
"mercredi, octobre 29, 2025",Agile et SCRUM,bstorm - Laurent Fontaine,Agile et SCRUM,bstorm - Laurent Fontaine,1807,1,,
"jeudi, octobre 30, 2025",Agile et SCRUM,bstorm - Laurent Fontaine,Agile et SCRUM,bstorm - Laurent Fontaine,1807,1,,
"vendredi, octobre 31, 2025",Agile et SCRUM,bstorm - Laurent Fontaine,Agile et SCRUM,bstorm - Laurent Fontaine,1807,1,,
"samedi, novembre 01, 2025",,,,,,,,
"dimanche, novembre 02, 2025",,,,,,,,
"lundi, novembre 03, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,
"mardi, novembre 04, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,
"mercredi, novembre 05, 2025",Suivi des recherches ,Laurence,Self-study,Extérieur,DISTANCIEL,,0.5,0.5
"jeudi, novembre 06, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,
"vendredi, novembre 07, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,
"samedi, novembre 08, 2025",,,,,,,,
"dimanche, novembre 09, 2025",,,,,,,,
"lundi, novembre 10, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,
"mardi, novembre 11, 2025",Armistice,,,,,,,
"mercredi, novembre 12, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,
"jeudi, novembre 13, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,
"vendredi, novembre 14, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,
"samedi, novembre 15, 2025",,,,,,,,
"dimanche, novembre 16, 2025",,,,,,,,
"lundi, novembre 17, 2025",Typescript et Angular (partie client),bstorm - Philippe Haerens,Typescript et Angular (partie client),bstorm - Philippe Haerens,1807,1,,
"mardi, novembre 18, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,
"mercredi, novembre 19, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,
"jeudi, novembre 20, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,
"vendredi, novembre 21, 2025",TDD,bstorm - Philippe Haerens,TDD,bstorm - Philippe Haerens,1807,1,,
"samedi, novembre 22, 2025",,,,,,,,
"dimanche, novembre 23, 2025",,,,,,,,
"lundi, novembre 24, 2025",TDD,bstorm - Philippe Haerens,TDD,bstorm - Philippe Haerens,1807,1,,
"mardi, novembre 25, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,
"mercredi, novembre 26, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,
"jeudi, novembre 27, 2025",Design Pattern et UML,Yannick ,Design Pattern et UML,Yannick ,1807,1,,
"vendredi, novembre 28, 2025",Administrer base SQL Serveur,bstorm - Philippe Haerens,Administrer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,
"samedi, novembre 29, 2025",,,,,,,,
"dimanche, novembre 30, 2025",,,,,,,,
"lundi, décembre 01, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,
"mardi, décembre 02, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,
"mercredi, décembre 03, 2025",Programmer base SQL Serveur,bstorm - Philippe Haerens,Programmer base SQL Serveur,bstorm - Philippe Haerens,1807,1,,
"jeudi, décembre 04, 2025",Entretiens suivi individuel,Laurence,Self-study,Stagiaires,DISTANCIEL,,0.5,0.5
"vendredi, décembre 05, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,
"samedi, décembre 06, 2025",,,,,,,,
"dimanche, décembre 07, 2025",,,,,,,,
"lundi, décembre 08, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,
"mardi, décembre 09, 2025",Web API,bstorm - Philippe Haerens,Web API,bstorm - Philippe Haerens,1807,1,,
"mercredi, décembre 10, 2025",Labo Angular (Labo 3),bstorm - Philippe Haerens,Labo Angular (Labo 3),bstorm - Philippe Haerens,1807,1,,
"jeudi, décembre 11, 2025",Labo Autonomie,Stagiaires,Labo Autonomie,Stagiaires,1807 ou extérieur,,,1
"vendredi, décembre 12, 2025",Labo Angular (Labo 3),bstorm - Philippe Haerens,Labo Angular (Labo 3),bstorm - Philippe Haerens,1807,1,,
"samedi, décembre 13, 2025",,,,,,,,
"dimanche, décembre 14, 2025",,,,,,,,
"lundi, décembre 15, 2025",Labo Autonomie,Stagiaires,Labo Autonomie,Stagiaires,1807 ou extérieur,,,1
"mardi, décembre 16, 2025",Labo Angular (Labo 3),bstorm - Philippe Haerens,Labo Angular (Labo 3),bstorm - Philippe Haerens,1807,1,,
"mercredi, décembre 17, 2025",Labo Autonomie,Stagiaires,Labo Autonomie,Stagiaires,1807 ou extérieur,,,1
"jeudi, décembre 18, 2025",Labo Angular (Labo 3),bstorm - Philippe Haerens,Labo Angular (Labo 3),bstorm - Philippe Haerens,1807,1,,
"vendredi, décembre 19, 2025",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"samedi, décembre 20, 2025",,,,,,,,
"dimanche, décembre 21, 2025",,,,,,,,
"lundi, décembre 22, 2025",,,,,,,,
"mardi, décembre 23, 2025",,,,,,,,
"mercredi, décembre 24, 2025",,,,,,,,
"jeudi, décembre 25, 2025",Noël,,,,,,,
"vendredi, décembre 26, 2025",,,,,,,,
"samedi, décembre 27, 2025",,,,,,,,
"dimanche, décembre 28, 2025",,,,,,,,
"lundi, décembre 29, 2025",,,,,,,,
"mardi, décembre 30, 2025",,,,,,,,
"mercredi, décembre 31, 2025",,,,,,,,
"jeudi, janvier 01, 2026",,,,,,,,
"vendredi, janvier 02, 2026",,,,,,,,
"samedi, janvier 03, 2026",,,,,,,,
"dimanche, janvier 04, 2026",,,,,,,,
"lundi, janvier 05, 2026",Azure,bstorm - Sébastien Bya,Azure,bstorm - Sébastien Bya,1807,1,,
"mardi, janvier 06, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,
"mercredi, janvier 07, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,
"jeudi, janvier 08, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,
"vendredi, janvier 09, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,
"samedi, janvier 10, 2026",,,,,,,,
"dimanche, janvier 11, 2026",,,,,,,,
"lundi, janvier 12, 2026",Blazor,bstorm - Sébastien Bya,Blazor,bstorm - Sébastien Bya,1807,1,,
"mardi, janvier 13, 2026",Suivi des recherches ,Laurence,Self-study,Stagiaires,1807/Extérieur,,0.5,0.5
"mercredi, janvier 14, 2026",Sécurité (orienté programmation),bstorm - Philippe Haerens,Sécurité (orienté programmation),bstorm - Philippe Haerens,1807,1,,
"jeudi, janvier 15, 2026",Utilisation librairies IA,bstorm - Sébastien Bya,Utilisation librairies IA,bstorm - Sébastien Bya,1807,1,,
"vendredi, janvier 16, 2026",Utilisation librairies IA,bstorm - Sébastien Bya,Utilisation librairies IA,bstorm - Sébastien Bya,1807,1,,
"samedi, janvier 17, 2026",,,,,,,,
"dimanche, janvier 18, 2026",,,,,,,,
"lundi, janvier 19, 2026",Utilisation librairies IA,bstorm - Sébastien Bya,Utilisation librairies IA,bstorm - Sébastien Bya,1807,1,,
"mardi, janvier 20, 2026",Utilisation librairies IA,bstorm - Sébastien Bya,Utilisation librairies IA,bstorm - Sébastien Bya,1807,1,,
"mercredi, janvier 21, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,
"jeudi, janvier 22, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,
"vendredi, janvier 23, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,
"samedi, janvier 24, 2026",,,,,,,,
"dimanche, janvier 25, 2026",,,,,,,,
"lundi, janvier 26, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,
"mardi, janvier 27, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,
"mercredi, janvier 28, 2026",Ionic,bstorm - Sébastien Bya,Ionic,bstorm - Sébastien Bya,1807,1,,
"jeudi, janvier 29, 2026",Migration de données,bstorm - Sébastien Bya,Migration de données,bstorm - Sébastien Bya,1807,1,,
"vendredi, janvier 30, 2026",Migration de données,bstorm - Sébastien Bya,Migration de données,bstorm - Sébastien Bya,1807,1,,
"samedi, janvier 31, 2026",,,,,,,,
"dimanche, février 01, 2026",,,,,,,,
"lundi, février 02, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,
"mardi, février 03, 2026",Accompagnement projet autonome,bstorm - Sébastien Bya,Accompagnement projet autonome,bstorm - Sébastien Bya,1807,1,,
"mercredi, février 04, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,
"jeudi, février 05, 2026",Accompagnement projet autonome,bstorm - Sébastien Bya,Accompagnement projet autonome,bstorm - Sébastien Bya,1807,1,,
"vendredi, février 06, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,
"samedi, février 07, 2026",,,,,,,,
"dimanche, février 08, 2026",,,,,,,,
"lundi, février 09, 2026",Accompagnement projet autonome,bstorm - Sébastien Bya,Accompagnement projet autonome,bstorm - Sébastien Bya,1807,1,,
"mardi, février 10, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,
"mercredi, février 11, 2026",Self Study,Stagiaires,Self Study,Stagiaires,Extérieur,,,1
"jeudi, février 12, 2026",Projet final,bstorm - Sébastien Bya,Projet final,bstorm - Sébastien Bya,1807,1,,
"vendredi, février 13, 2026",Evaluation finale ,Cathy et Laurence,,,,0.5,
"samedi, février 14, 2026",,,,,,,,
"dimanche, février 15, 2026",,,,,,,,`;

  const parseFrenchDate = (dateString) => {
    if (!dateString) {
      return null;
    }

    let cleanedString = dateString.replace(/^[a-zA-ZÀ-ÿ]+,\s*/, "");
    cleanedString = cleanedString.replace(/(\d+),/, "$1");

    const monthMap = {
      janvier: "January",
      février: "February",
      mars: "March",
      avril: "April",
      mai: "May",
      juin: "June",
      juillet: "July",
      août: "August",
      septembre: "September",
      octobre: "October",
      novembre: "November",
      décembre: "December",
    };

    const parts = cleanedString.split(" ");
    if (parts.length === 3) {
      const monthNameFrench = parts[0].toLowerCase();
      const day = parts[1];
      const year = parts[2];
      const month = monthMap[monthNameFrench];

      if (!month) {
        return null;
      }

      const standardDateString = `${month} ${day}, ${year}`;
      const date = new Date(standardDateString);

      if (isNaN(date.getTime())) {
        return null;
      }
      return date;
    } else {
      const directParsedDate = new Date(dateString);
      if (isNaN(directParsedDate.getTime())) {
        return null;
      }
      return directParsedDate;
    }
  };

  useEffect(() => {
    const parsedData = parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    }).data;
    setScheduleData(parsedData);
  }, []);

  useEffect(() => {
    if (scheduleData.length > 0) {
      const todayFormatted = new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
        .format(currentDate)
        .replace(/\./g, "")
        .replace(/(\w+),\s(\w+)/, (match, p1, p2) => `${p1}, ${p2}`)
        .toLowerCase();

      const todayEntry = scheduleData.find((entry) => {
        if (!entry.Dates) return false;
        const csvDate = parseFrenchDate(entry.Dates);
        if (!csvDate || isNaN(csvDate.getTime())) {
          return false;
        }
        const formattedCsvDate = new Intl.DateTimeFormat("fr-FR", {
          weekday: "long",
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
          .format(csvDate)
          .replace(/\./g, "")
          .replace(/(\w+),\s(\w+)/, (match, p1, p2) => `${p1}, ${p2}`)
          .toLowerCase();

        return formattedCsvDate === todayFormatted;
      });
      setTodaySchedule(todayEntry || null);
    }
  }, [scheduleData, currentDate]);

  const getCurrentTimePeriod = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const isCurrentDate = currentDate.toDateString() === now.toDateString();

    if (!isCurrentDate) return "";

    if (currentHour > 8 || (currentHour === 8 && currentMinute >= 30)) {
      if (currentHour < 12) {
        return "Matin";
      }
    }

    if (currentHour === 12) {
      return "Pause";
    }

    if (currentHour > 13 || (currentHour === 13 && currentMinute >= 0)) {
      if (currentHour < 17) {
        return "Afternoon";
      }
    }

    return "";
  };

  const currentPeriod = getCurrentTimePeriod();

  const renderScheduleCard = (period) => {
    const formationKey =
      period === "Matin" ? "Formation Matin" : "Formation PM";
    const formateurKey =
      period === "Matin" ? "Formateur Matin" : "Formateur PM";
    const salleKey = "Salle";

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
              <strong>Salle :</strong>{" "}
              {todaySchedule[salleKey] || "Non spécifiée"}
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
      <h1 className="main-title">Planning</h1>

      <div className="date-selector">
        <input
          id="date-input"
          type="date"
          value={currentDate.toISOString().split("T")[0]}
          onChange={(e) => setCurrentDate(new Date(e.target.value))}
        />
      </div>

      <div className="today-schedule-section">
        <h2 className="section-title">
          Planning du jour ({currentDate.toLocaleDateString("fr-FR")})
        </h2>

        {todaySchedule ? (
          <div className="time-periods">
            {renderScheduleCard("Matin")}
            {renderScheduleCard("Pause")}
            {renderScheduleCard("Afternoon")}
            <div className="additional-info">
              <h3>Informations supplémentaires</h3>
              <p>
                <strong>Tech :</strong> {todaySchedule.Tech || "Non"}
              </p>
              <p>
                <strong>AT :</strong> {todaySchedule.AT || "Non"}
              </p>
              <p>
                <strong>Self :</strong> {todaySchedule.Self || "Non"}
              </p>
            </div>
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
              {scheduleData.map((row, index) => {
                const rowDate = parseFrenchDate(row.Dates);

                const rowDateFormatted = rowDate
                  ? new Intl.DateTimeFormat("fr-FR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(rowDate)
                  : "";

                const currentDateFormatted = new Intl.DateTimeFormat("fr-FR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(currentDate);

                const isCurrentDay = rowDateFormatted === currentDateFormatted;

                return (
                  <tr key={index} className={isCurrentDay ? "current-day" : ""}>
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
