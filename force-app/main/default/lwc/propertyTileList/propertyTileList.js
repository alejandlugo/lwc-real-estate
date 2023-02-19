import { LightningElement,wire } from 'lwc';
import getRealEstateProperties from '@salesforce/apex/RealEstatePropertyController.getRealEstateProperties'

//Lightning Message Service
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import PROPERTY_FILTERED_MESSAGE from '@salesforce/messageChannel/PropertyFiltered__c';

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
        console.log('received lms')
        console.log(message)
        this.filters = {...message.filters}
    }

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
}