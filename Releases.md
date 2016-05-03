# Release History

## 2.4.0
* for cubx.core.rte@1.8.0

## 2.3.0
  * PLAT-340
    * cubx.core.rte@1.7.0
    * The attribute `data-CRCInit.loadCIF` changed in `data-crcinit-loadcif`
    * dependency of a cubbles element can configured directy in the tag by attribute "cubx-dependency"

## 2.2.0
* generate selecton under usage cubx.core.rte@1.6.0

## 2.1.0
* use eslint for code validation rather than jscs and jshint

## 2.0.1
### BugFix
* correct usage of schema file from cubx-webpackage-document-api

## 2.0.0
### Improvement
* use cubx.core.rte@1.5.0 (PLAT-409)
* use cubx-webpackage-document-api version ^3.0.0

### BugFix
* template for utility improved:  html-import.html reference js/util.js.

## 1.9.0
* included: created, attached and cubReady licecycle methods to the template of elementary component
* included: resources contains the component-css file (just by generating compoundComponent)
* use cubx.core.rte@1.4.0

## 1.8.0

* PLAT-380: "+webpackage-createElementary" and "+webpackage-createCompound" generate also demo-app for the component
* occurences of "cubixx" changed in "cubbles"

## 1.7.4

* Linefeed on Fileends (webpackage-demo)

## 1.7.3

* Linefeed on file ends

## 1.7.2
* Templates for modelVersion 8.3 and updated cubx.core.rte to version 1.3.0

## 1.7.1
* BugFix:
** referenced cubx-webpackage-document-api.git version v2.4.1

## 1.7.0
* modelVersion 8.3.0
* referenced cubx-webpackage-document-api.git version v2.4.0
* Template of webpackage changed ( added cubx-core-crc container in app/index.html)

## 1.6.2
* shift runnables in appArtifact for +createWebpackage and _createWebpackageDemo

## 1.6.1
* modelVersion in Templates auf 8.2 updated

## 1.6.0
* cubx.core.rte refences updated to version 1.2.1

## 1.5.0
* modelVersion 8.2
* PLAT-369 - create app contains  runnables
* referenced  cubx-webpackage-document-api version 2.3.0

## 1.4.0
* minor changes: webpackage-template completed with jscs and jshint config

## 1.3.0
* jscs and jshint config integrated in webpackage template

## 1.2.0
* new config file integriert: .webpackage
* PLAT-351 - relative path to cubx.core.rte crc-loader and webcomponents reference
* use a new version of cubx-webpackage-document-api (2.2.0)
* modelVersion 8.1.0

## 1.1.0
* use a new version of cubx-webpackage-document-api (2.1.0)

## 1.0.0 Initial Release
* finalized Version
* used cubx-webpackage-document-api 2.0.0

## 0.1.0 Initial Release work in progress
* Includes a task `+createWebpackage` to be used to create a new webpackage.
* Includes a task `+webpackage_createApp` to be used to create a new app.
* Includes a task `+webpackage_createUtility` to be used to create a new utility.
