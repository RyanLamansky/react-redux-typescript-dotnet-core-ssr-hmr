# React + Redux + TypeScript + .NET Core + Server-Side Rendering (SSR) + Hot Module Replacement (HMR)

A sample project combining a variety of useful web development technologies originally shown to work together with .NET Core 2.0's `dotnet new reactredux`, but updated for .NET Core 2.1 and newer versions of various libraries.

## Background

When .NET Core 2.0 was released, it included an excellent project template that combined React and Redux for the front end, .NET Core for the web API, with support for both server-side rendering (SSR) and hot module replacement (HMR).
It was amazing!

When .NET Core 2.1 was released, this template was replaced by a much more primitive one that lacked SSR and HMR.

## About this Project

This repository aims to preserve the useful feature set of the original .NET Core 2.0 template while keeping the client and server-side libraries up to date.
It is not in any way endorsed or supported by Microsoft, but it may prove useful to others who want this combination for their own projects.

Besides updating to newer versions of dependencies, it has been modified in the following ways:
- JQuery and Bootstrap have been replaced by hand-crafted SCSS and JavaScript, reducing bundle size considerably.
- The separate "vendor" JavaScript bundle has been removed; it had several negative side effects that weren't worth the gains.
- Code quality has improved through use of newer TypeScript features.

If time permits, the project will continue to be updated and improved, but there are no specific plans.

## Structure

- Solution.sln is the entry point for "classic" editions of Visual Studio (Pro, Community, etc).
- WebUI/WebUI.csproj is a suitable starting point for Visual Studio Code.
- WebUI/Startup.cs the entry point for the .NET code.
- WebUI/ClientApp contains all of the front-end script, including entry points for client and server side.
- WebUI/Controlers are conventional ASP.NET MVC-style controllers.
- WebUI/Views are conventional ASP.NET MVC-style views.

## Known Issues

- Visual Studio 2017 may not restore NPM packages on startup, fix by running `npm install` manually or by expanding Depdencies and right-clicking "npm" and choosing Restore Packages.