# React + Redux + TypeScript + .NET Core + Server-Side Rendering (SSR) + Hot Module Replacement (HMR)

A sample project combining a variety of useful web development technologies originally shown to work together with .NET Core 2.0.

## Background

When .NET Core 2.0 was released, it included an excellent project template that combined React and Redux for the front end, .NET Core for the web API, with support both server-side rendering (SSR) and hot module replacement (HMR).
It was amazing!

When .NET Core 2.1 was released, this template was replaced by a much more primitive one that lacked SSR and HMR.

## About this Project

This repository aims to preserve the useful feature set of the original .NET Core 2.0 template while keeping the client and server side libraries up to date.
It is not in any way endorsed or supported by Microsoft, but it may prove useful to others who want this combination for their own projects.

What might _not_ be preserved is the original architecture of the .NET Core 2.0 project.
- It used Bootstrap, which pulls in JQuery, neither of which are needed for a clean-slate React project.
- Some of the 3rd party libraries it used are not being maintained and should be replaced.
- It originally separated 3rd party libraries into a secondary "vendor" JS bundle, with the intent of improving build performance, but the process it used complicates development and the gains are minimal, plus "tree shaking" is ineffective, resulting in a larger total JS download.
- The file and folder structure and naming patterns were inconsistent.
- MVC-style views were somewhat overused for a React project.

## Structure

- Solution.sln is the entry point for "classic" editions of Visual Studio (Pro, Community, etc).
- WebUI/WebUI.csproj is a suitable starting point for Visual Studio Code.
- WebUI/Startup.cs the entry point for the .NET code.
- WebUI/ClientApp contains all of the front-end script, including entry points for client and server side.
- WebUI/Controlers are conventional ASP.NET MVC-style controllers.
- WebUI/Views are conventional ASP.NET MVC-style views.

## Known Issues

- Visual Studio 2017 may not restore NPM packages on startup, fix by running `npm install` manually or by expanding Depdenciesand right-clicking "npm" and choosing Restore Packages.