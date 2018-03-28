(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   *
   * Access the Cubbles-Component-Model:
   * > Access slot values:
   * slot 'message': this.getMessage(); | this.setMessage(value)
   */
  CubxComponent({
    is: 'elem-one',

    listener: {
      'message.change': 'inputFieldMessageChanged',
      'change': 'changeListener'
    },
    /**
     * Manipulate an element’s local DOM when the element is constructed.
     */
    ready: function () {
      // set value-attribute of element with id='message' to the initial value of slot 'message'
      this.$.message.value = this.getMessage();
    },

    /**
     * A handler to be called by a dom-element
     * @param {event} event
     */
    inputFieldMessageChanged: function (event) {
      // update the cubbles-model
      this.setMessage(event.target.value);
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'message' has changed ...
     */
    modelMessageChanged: function (newValue) {
      // update the view
      this.$.message.value = newValue;
    },
    /**
     * A handler to be called by all subtree changes.
     * @param {event} event
     */
    changeListener: function (event) {
      console.log('A value changed from ' + event.target);
    }
  });
}());
