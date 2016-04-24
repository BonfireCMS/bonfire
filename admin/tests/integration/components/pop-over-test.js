/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'pop-over',
  'Integration: PopOverComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#pop-over}}
      //     template content
      //   {{/pop-over}}
      // `);

      this.render(hbs`{{pop-over}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
