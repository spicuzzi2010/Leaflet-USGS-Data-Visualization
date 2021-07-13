# Leaflet-USGS-Data-Visualization
USGS data visualization using Leaflet

![USGS](./Images/1-Logo.png)

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

## Basic Visualization

The [USGS.js](./static/js/logic.js) file contains the code for the below leaflet map which includes the following components:

* Data markers that reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.
* Popups that provide additional information about the earthquake when a marker is clicked.
* A legend.

![USGS Map](./Images/2-BasicMap.png)