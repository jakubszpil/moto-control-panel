# Control Panel

Application which is a project for the Motorola Science Cup competition.

It is a program that responds to the task of building an operator application using data provided by network monitoring systems.

An application that is a control panel that allows you to:

- browse available devices
- view information about available devices
- filter devices
- track the location of the indicated device
- observe devices deployed on the map

### Technology stack

- React JS
- Typescript
- React Redux Toolkit
- React Leaflet + Leaflet
- React Bootstrap + Bootstrap

# Navigation

1. [Getting Started](#getting-started)

- [Prerequisites](#prerequisites)
- [How to ...?](#how-to)
  - [How to install application](#how-to-install-application)
  - [How to run application in the development mode](#how-to-run-application-in-the-development-mode)
  - [How to run tests](#how-to-run-test)
  - [How to build application for the production](#how-to-build-application-for-the-production)
  - [How to run built application](#how-to-run-built-application)

2. [FAQ](#faq)

- [DEFINITIONS](#definitions)
  - [What is this app?](#what-is-this-app)
  - [What does the application view consist of?](#what-does-the-application-view-consist-of)
  - [What is the purpose of this app?](#what-is-the-purpose-of-this-app)
  - [What was the content of the task this application responds to?](#what-was-the-content-of-the-task-this-application-responds-to)
- [FEATURES](#features)
  - [What does the application show on the map?](#what-does-the-application-show-on-the-map)
  - [Can I select and track any device?](#can-i-select-and-track-any-device)
  - [Can I filter visible devices on the map?](#can-i-filter-visible-devices-on-the-map)
  - [Do the data update on a regular basis?](#do-the-data-update-on-a-regular-basis)
  - [Can I open the application on my phone?](#can-i-open-the-application-on-my-phone)

## Getting started

### Prerequisites

- Google Chrome: 89.0.4389.82
- NPM: 7.5.4
- NODE: 12.16.3
- Data simulator that is not part of this solution and is not included in the code.

### How to

1. #### How to install application

To install all needed dependencies run:

```bash
npm install
```

2. #### How to run application in the development mode

To run application in the development mode run:

```bash
npm start
```

3. #### How to run tests

To run all tests run:

```bash
npm run test
```

4. #### How to build application for the production

To build application for the production run:

```bash
npm run build
```

5. #### How to run built application

To run built application run:

```bash
serve build
```

## FAQ

If you have some more questions, you may find a answer in following topics.

1. [DEFINITIONS](#definitions)

- [What is this app?](#what-is-this-app)
- [What does the application view consist of?](#what-does-the-application-view-consist-of)
- [What is the purpose of this app?](#what-is-the-purpose-of-this-app)
- [What was the content of the task this application responds to?](#what-was-the-content-of-the-task-this-application-responds-to)

2. [FEATURES](#features)

- [What does the application show on the map?](#what-does-the-application-show-on-the-map)
- [Can I select and track any device?](#can-i-select-and-track-any-device)
- [Can I filter visible devices on the map?](#can-i-filter-visible-devices-on-the-map)
- [Do the data update on a regular basis?](#do-the-data-update-on-a-regular-basis)
- [Can I open the application on my phone?](#can-i-open-the-application-on-my-phone)

### Definitions

#### What is this app?

It is an operator application that uses and enables the display of data provided by the network monitoring systems

#### What does the application view consist of?

The main view of the application consists of a map displaying devices located around the city and a table displaying the data of these devices.

#### What is the purpose of this app?

The purpose of the application is to be able to view and track network monitoring devices

#### What was the content of the task this application responds to?

"Special communications network operators have access to information about all devices in the network. This information is often presented graphically. Your task will be to build an operator application using data provided by network monitoring systems."

### Features

#### What does the application show on the map?

The application on the map shows the locations of the devices. When you click on a device location pin, a popup with device details will appear.

#### Can I select and track any device?

Yes, You can choose and track any device. Just click on the pin of any device or click on a row in the table for a given device. The application will now track the selected device.

#### Can I filter visible devices on the map?

Yes, You can filter the available devices. All you have to do is enter the given phrase in the field, the table will show the filtered data in real time.

#### Do the data update on a regular basis?

The data is updated on a regular basis every 5 seconds.

#### Can I open the application on my phone?

Yes, You can open this application on your phone. The application is responsive. Moreover, you can run it on a tablet or other mobile device.
