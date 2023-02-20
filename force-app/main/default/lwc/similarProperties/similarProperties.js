import { LightningElement, api, wire } from 'lwc';
import getSimilarRealEstateProperties from '@salesforce/apex/RealEstatePropertyController.getSimilarRealEstateProperties'
import {getRecord, getFieldValue } from 'lightning/uiRecordApi'
import TYPE_FIELD from '@salesforce/schema/Real_Estate_Property__c.Type__c'
import {NavigationMixin} from 'lightning/navigation'

export default class SimilarProperties extends NavigationMixin(LightningElement) {

    @api recordId
    @api objectApiName

    similarProperties

    @wire(getRecord, {recordId: '$recordId', fields:[TYPE_FIELD]})
    realEstateProperty

    fetchSimilarProperties(){
        console.log('button clicked')
        console.log(this.recordId)
        console.log(getFieldValue(this.realEstateProperty.data, TYPE_FIELD))
        getSimilarRealEstateProperties({
            propertyId: this.recordId,
            type: getFieldValue(this.realEstateProperty.data, TYPE_FIELD)
        }).then(result=>{
            this.similarProperties = result
            console.log(this.similarProperties)
        }).catch(error=>{
            console.error(error)
        })
    }

    handleViewDetailsClick(event){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:event.target.dataset.id,
                objectApiName:this.objectApiName,
                actionName:'view'
            }
        })
    }
}