import { LightningElement,wire } from 'lwc';
import getRealEstateProperties from '@salesforce/apex/RealEstatePropertyController.getRealEstateProperties'

//Lightning Message Service
import {
    publish,
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import PROPERTY_FILTERED_MESSAGE from '@salesforce/messageChannel/PropertyFiltered__c';
import PROPERTY_SELECTED_MESSAGE from '@salesforce/messageChannel/PropertySelected__c';

export default class PropertyTileList extends LightningElement {

    subscription = null;

    realEstateProperties;

    filters = {}

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    /* Load context for LMS */
    @wire(MessageContext)
    messageContext;

    @wire(getRealEstateProperties, {filters: '$filters'})
    realEstateHandler({data,error}){
        if(data){
            console.log(data)
            this.realEstateProperties = data
        }
        if(error){
            console.error(error)
        }
    }

    /* Subscribe to LMS channel */
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                PROPERTY_FILTERED_MESSAGE,
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

    /* Handler for message received by propertyFilter */
    handleMessage(message) {
        this.filters = {...message.filters}
    }

    /* Handler for property selected */
    handlePropertySelected(event){
        console.log('selected car id ', event.detail)
        publish(this.messageContext, PROPERTY_SELECTED_MESSAGE, {propertyId: event.detail})
    }

    
}