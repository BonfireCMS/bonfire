/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'bf-editor',
  'Integration: BfEditorComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#bf-editor}}
      //     template content
      //   {{/bf-editor}}
      // `);

      this.render(hbs`{{bf-editor}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
