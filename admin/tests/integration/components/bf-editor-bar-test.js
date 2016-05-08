/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'bf-editor-bar',
  'Integration: BfEditorBarComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#bf-editor-bar}}
      //     template content
      //   {{/bf-editor-bar}}
      // `);

      this.render(hbs`{{bf-editor-bar}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
