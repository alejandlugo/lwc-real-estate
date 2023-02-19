import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import REAL_ESTATE_OBJECT from '@salesforce/schema/Real_Estate_Property__c';

// Real Estate Property Schema
import TYPE_FIELD from '@salesforce/schema/Real_Estate_Property__c.Type__c';
import SALE_TYPE_FIELD from '@salesforce/schema/Real_Estate_Property__c.Sale_Type__c';

//Lightning Message Service and a message channel
import { publish, MessageContext } from 'lightning/messageService';
import PROPERTY_FILTERED_MESSAGE from '@salesforce/messageChannel/PropertyFiltered__c';

// Constants
const TYPE_ERROR = 'Error loading types'
const SALE_TYPE_ERROR = 'Error loading sale types'

export default class PropertyFilter extends LightningElement {

    typeError = TYPE_ERROR
    saleTypeError = SALE_TYPE_ERROR

    filters = {
        searchKey:'',
        maxPrice:3000000,
        saleType:'',
        types: []
    }

    timer

    /*Load context for LMS */
    @wire(MessageContext)
    messageContext;

    /*Fetching picklist values for the filters */
    @wire(getObjectInfo, { objectApiName: REAL_ESTATE_OBJECT })
    realEstateObjectInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$realEstateObjectInfo.data.defaultRecordTypeId',
        fieldApiName: TYPE_FIELD
    })
    typeOptions

    @wire(getPicklistValues, {
        recordTypeId: '$realEstateObjectInfo.data.defaultRecordTypeId',
        fieldApiName: SALE_TYPE_FIELD
    })
    saleTypeOptions

    /* Search Key handler */
    handleSearchKeyChange(event){
        this.filters = {...this.filters, searchKey: event.target.value}
        this.sendDataToPropertyList()
    }

    /* Max price slider handler */
    handleMaxPriceChange(event){
        this.filters = {...this.filters, maxPrice: event.target.value}
        this.sendDataToPropertyList()
    }

    /* Type checkbox group handler */
    handleTypeChange(event) {
        this.filters = {...this.filters, types: event.target.value}
        this.sendDataToPropertyList()
    }

    /* Sale type radio button handler */
    handleSaleTypeChange(event) {
        this.filters = {...this.filters, saleType: event.target.value}
        this.sendDataToPropertyList()
    }

    sendDataToPropertyList(){
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(()=>{
            publish(this.messageContext, PROPERTY_FILTERED_MESSAGE, { filters: this.filters });
        }, 400)
        
    }

}