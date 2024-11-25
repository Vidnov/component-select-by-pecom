import { describe, it, expect } from 'vitest';
import {mount} from "@vue/test-utils";
import vArrow from './vArrow.vue';


describe('vArrow.vue', () => {
    it('renders an SVG with correct attributes', () => {
        const wrapper = mount(vArrow);

        // Проверяем, что SVG элемент рендерится
        const svgElement = wrapper.find('svg');
        expect(svgElement.exists()).toBe(true);
        // Проверяем атрибуты SVG
        expect(svgElement.attributes('width')).toBe('24');
        expect(svgElement.attributes('height')).toBe('24');
        expect(svgElement.attributes('viewBox')).toBe('0 0 24 24');
        expect(svgElement.attributes('fill')).toBe('none');
        expect(svgElement.attributes('xmlns')).toBe('http://www.w3.org/2000/svg');

        // Проверяем атрибуты <path>
        const pathElement = wrapper.find('path');
        expect(pathElement.exists()).toBe(true);
        expect(pathElement.attributes('d')).toBe('M6 9L12 15L18 9');
        expect(pathElement.attributes('stroke')).toBe('#2B2B2B');
        expect(pathElement.attributes('stroke-width')).toBe('1.28571');
        expect(pathElement.attributes('stroke-linecap')).toBe('round');
        expect(pathElement.attributes('stroke-linejoin')).toBe('round');
    });
});