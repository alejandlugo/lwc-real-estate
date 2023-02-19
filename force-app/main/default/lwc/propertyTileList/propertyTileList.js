import { LightningElement,wire } from 'lwc';
import getRealEstateProperties from '@salesforce/apex/RealEstatePropertyController.getRealEstateProperties'

export default class PropertyTileList extends LightningElement {

    realEstateProperties;

    filters = {}

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