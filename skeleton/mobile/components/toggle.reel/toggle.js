var Montage = require("montage/core/core").Montage,
    Component = require("montage/ui/component").Component;

exports.Toggle = Montage.create(Component, {
    
    prepareForDraw: {
        value: function() {
            // Just temporary to test, should probably work on whole element.
            this._element.addEventListener("click", function(event) {
                this.classList.toggle("montage-Toggle--checked");
            }, true);
        }
    }

});