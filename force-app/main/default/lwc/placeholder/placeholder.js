import { LightningElement, api } from 'lwc';
/*static resource*/
import REAL_ESTATE_HUB_PLACEHOLDER from '@salesforce/resourceUrl/placeholder'


export default class Placeholder extends LightningElement {
    @api message

    placeholderUrl = REAL_ESTATE_HUB_PLACEHOLDER
}