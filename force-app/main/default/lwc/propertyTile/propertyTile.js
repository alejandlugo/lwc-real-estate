import { LightningElement, api } from 'lwc';

export default class PropertyTile extends LightningElement {

    @api realEstateProperty;

    handleClick(){
        this.dispatchEvent(new CustomEvent('selected', {
            detail:this.realEstateProperty.Id
        }))
    }
}