/**
 * Created by SadhanaRamachandran on 4/9/16.
 */
// Here's my data model

//define(['jquery', 'knockout'],
    //function   ($, ko) {
        //jQuery, canvas and the app/sub module are all
        //loaded and can be used here now.
        /*var ViewModel = function(first, last) {
            this.firstName = ko.observable(first);
            this.lastName = ko.observable(last);

            this.fullName = ko.pureComputed(function() {
                // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
                return this.firstName() + " " + this.lastName();
            }, this);

    this.availableAttributes = ko.observableArray(['Timestamp', 'Destination ip', 'Destination vn']);
    this.chosenAttributes = ko.observableArray(['Timestamp']); // Initially, only Germany is selected


};*/

function WhereOp() {
    this.attr = "";
    this.cond = "";
    this.value = "";
};

var formViewModel = function() {
    var self = this;
    self.fromTime = ko.observable("0");
    self.toTime = ko.observable("100");
    self.selectedAtrributes = ko.observableArray([]);
    self.operandList = ko.observableArray([]);
    self.connectingOps = ko.observableArray([]);

    self.availableAttributes = ko.observableArray(['Destination ip', 'Destination vn', 'Direction ingress',
    'Destination port', 'Protocol', 'Source ip', 'Source vn', 'Source port', 'Sum of bytes', 'Sum of packets']);

    self.whereCond = new WhereOp();
    self.chosenAttributes = ko.observableArray(['Sum of packets']);

    self.conditions = ko.observableArray(['=', '!=', '<', '>', '<=', '>=', 'in', 'like']);
    self.conditionValue
    
};

$(document).ready(function () {

    //ko.applyBindings(viewmodel);
    //ko.applyBindings(new ViewModel("Planet", "Earth"));
    ko.applyBindings(new formViewModel());




});

        //ko.applyBindings(new ViewModel("Planet", "Earth"));
    //});
