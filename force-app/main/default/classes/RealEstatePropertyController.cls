public with sharing class RealEstatePropertyController {

    public class Filters{
        @AuraEnabled
        public String searchKey{get;set;}
        @AuraEnabled
        public Decimal maxPrice{get;set;}
        @AuraEnabled
        public String[] types{get;set;}
        @AuraEnabled
        public String saleType{get;set;}
    }

    /**
    * @description : Create a dynamic query with different values that front send to apex.
    * @param filters Class(Filter) : Wrapper class to send especific values for a dynamic query
    * @return List<Real_Estate_Property__c> 
    **/
    @AuraEnabled(cacheable=true)
    public static List<Real_Estate_Property__c> getRealEstateProperties(Filters filters){
        try {
            String key,saleType, whereClause = '';
            Decimal maxPrice;
            String[] types,criteria = new List<String>{};
            System.debug('shego el lecherooo');
            System.debug(filters);
            if(filters != null){
                System.debug('Hay filters');
                maxPrice = filters.maxPrice;
                types = filters.types;
                saleType = filters.saleType;
                if(String.isNotEmpty(filters.searchKey)){
                    System.debug('Hay searchkey');
                    key = '%' + String.escapeSingleQuotes(filters.searchKey) + '%';
                    criteria.add('Name LIKE :key');
                    System.debug(criteria);
                }
                if(maxPrice >= 0){
                    System.debug('Hay maxprice');
                    criteria.add('Price__c <= :maxPrice');
                    System.debug(criteria);
                }
                if(filters.types != null && filters.types.size() > 0){
                    System.debug('Hay types');
                    criteria.add('Type__c IN :types');
                    System.debug(criteria);
                }
                if(String.isNotEmpty(saleType)){
                    System.debug('Hay saleType');
                    criteria.add('Sale_Type__c = :saleType');
                    System.debug(criteria);
                }
                if(criteria.size() > 0){
                    System.debug('Hay criterias');
                    whereClause = 'WHERE ' + String.join(criteria, ' AND ');
                    System.debug(whereClause);
                }
            }
            System.debug('a punto de escribir el query');
            String query = 'SELECT Id, Name, Price__c, Sale_Type__c, Type__c, Picture_URL__c FROM Real_Estate_Property__c ' + whereClause + ' WITH SECURITY_ENFORCED ' + 'ORDER BY Name';
            System.debug(query);
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /**
    * @description : Get similar Real Estate Property records based on the type.
    * @param propertyId Id : Record Id of the property record in order to not fetch the same record again
    * @param type String : parameter to check for similar records
    * @return Real_Estate_Property__c[]
    **/
    @AuraEnabled(cacheable=true)
    public static Real_Estate_Property__c[] getSimilarRealEstateProperties(Id propertyId, String type){
        return [SELECT Id, Name, Price__c, Sale_Type__c, Picture_URL__c FROM Real_Estate_Property__c WHERE Type__c = :type AND Id != :propertyId LIMIT 6];
    }
}