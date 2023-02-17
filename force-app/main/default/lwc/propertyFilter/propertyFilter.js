import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import REAL_ESTATE_OBJECT from '@salesforce/schema/Real_Estate_Property__c';

// Real Estate Property Schema
import TYPE_FIELD from '@salesforce/schema/Real_Estate_Property__c.Type__c';
import SALE_TYPE_FIELD from '@salesforce/schema/Real_Estate_Property__c.Sale_Type__c';

// Constants
const TYPE_ERROR = 'Error loading types'
const SALE_TYPE_ERROR = 'Error loading sale types'

export default class PropertyFilter extends LightningElement {

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

    typeError = TYPE_ERROR
    saleTypeError = SALE_TYPE_ERROR

    filters = {
        searchKey:'',
        maxPrice:3000000
    }

    typesSelected = [];
    saleTypeSelected = '';

    handleTypeChange(event) {
        this.typesSelected = event.detail.value;
        console.log(this.typesSelected)
    }

    handleSaleTypeChange(event) {
        this.saleTypesSelected = event.detail.value;
        console.log(this.saleTypesSelected)
    }

    handleSearchKeyChange(event){
        console.log(event.target.value)
        this.filters.searchKey = {...this.filters, searchKey: event.target.value}
    }

    handleMaxPriceChange(event){
        console.log(event.target.value)
        this.filters.searchKey = {...this.filters, maxPrice: event.target.value}
    }



}