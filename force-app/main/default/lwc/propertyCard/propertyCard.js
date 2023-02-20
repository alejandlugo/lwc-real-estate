import { LightningElement, wire } from 'lwc';
import { getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

//Lightning Message Service
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import PROPERTY_SELECTED_MESSAGE from '@salesforce/messageChannel/PropertySelected__c';

// Real Estate Property Schema
import REAL_ESTATE_OBJECT from '@salesforce/schema/Real_Estate_Property__c';
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

export default class PropertyCard extends NavigationMixin(LightningElement) {
    
    recordId

    subscription

    nameField;
    pictureField;

    mapMarkers
  
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

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    /* Load context for LMS */
    @wire(MessageContext)
    messageContext;

    /* Subscribe to LMS channel */
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                PROPERTY_SELECTED_MESSAGE,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    /* Unsubscribe to LMS channel */
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    /* Handler for message received by propertyTile */
    handleMessage(message) {
        this.recordId = message.propertyId
    }

    handleRecordLoaded(event){
        const {records} = event.detail
        const recordData = records[this.recordId]

        this.nameField = getFieldValue(recordData, NAME_FIELD)
        this.pictureField = getFieldValue(recordData, PICTURE_URL_FIELD)

        // Style the Location map to fit the available space
        const style = document.createElement('style');
        style.innerText = `.slds-map {
        min-width: 0 !important;
        }`;
        this.template.querySelector('lightning-map').appendChild(style);

        this.mapMarkers = [
            {
                location: {
                    Latitude: recordData.fields.Location__Latitude__s.value,
                    Longitude: recordData.fields.Location__Longitude__s.value,
                },
            },
        ]
    }

    handleNavigateToRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:this.recordId,
                objectApiName: REAL_ESTATE_OBJECT.objectApiName,
                actionName:'view'
            }
        })
    }
    
}