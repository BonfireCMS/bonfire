/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'bf-editor-preview',
  'Integration: BfEditorPreviewComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#bf-editor-preview}}
      //     template content
      //   {{/bf-editor-preview}}
      // `);

      this.render(hbs`{{bf-editor-preview}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
