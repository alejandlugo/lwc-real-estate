public with sharing class RealEstatePropertyController {
    @AuraEnabled(cacheable=true)
    public static List<Real_Estate_Property__c> getRealEstateProperties(){
        return [SELECT Id, Name, Price__c, Sale_Type__c, Type__c FROM Real_Estate_Property__c];
    }
}