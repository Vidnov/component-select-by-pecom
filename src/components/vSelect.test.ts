import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import vSelect from './vSelect.vue';
describe('vSelect', () => {
  it('render vSelect', () => {
    const wrapper = mount(vSelect, {
     props: {
         options: [
             { id: 0, name: 'Option 1' },
             { id: 1, name: 'Option 2' },
             { id: 2, name: 'Option 3' },
             { id: 3, name: 'Option 4' },
         ],
     }
    });
  });
});
