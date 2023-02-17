import { LightningElement } from 'lwc';
import { getFieldValue } from 'lightning/uiRecordApi';

// Real Estate Property Schema
import NAME_FIELD from '@salesforce/schema/Real_Estate_Property__c.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Real_Estate_Property__c.Picture_URL__c';
import BATHROOMS_FIELD from '@salesforce/schema/Real_Estate_Property__c.Bathrooms__c';
import BEDROOMS_FIELD from '@salesforce/schema/Real_Estate_Property__c.Bedrooms__c';
import FLOORS_FIELD from '@salesforce/schema/Real_Estate_Property__c.Floors__c';
import GARAGES_FIELD from '@salesforce/schema/Real_Estate_Property__c.Garage_Allocations__c';
import PRICE_FIELD from '@salesforce/schema/Real_Estate_Property__c.Price__c';
import SQUARE_FEET_FIELD from '@salesforce/schema/Real_Estate_Property__c.Square_Feet__c';
import FURNISHED_FIELD from '@salesforce/schema/Real_Estate_Property__c.Furnished__c';
import AMENITIES_FIELD from '@salesforce/schema/Real_Estate_Property__c.Amenities__c';
import LOCATION_FIELD from '@salesforce/schema/Real_Estate_Property__c.Location__c';
import TYPE_FIELD from '@salesforce/schema/Real_Estate_Property__c.Type__c';
import SALE_TYPE_FIELD from '@salesforce/schema/Real_Estate_Property__c.Sale_Type__c';
export default class PropertyCard extends LightningElement {
    
    recordId = 'a008N000001WpyfQAC';

    nameField;
    pictureField;
  
    bathroomsField = BATHROOMS_FIELD
    bedroomsField = BEDROOMS_FIELD
    priceField = PRICE_FIELD
    floorsField = FLOORS_FIELD
    garagesField = GARAGES_FIELD
    squareFeetField = SQUARE_FEET_FIELD
    furnishedField = FURNISHED_FIELD
    locationField = LOCATION_FIELD
    typeField = TYPE_FIELD
    saleTypeField = SALE_TYPE_FIELD
    amenitiesField = AMENITIES_FIELD

    handleRecordLoaded(event){
        const {records} = event.detail
        const recordData = records[this.recordId]

        this.nameField = getFieldValue(recordData, NAME_FIELD)
        this.pictureField = getFieldValue(recordData, PICTURE_URL_FIELD)
        
    }
    
}