(function($, _, OpenMRS) {
    OpenMRS.EncounterModel = function(obj) {
        $.extend(this, obj);
    }

    OpenMRS.EncounterModel.prototype = {
        constructor: OpenMRS.EncounterModel,

        canBeDeletedBy: function(userModel) {
            return userModel.hasPrivilege("Task: emr.patient.encounter.delete");
        },

        canBeEditedBy: function(userModel) {
            return userModel.hasPrivilege("Task: emr.patient.encounter.edit");
        },

        createdBy: function(userModel) {

            var creator;

            if (this.creator) {
                creator = this.creator;
            }
            else if (this.auditInfo && this.auditInfo.creator) {
                creator  = this.auditInfo.creator;
            }

            if (!creator) {
                return false; // if we don't know the creator, we can't answer, so default to false
            }

            return creator && creator.uuid == userModel.uuid;
        },

        participatedIn: function(provider) {
            if (!provider.uuid) {
                return false;
            }
            return _.find(this.encounterProviders, function(p) {
                return p.provider && p.provider.uuid == provider.uuid;
            })
        }
    }

})(jQuery, _, window.OpenMRS=window.OpenMRS||{});