# Rick&Morty practice project

## Create-react-app is deprecated, use vite instead

### More info

- package.json is used to give more information about the project, generate npm library, and to take care of dependancies.
  there are 3 types of dependecies, regular dependency, devDependancy and peerDependancy
  - regular depndancies are npm packages that are required for code execution in browser
  - dev dependancies are npm packages that are used for easier developement of code, but are not included in a final bundle
  - peerDependencies , used for creating npm packages, it demands that the repo in which the package is being installed has already its own version of those dependencies
