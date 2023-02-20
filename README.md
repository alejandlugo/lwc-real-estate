# Real Estate Hub

Real Estate Hub is a custom Salesforce Lightning Application used by real estate brokers to manage available properties in the Salesforce organization. All development is done through Lightning Web Components, Aura Components, and Apex.

The app consists of a custom Lightning App Page called Real Estate Explorer that is made up of a record grid, a filter, and a component card to view more details about the record. Communication between components is done through the Lightning Message Service.

In addition to the custom Lightning App Page, a record page component is provided to display similar records.

## Features

### Real Estate Explorer

Custom Lightning App Page, comprises of Filter, Grid, Details.

#### Custom Layout

A custom 2,7,3 three column layout has been used for Real Estate Explorer.

![](https://raw.githubusercontent.com/alejandlugo/lwc-real-estate/main/resources/273%20Custom%20Layout.jpg)

#### Search

Search bar for filtering records.

![](https://raw.githubusercontent.com/alejandlugo/lwc-real-estate/main/resources/Search%20bar.gif)

#### Filter

Aditional filters to refine the search for records.

![](https://raw.githubusercontent.com/alejandlugo/lwc-real-estate/main/resources/Additional%20filters.gif)

#### View Details

Additional details can be seen when clicking on a property in the grid.

![](https://github.com/alejandlugo/lwc-real-estate/blob/main/resources/View%20details.gif?raw=true)

#### Location

Map component in the additional details section to check the location of the property.

![](https://github.com/alejandlugo/lwc-real-estate/blob/main/resources/Location.gif?raw=true)

### Similar Records

Fetch similar records in the property record page.

![](https://github.com/alejandlugo/lwc-real-estate/blob/main/resources/fetch%20records.gif?raw=true)