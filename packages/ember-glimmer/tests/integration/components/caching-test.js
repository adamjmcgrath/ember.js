import { computed } from 'ember-metal';
import { Component, compile } from '../../utils/helpers';
import { moduleFor, RenderingTest } from '../../utils/test-case';

moduleFor('Components test: caching', class extends RenderingTest {

  ['@test components with dynamic injections are not cached']() {
    let counter = 0;

    let FooBarComponent = Component.extend({
      layout: computed(function () {
        return compile('{{foo.bar}}');
      })
    });

    this.owner.register('foo:bar', Ember.Object.extend({
      bar: computed(function() {
        return ++counter;
      })
    }), { singleton: false });

    this.registerComponent('foo-bar', { ComponentClass: FooBarComponent });
    this.owner.inject('component:foo-bar', 'foo', 'foo:bar');

    this.render('{{foo-bar}}, {{foo-bar}}');

    this.assertText('1, 2');
  }

});
