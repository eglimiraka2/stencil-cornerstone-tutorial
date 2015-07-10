import $ from 'jquery';
import _ from 'lodash';

let inputTagNames = [
    'input',
    'select',
    'textarea'
];

/**
 * Apply class name to an input element on its type
 * @param {object} input
 * @param {string} formFieldClass
 * @return {object} Element itself
 */
function classifyInput(input, formFieldClass) {
    let $input = $(input),
        $formField = $input.parent(`.${formFieldClass}`),
        tagName = $input.prop('tagName').toLowerCase(),
        className = `${formFieldClass}--${tagName}`,
        specificClassName;

    // Input can be text/checkbox/radio etc...
    if (tagName === 'input') {
        let inputType = $input.prop('type');

        if (_.contains(['radio', 'checkbox', 'submit'], inputType)) {
            // ie: .form-field--checkbox, .form-field--radio
            className = `${formFieldClass}--${_.camelCase(inputType)}`
        } else {
            // ie: .form-field--input .form-field--inputText
            specificClassName = `${className}${_.capitalize(inputType)}`
        }
    }

    // Apply class modifier
    return $formField
        .addClass(className)
        .addClass(specificClassName);
}

/**
 * Apply class name to each input element in a form based on its type
 * @example
 * // Before
 * <form id="form">
 *     <div class="form-field">
 *         <input type="text">
 *     </div>
 *     <div class="form-field">
 *         <select>...</select>
 *     </div>
 * </form>
 *
 * classifyForm('#form', { formFieldClass: 'form-field' });
 *
 * // After
 * <div class="form-field form-field--input form-field--inputText">...</div>
 * <div class="form-field form-field--select">...</div>
 *
 * @param {string|object} formSelector - selector or element
 * @param {object} options
 * @return {jQuery} Element itself
 */
export function classifyForm(formSelector, options = {}) {
    let $form = $(formSelector),
        $inputs = $form.find(inputTagNames.join(', '));

    // Obtain options
    let { formFieldClass = 'form-field' } = options;

    // Classify each input in a form
    $inputs.each((__, input) => {
        classifyInput(input, formFieldClass);
    });

    return $form;
}